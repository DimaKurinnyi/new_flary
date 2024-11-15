import { useState, useEffect } from 'react';
import style from './BuyWindow.module.scss';
import { useBuy } from './BuyContext';
import { NETWORK_BSC, NETWORK_ETHEREUM, NETWORK_SOLANA, TOKEN_BNB, TOKEN_ETHEREUM, TOKEN_SOL, TOKEN_USDC, TOKEN_USDT } from './constants';
import Arrow from '../../assets/arrow_down.svg';
import { SelectBscToken, SelectEthToken, SelectSolToken } from './SelectToken';
import { useBalance } from 'wagmi';
import { config } from '../../config';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { useIsMounted } from './useIsMounted';
import { formatEther, JsonRpcProvider } from 'ethers';
import { getSolanaPrice } from './solana/get-solana-price';

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

export const YouPayComponent = () => {
    const {
        dropToken,
        setDropToken,
        network,
        status,
        setDropNetwork,
        tokenImage,
        token,
        balanceValue,
        balanceValueFiat,
        setToken,
        setTokenImage,
        setTokensFromAmount,
        setTokensToAmount,
        setBalanceValue,
        setBalanceValueFiat,
        address,
        networkPrices,
        tokensFromAmount,
        tokenPrice,
        setInputAmountInUsd,
        chainId,
        solBalance,
        setSolBalance,
        solBalanceFiat,
        setSolBalanceFiat,
        solUsdcBalance,
        setSolUsdcBalance
    } = useBuy();

    const { connection } = useConnection();
    const { publicKey, connected: solWalletConnected } = useWallet();

    const mounted = useIsMounted();

    const [maxButtonAvailable, setMaxButtonAvailable] = useState(false);

    useEffect(() => {
        if (network === NETWORK_SOLANA) {
            setMaxButtonAvailable(solWalletConnected);
        } else {
            setMaxButtonAvailable(status === 'connected');
        }
    }, [network, solWalletConnected, status]);

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

                    setSolBalance(balanceSol);
                    setSolBalanceFiat(balanceSolFiat);

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

                    setSolUsdcBalance(accountInfo.value.uiAmount);
                } catch {
                    setSolBalanceFiat(0);
                }
            } else {
                setSolBalance(0);
                setSolBalanceFiat(0);
            }
        };

        fetchBalance();
    }, [connection, publicKey]);


    useEffect(() => {
        //@ts-ignore
        const calculateBalanceInFiat = (coinValue) => {
            const price = getBaseCoinPrice();
            if (!price) return null;
            return (coinValue * price).toFixed(1);
        };

        if (ethEth?.formatted && network === NETWORK_ETHEREUM) {
            //@ts-ignore
            const ethValue = Math.floor(ethEth.formatted * 1000) / 1000;

            if (!isNaN(ethValue)) {
                setBalanceValue(ethEthValue);
                setBalanceValueFiat(calculateBalanceInFiat(ethValue));
            }
        } else if (bnbBNB?.formatted && network === NETWORK_BSC) {
            //@ts-ignore
            const bnbValue = Math.floor(bnbBNB.formatted * 1000) / 1000;

            if (!isNaN(bnbValue)) {
                setBalanceValue(bnbValue);
                setBalanceValueFiat(calculateBalanceInFiat(bnbValue));
            }
        } else if (network === NETWORK_SOLANA) {
            setBalanceValue(Number(solBalance.toFixed(3)));
            setBalanceValueFiat(Number((solBalanceFiat.toFixed(2))));
        }
    },
        [address, status, chainId, network]
    );

    const dropTokenList = () => {
        if (network === NETWORK_SOLANA) {
            if (!solWalletConnected) {
                return;
            }
        } else if (status === 'disconnected') {
            return;
        }

        setDropToken(!dropToken);
        setDropNetwork(false);
    };

    const handlerSelectPaymentCoin = (
        //@ts-ignore
        token,
        //@ts-ignore
        tokenImg,
        //@ts-ignore
        balance,
        //@ts-ignore
        balanceFiat
    ) => {
        setDropNetwork(!dropToken);
        setToken(token);
        setTokenImage(tokenImg);
        setTokensFromAmount('');
        setTokensToAmount('');
        setBalanceValue(balance);
        setBalanceValueFiat(Number(Number(balanceFiat).toFixed(2)));
    };

    const { data: bnbBNB } = useBalance({
        address,
    });

    const bnbBNBValue = Math.floor(Number(bnbBNB?.formatted) * 1000) / 1000;
    const bnbBNBValueFiat = (bnbBNBValue * networkPrices[NETWORK_BSC]).toFixed(1);

    const { data: bnbUsdt } = useBalance({
        address: address,
        //@ts-ignore
        token: BSC_USDT_ADDRESS,
    });
    const bnbUsdtValue = Number(bnbUsdt?.formatted ?? 0);


    const { data: ethEth } = useBalance({
        address: address,
    });
    const ethEthValue = Math.floor(Number(ethEth?.formatted) * 1000) / 1000;

    const ethEthValueFiat = (ethEthValue * networkPrices[NETWORK_ETHEREUM]).toFixed(1);


    const { data: ethUsdt } = useBalance({
        address: address,
        //@ts-ignore
        token: ETH_USDT_ADDRESS
    });
    const ethUsdtValue = Number(ethUsdt?.formatted);

    console.log('ethUsdtValue:', ethUsdtValue);
    console.log('bnbUsdtValue:', bnbUsdtValue);


    const getBaseCoinPrice = () => {
        return networkPrices[network];
    };

    const isBaseCoinSelected = () => {
        if (network === NETWORK_ETHEREUM) {
            return token !== TOKEN_USDT;
        } else if (network === NETWORK_BSC) {
            return token !== TOKEN_USDT;
        } else if (network === NETWORK_SOLANA) {
            return token !== TOKEN_USDC;
        }
        return false;
    };

    const setMaxAcceptableValue = async () => {
        if (network === NETWORK_ETHEREUM && token === TOKEN_ETHEREUM) {
            const gasPriceInNativeCoin = await getGasPriceInNativeCoin(providerEthereum);
            const balanceWithoutFee = balanceValue - gasPriceInNativeCoin;
            const availableBalance = Math.max(balanceWithoutFee, 0);
            setTokensFromAmount(availableBalance);

            const tokensToAmountNew = availableBalance * networkPrices[NETWORK_ETHEREUM] / tokenPrice;
            setTokensToAmount(tokensToAmountNew);
        } else if (network === NETWORK_BSC && token === TOKEN_BNB) {
            const gasPriceInNativeCoin = await getGasPriceInNativeCoin(providerBSC);
            const balanceWithoutFee = balanceValue - gasPriceInNativeCoin;
            const availableBalance = Math.max(balanceWithoutFee, 0);
            setTokensFromAmount(availableBalance);

            const tokensToAmountNew = availableBalance * networkPrices[NETWORK_BSC] / tokenPrice;
            setTokensToAmount(tokensToAmountNew);
        } else if (network === NETWORK_SOLANA && token === TOKEN_SOL) {
            const feeInSolana = 0.00001;
            const balanceWithoutFee = solBalance - feeInSolana;
            const availableBalance = Math.max(balanceWithoutFee, 0);
            setTokensFromAmount(availableBalance);
        }
        else {
            setTokensFromAmount(balanceValue);
            const tokensToAmountNew =
                (balanceValue * (isBaseCoinSelected() ? getBaseCoinPrice() : 1)) / tokenPrice;
            setTokensToAmount(tokensToAmountNew);
        }
    };

    const doNotShow = () => {
        return (network === NETWORK_SOLANA && !solWalletConnected) || (network !== NETWORK_SOLANA && status === 'disconnected');
    };

    return (
        <div className={style.block_input}>
            <p className={style.labelLine}>You pay: </p>
            <div
                className={style.button}
                onClick={() => dropTokenList()}
                style={
                    dropToken ? { borderBottomLeftRadius: '0', borderBottomRightRadius: '0' } : {}
                }>
                <div className={style.button_tittle}>
                    <img src={tokenImage} alt="" />
                    <p>{token}</p>

                    {doNotShow() ? '' : <img src={Arrow} alt="" />}
                </div>{' '}

                {
                    doNotShow()
                        ? ('') :
                        (
                            <div>
                                <p className={style.balanceValue} style={{ textAlign: 'end' }}>
                                    {balanceValue > 0.001 ? balanceValue : 0}
                                </p>
                                <p
                                    className={style.balanceValue}
                                    style={{ color: 'gray', fontWeight: '300', textAlign: 'end' }}>
                                    ${balanceValueFiat}
                                </p>
                            </div>
                        )
                }
                {network === NETWORK_BSC
                    ? dropToken && <SelectBscToken
                        handlerSelectPaymentCoin={handlerSelectPaymentCoin}
                        bnbBNBValue={bnbBNBValue}
                        bnbBNBValueFiat={bnbBNBValueFiat}
                        bnbUsdtValue={bnbUsdtValue}
                    />
                    : null}
                {network === NETWORK_ETHEREUM
                    ? dropToken && <SelectEthToken
                        handlerSelectPaymentCoin={handlerSelectPaymentCoin}
                        ethEthValue={ethEthValue}
                        ethEthValueFiat={ethEthValueFiat}
                        ethUsdtValue={ethUsdtValue}
                    />
                    : null}
                {network === NETWORK_SOLANA
                    ? dropToken && <SelectSolToken
                        solanaSolValue={solBalance}
                        solanaSolValueFiat={solBalanceFiat}
                        solanaUsdcValue={solUsdcBalance}
                        handlerSelectPaymentCoin={handlerSelectPaymentCoin}
                    />
                    : null}
            </div>

            <div className={style.max_input}>
                <input
                    className={style.input_buy}
                    type="text"
                    placeholder="Enter Amount"
                    value={tokensFromAmount}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9.]/g, '');

                        const trimmedValue = value
                            .replace(/^0+(?=\d)/, '')
                            .replace(/^0+\.$/, '0.')
                            .replace(/^\.$/, '0.');

                        setTokensFromAmount(trimmedValue);
                        const valInUsdt = Number(trimmedValue) * (isBaseCoinSelected() ? getBaseCoinPrice() : 1);

                        setInputAmountInUsd(valInUsdt);

                        setTokensToAmount(valInUsdt / tokenPrice);
                    }}
                />
                {mounted
                    ? maxButtonAvailable && (
                        <p className={style.max} onClick={() => setMaxAcceptableValue()}>
                            MAX
                        </p>
                    )
                    : null}
            </div>
        </div>
    )
};

//@ts-ignore
const getGasPriceInNativeCoin = async (provider) => {
    const gasUsage = 150000n;
    const { gasPrice } = await provider.getFeeData();

    const gasPriceInNativeCoin = Number(formatEther(gasPrice * gasUsage));

    return gasPriceInNativeCoin;
};