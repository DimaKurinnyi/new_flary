import {useCallback, useEffect, useMemo, useState} from "react";
import {useAccount, useBalance, useSwitchChain} from "wagmi";
import {
  NETWORK_BSC,
  NETWORK_ETHEREUM, NETWORK_SOLANA, stages,
  TOKEN_BNB,
  TOKEN_ETHEREUM, TOKEN_SOL, TOKEN_USDC,
  TOKEN_USDT
} from "@/components/BuyWindow/constants.ts";
import {getSolanaPrice} from "@/components/BuyWindow/solana/get-solana-price";
import {getAssociatedTokenAddress} from "@solana/spl-token";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {config} from "@/config";
import {PublicKey} from "@solana/web3.js";
import {ethers, formatEther, formatUnits, JsonRpcProvider} from "ethers";
import {NetworksType, TokensType} from "@/components/BuyWindow/types";
import {getEvmNativeCurrencyPrice} from "@/components/BuyWindow/evm/get-evm-native-coin-price";
import {getContract} from "@/components/BuyWindow/evm/get-contract";
import {getSolanaBoughtTokensFromContract} from "@/components/BuyWindow/solana/get-solana-bought-tokens";
import useStore from "@/store";

const {
  ETH_USDT_ADDRESS,
  BSC_USDT_ADDRESS,
  RPC_ETH,
  RPC_BSC,
  SOL_USDC_ADDRESS,
  TOKEN_PROGRAM
} = config;

const USDC_MINT_ADDRESS = new PublicKey(SOL_USDC_ADDRESS);
const providerEthereum = new JsonRpcProvider(RPC_ETH);
const providerBSC = new JsonRpcProvider(RPC_BSC);

// @TODO: move to utils file
const roundToDecimalsSmaller = (value: number, decimals: number) => {
  const [integer, decimal] = value.toString().split('.');
  if (!decimal) return value;
  return Number(`${integer}.${decimal.slice(0, decimals)}`);
};

// @ts-ignore TODO: add type
const getGasPriceInNativeCoin = async (provider) => {
  const gasUsage = 150000n;
  const {gasPrice} = await provider.getFeeData();

  const gasPriceInNativeCoin = Number(formatEther(gasPrice * gasUsage));

  return gasPriceInNativeCoin;
};

export const useBuyWindow = () => {
  const {
    token,
    network,
    inputAmountInUsd,
    tokensToAmount,
    tokensFromAmount,
    successful,
    loading,
    errorTransaction,
    error,
    setError,
    setErrorTransaction,
    setLoading,
    setSuccessful,
    setTokensFromAmount,
    setTokensToAmount,
    setInputAmountInUsd,
    setToken,
    setNetwork
  } = useStore();
  const {address, chainId, status} = useAccount();
  const {data: bnbBNB} = useBalance({address});
  const {connection} = useConnection();
  const {switchChain} = useSwitchChain();
  const {publicKey, connected: isSolanaConnected} = useWallet();
  const {data: ethEth} = useBalance({address});
  const {data: bnbUsdt} = useBalance({address: address, token: BSC_USDT_ADDRESS as `0x${string}`});
  const {data: ethUsdt} = useBalance({address, token: ETH_USDT_ADDRESS as `0x${string}`});

  const [solBalance, setSolBalance] = useState(0);
  const [solBalanceFiat, setSolBalanceFiat] = useState(0);
  const [solUsdcBalance, setSolUsdcBalance] = useState(0);
  const [tokenSold, setTokenSold] = useState(0);
  const [stage, setStage] = useState('');
  const [usdtPerStage, setUsdtPerStage] = useState(0);
  const [collected, setCollected] = useState(0);
  const [progress, setProgress] = useState(0);
  const [tokenPriceActually, setTokenPriceActually] = useState(0);
  const [tokenPriceNextStage, setTokenPriceNextStage] = useState(0);
  const [balanceValue, setBalanceValue] = useState(0);
  const [balanceValueFiat, setBalanceValueFiat] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [tokenHoldings, setTokenHoldings] = useState('0');
  const [networkPrices, setNetworkPrices] = useState({});
  const [openPopupNetwork, setOpenPopupNetwork] = useState(false);

  const bnbBNBValue = Math.floor(Number(bnbBNB ? bnbBNB.formatted : 0) * 1000) / 1000;
  // @ts-ignore
  const bnbBNBValueFiat = (bnbBNBValue * (networkPrices[NETWORK_BSC] ?? 0)).toFixed(2);
  const bnbUsdtValue = roundToDecimalsSmaller(Number(bnbUsdt ? bnbUsdt.formatted : 0), 2);
  const ethEthValue = Math.floor(Number(ethEth ? ethEth.formatted : 0) * 1000) / 1000;
  // @ts-ignore
  const ethEthValueFiat = (ethEthValue * (networkPrices[NETWORK_ETHEREUM] ?? 0)).toFixed(2);
  const ethUsdtValue = roundToDecimalsSmaller(Number(ethUsdt ? ethUsdt.formatted : 0), 2);

  const getBaseCoinPrice = useMemo(() => {
    // @ts-ignore
    return networkPrices[network];
  }, [networkPrices, network]);

  useEffect(() => {
    updateTokenHoldings();
  }, [isSolanaConnected, publicKey]);

  useEffect(() => {
    const checkNetwork = async () => {
      if (status === 'connected') {
        if (chainId === 1) {
          handlerChangeNetwork(NETWORK_ETHEREUM);
          setOpenPopupNetwork(false);
        } else if (chainId === 56) {
          handlerChangeNetwork(NETWORK_BSC);
          setOpenPopupNetwork(false);
        } else {
          setOpenPopupNetwork(true);
        }
      }
    };

    checkNetwork();
  }, [chainId, status]);

  useEffect(() => {
    if (successful || errorTransaction) {
      const timer = setTimeout(() => {
        setSuccessful(false);
        setErrorTransaction(false);
      }, 3000); // 3000 миллисекунд = 3 секунды

      // Очистка таймера при размонтировании компонента
      return () => clearTimeout(timer);
    }

    initBaseCurrenciesPrices();
    updateTokenPrice();

    if (status === 'connected') {
      updateTokenHoldings();
    }
  }, [status, errorTransaction, successful]);

  const handlerChangeNetwork = async (arg: NetworksType) => {
    setInputAmountInUsd(0);
    if (arg === NETWORK_ETHEREUM) {
      setToken(TOKEN_ETHEREUM);

      switchChain({chainId: 1});
    }

    if (arg === NETWORK_BSC) {
      setToken(TOKEN_BNB);
      switchChain({chainId: 56});
    }

    if (arg === NETWORK_SOLANA) {
      setToken(TOKEN_SOL);

      console.log('solana', "settomf", solBalance, solBalanceFiat);

      if (publicKey) {

        const price = await getSolanaPrice();
        console.log('price:', price);

        const balanceLamports = await connection.getBalance(publicKey);
        const balanceSol = balanceLamports / 1e9;
        const balanceSolFiat = Number((balanceSol * price).toFixed(2));

        console.log('balanceSol:', balanceSol);
        console.log('balanceSolFiat:', balanceSolFiat);

        setSolBalance(roundToDecimalsSmaller(balanceSol, 3));
        setSolBalanceFiat(roundToDecimalsSmaller(balanceSolFiat, 2));
      }

      setBalanceValue(solBalance);
      setBalanceValueFiat(solBalanceFiat);
    }

    setNetwork(arg);
    setTokensFromAmount('');
    setTokensToAmount('');

    await updateTokenHoldings();
  };

  const initializeSolanaPrice = async () => {
    const price = await getSolanaPrice();

    // @ts-ignore
    networkPrices[NETWORK_SOLANA] = price;
    setNetworkPrices(networkPrices);
  };

  const initializeNativeCurrencyPrice = async (network: NetworksType) => {
    const price = await getEvmNativeCurrencyPrice(network);

    // @ts-ignore
    networkPrices[network] = price;
    setNetworkPrices(networkPrices);

    // @ts-ignore
    console.log(`${network} price is ${networkPrices[network]}`);
  };

  const getSolanaBoughtTokens = async () => {
    return publicKey
      ? getSolanaBoughtTokensFromContract(publicKey, connection)
      : 0;
  };

  const initBaseCurrenciesPrices = async () => {
    await initializeNativeCurrencyPrice(NETWORK_ETHEREUM);
    await initializeNativeCurrencyPrice(NETWORK_BSC);
    await initializeSolanaPrice();
  };

  const updateTokenPrice = async () => {
    const providerEth = new ethers.JsonRpcProvider(RPC_ETH);
    const contract = getContract(NETWORK_ETHEREUM, providerEth);
    const tp = Number(formatUnits(await contract.tokensPriceInUsdt(), 6));
    setTokenPrice(tp);
  };

  const updateTokenHoldings = async () => {
    console.log('updateTokenHoldings');

    const getBoughtTokens = async (network: NetworksType, address: string) => {
      const providerRpc = network === NETWORK_ETHEREUM ? RPC_ETH : RPC_BSC;

      const provider = new ethers.JsonRpcProvider(providerRpc);
      const contract = getContract(network, provider);

      const balance = await contract.investemetByAddress(address);

      return Number(ethers.formatEther(balance));
    };

    let sum = 0;
    if (status === 'connected') {
      const boughtTokensEth = await getBoughtTokens(NETWORK_ETHEREUM, address);
      const boughtTokensBsc = await getBoughtTokens(NETWORK_BSC, address);
      sum = boughtTokensEth + boughtTokensBsc;
    }

    console.log('isSolanaConnected', isSolanaConnected);

    if (isSolanaConnected) {
      try {
        const boughtTokensSol = await getSolanaBoughtTokens();
        console.log('boughtTokensSol', boughtTokensSol);
        sum += boughtTokensSol;
      } catch (e) {
        console.log("Account does not exist or has no data ");
      }
    }

    console.log('sum', sum);

    setTokenHoldings(sum.toFixed(2));
  };

  const isBaseCoinSelected = () => {
    return (network === NETWORK_ETHEREUM && token !== TOKEN_USDT) ||
      (network === NETWORK_BSC && token !== TOKEN_USDT) ||
      (network === NETWORK_SOLANA && token !== TOKEN_USDC);
  };

  //@ts-ignore
  const updateReceivedValue = (amountToPay) => {
    console.log("Update received price");

    setTokensToAmount(amountToPay);

    const _isBaseCoinSelected = isBaseCoinSelected();

    const tokensFromAmountNew =
      (amountToPay * tokenPrice) / (_isBaseCoinSelected ? getBaseCoinPrice : 1);
    // @ts-ignore
    setTokensFromAmount(tokensFromAmountNew);

    console.log("Is base coin selected", _isBaseCoinSelected);
    console.log("Amount to pay", amountToPay);
    console.log("Tokens from amount", tokensFromAmountNew);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://back.flary.finance/api/tokens/totalTokens');
        if (!response.ok) throw 'Response was not successful';
        const result = await response.json();
        setTokenSold(result);
      } catch (e) {
        setError(true);
        console.log('Error fetching token', e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
      //@ts-ignore
      const calculateBalanceInFiat = (coinValue) => {
        const price = getBaseCoinPrice;
        if (!price) return null;
        return (coinValue * price).toFixed(1);
      };

      if (ethEth?.formatted && network === NETWORK_ETHEREUM) {
        //@ts-ignore
        const ethValue = Math.floor(ethEth.formatted * 1000) / 1000;

        if (!isNaN(ethValue)) {
          setBalanceValue(ethEthValue);
          // @ts-ignore
          setBalanceValueFiat(calculateBalanceInFiat(ethValue));
        }
      } else if (bnbBNB?.formatted && network === NETWORK_BSC) {
        //@ts-ignore
        const bnbValue = Math.floor(bnbBNB.formatted * 1000) / 1000;

        if (!isNaN(bnbValue)) {
          setBalanceValue(bnbValue);
          // @ts-ignore
          setBalanceValueFiat(calculateBalanceInFiat(bnbValue));
        }
      } else if (network === NETWORK_SOLANA) {
        setBalanceValue(Number(solBalance.toFixed(3)));
        setBalanceValueFiat(Number((solBalanceFiat.toFixed(2))));
      }
    },
    [address, status, chainId, network]
  );

  const handleChangeToken = useCallback((token: TokensType) => {
    setToken(token);
    setInputAmountInUsd(0);
    setTokensFromAmount('');
    setTokensToAmount('');
    // @ts-ignore
    setBalanceValue(tokenValues[network][token].balance);
  }, [network])

  const setMaxAcceptableValue = async () => {
    let tokensToAmountNew = 0;

    if (network === NETWORK_ETHEREUM && token === TOKEN_ETHEREUM) {
      const gasPriceInNativeCoin = await getGasPriceInNativeCoin(providerEthereum);
      const balanceWithoutFee = roundToDecimalsSmaller(balanceValue - gasPriceInNativeCoin, 4);
      const availableBalance = Math.max(balanceWithoutFee, 0);

      // @ts-ignore
      const inUsdt = availableBalance * networkPrices[NETWORK_ETHEREUM];

      setInputAmountInUsd(inUsdt);
      // @ts-ignore
      setTokensFromAmount(availableBalance);

      // @ts-ignore
      tokensToAmountNew = availableBalance * networkPrices[NETWORK_ETHEREUM] / tokenPrice;
    } else if (network === NETWORK_BSC && token === TOKEN_BNB) {
      const gasPriceInNativeCoin = await getGasPriceInNativeCoin(providerBSC);
      const balanceWithoutFee = roundToDecimalsSmaller(balanceValue - gasPriceInNativeCoin, 4);
      const availableBalance = Math.max(balanceWithoutFee, 0);

      // @ts-ignore
      const inUsdt = availableBalance * networkPrices[NETWORK_BSC];

      setInputAmountInUsd(inUsdt);
      // @ts-ignore
      setTokensFromAmount(availableBalance);
      // @ts-ignore
      tokensToAmountNew = availableBalance * networkPrices[NETWORK_BSC] / tokenPrice;
    } else if (network === NETWORK_SOLANA && token === TOKEN_SOL) {
      const feeInSolana = 0.002;
      const balanceWithoutFee = roundToDecimalsSmaller(solBalance - feeInSolana, 4);
      const availableBalance = Math.max(balanceWithoutFee, 0);

      // @ts-ignore
      const inUsdt = availableBalance * networkPrices[NETWORK_SOLANA];

      setInputAmountInUsd(inUsdt);
      // @ts-ignore
      setTokensFromAmount(availableBalance);

      // @ts-ignore
      tokensToAmountNew = availableBalance * networkPrices[NETWORK_SOLANA] / tokenPrice;
    } else {
      const resultBalance = roundToDecimalsSmaller(balanceValue, 4);
      setInputAmountInUsd(resultBalance);
      // @ts-ignore
      setTokensFromAmount(resultBalance);
      tokensToAmountNew = roundToDecimalsSmaller((resultBalance) / tokenPrice, 4);
    }
    // @ts-ignore
    setTokensToAmount(roundToDecimalsSmaller(tokensToAmountNew, 4));
  };

  useEffect(() => {
    const fetchBalance = async () => {
      console.log("Fetching balance");

      console.log('publicKey:', publicKey);
      if (publicKey) {
        try {
          const price = await getSolanaPrice();
          console.log('price:', price);

          const balanceLamports = await connection.getBalance(publicKey);
          const balanceSol = balanceLamports / 1e9;
          const balanceSolFiat = Number((balanceSol * price).toFixed(2));

          console.log('balanceSol:', balanceSol);
          console.log('balanceSolFiat:', balanceSolFiat);

          setSolBalance(roundToDecimalsSmaller(balanceSol, 3));
          console.log('2 setSolBalanceFiat', roundToDecimalsSmaller(balanceSolFiat, 2))
          setSolBalanceFiat(roundToDecimalsSmaller(balanceSolFiat, 2));
        } catch (error) {
          console.error("Failed to fetch balance:", error);
        }

        console.log('publicKey:', publicKey.toBase58());
        console.log('USDC_MINT_ADDRESS:', USDC_MINT_ADDRESS.toBase58());
        const usdcAddress = await getAssociatedTokenAddress(
          USDC_MINT_ADDRESS,
          publicKey,
          false,
          TOKEN_PROGRAM
        );

        console.log('usdcAddress:', usdcAddress.toBase58());

        try {
          const accountInfo = await connection.getTokenAccountBalance(usdcAddress);

          console.log('accountInfo:', accountInfo);

          setSolUsdcBalance(roundToDecimalsSmaller(accountInfo.value.uiAmount ?? 0, 2));
        } catch {
          setSolUsdcBalance(0);
        }
      } else {
        setSolBalance(0);
        setSolBalanceFiat(0);
      }
    };

    fetchBalance();
  }, [connection, publicKey, network]);

  useEffect(() => {
    let totalUsdt = 0;
    let stageIndex = 0;

    let multipleTokenCapState = 0;
    let multipleUsdtState = 0;

    for (let i = 0; i < stages.length; i++) {
      totalUsdt += stages[i].usdt;

      if (i > 0) {
        multipleTokenCapState -= stages[i - 1].tokenCap;
        multipleUsdtState += stages[i - 1].usdt;
      }

      if (tokenSold < stages[i].cap) {
        stageIndex = i;
        break;
      }
    }

    const collected = (tokenSold + multipleTokenCapState) * stages[stageIndex].price + multipleUsdtState;

    setStage(`Stage ${stageIndex + 1}`);
    setTokenPriceNextStage(stages[stageIndex + 1].price);
    setTokenPriceActually(stages[stageIndex].price);
    setUsdtPerStage(stages[stageIndex].fullCap);
    setCollected(collected + 2);
    setProgress((collected / totalUsdt) * 100);
  }, [tokenSold]);

  useEffect(() => {
    const fetchBalance = async () => {
      console.log("Fetching balance");

      console.log('publicKey:', publicKey);
      if (publicKey) {
        try {
          const price = await getSolanaPrice();
          console.log('price:', price);

          const balanceLamports = await connection.getBalance(publicKey);
          const balanceSol = balanceLamports / 1e9;
          const balanceSolFiat = Number((balanceSol * price).toFixed(2));

          console.log('balanceSol:', balanceSol);
          console.log('balanceSolFiat:', balanceSolFiat);

          setSolBalance(roundToDecimalsSmaller(balanceSol, 3));
          console.log('2 setSolBalanceFiat', roundToDecimalsSmaller(balanceSolFiat, 2))
          setSolBalanceFiat(roundToDecimalsSmaller(balanceSolFiat, 2));
        } catch (error) {
          console.error("Failed to fetch balance:", error);
        }

        console.log('publicKey:', publicKey.toBase58());
        console.log('USDC_MINT_ADDRESS:', USDC_MINT_ADDRESS.toBase58());
        const usdcAddress = await getAssociatedTokenAddress(
          USDC_MINT_ADDRESS,
          publicKey,
          false,
          TOKEN_PROGRAM
        );

        console.log('usdcAddress:', usdcAddress.toBase58());

        try {
          const accountInfo = await connection.getTokenAccountBalance(usdcAddress);

          console.log('accountInfo:', accountInfo);

          setSolUsdcBalance(roundToDecimalsSmaller(accountInfo.value.uiAmount ?? 0, 2));
        } catch {
          setSolUsdcBalance(0);
        }
      } else {
        setSolBalance(0);
        setSolBalanceFiat(0);
      }
    };

    fetchBalance();
  }, [connection, publicKey, network]);

  const tokenValues = useMemo(() => {
    return {
      [NETWORK_ETHEREUM]: {
        [TOKEN_ETHEREUM]: {
          balance: ethEthValue,
          usd: ethEthValueFiat,
        },
        [TOKEN_USDT]: {
          balance: ethUsdtValue,
          usd: ethUsdtValue
        }
      },
      [NETWORK_BSC]: {
        [TOKEN_BNB]: {
          balance: bnbBNBValue,
          usd: bnbBNBValueFiat
        },
        [TOKEN_USDT]: {
          balance: bnbUsdtValue,
          usd: bnbUsdtValue
        }
      },
      [NETWORK_SOLANA]: {
        [TOKEN_SOL]: {
          balance: solBalance,
          usd: solBalanceFiat
        },
        [TOKEN_USDC]: {
          balance: solUsdcBalance,
          usd: solUsdcBalance
        }
      }
    }
  }, [
    bnbBNBValue,
    bnbBNBValueFiat,
    bnbUsdtValue,
    ethEthValue,
    ethEthValueFiat,
    ethUsdtValue,
    solBalance,
    solBalanceFiat,
    solUsdcBalance
  ]);

  const handleAmountChange = ({type, e}: { type: "from" | "to", e: string }) => {
    const value = e.replace(/[^0-9.]/g, '').replace(/^0+(?=\d)/, '').replace(/^0+\.$/, '0.').replace(/^\.$/, '0.');
    const amount = Number(value);
    const baseCoinPrice = isBaseCoinSelected() ? getBaseCoinPrice : 1;

    if (type === 'from') {
      setTokensFromAmount(value);
      const valInUsdt = amount * baseCoinPrice;
      setInputAmountInUsd(valInUsdt);
      // @ts-ignore
      setTokensToAmount(roundToDecimalsSmaller(valInUsdt / tokenPrice, 4));
    } else if (type === 'to') {
      // @ts-ignore
      setTokensToAmount(amount);
      const tokensFromAmountNew = (amount * tokenPrice) / baseCoinPrice;
      const valInUsdt = tokensFromAmountNew * baseCoinPrice;
      setInputAmountInUsd(valInUsdt);
      // @ts-ignore
      setTokensFromAmount(tokensFromAmountNew);
      console.log("Tokens from amount", tokensFromAmountNew);
      console.log("Is base coin selected", isBaseCoinSelected());
      console.log("Amount to pay", amount);
    }
  };

  const handleError = () => {
    setError(false)
    setTokensFromAmount('')
    setTokensToAmount('')
  }

  return {
    network,
    loading,
    tokenValues,
    tokenSold,
    stage,
    usdtPerStage,
    collected,
    progress,
    tokenPriceActually,
    tokenHoldings,
    balanceValueFiat,
    inputAmountInUsd,
    tokensFromAmount,
    tokensToAmount,
    successful,
    error,
    token,
    errorTransaction,
    openPopupNetwork,
    handleChangeToken,
    tokenPriceNextStage,
    setErrorTransaction,
    setMaxAcceptableValue,
    handleAmountChange,
    updateReceivedValue,
    updateTokenHoldings,
    handlerChangeNetwork,
    handleError
  }
};

export default useBuyWindow;
