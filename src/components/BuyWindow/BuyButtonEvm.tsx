
import { useState, useEffect } from 'react';
import style from './BuyWindow.module.scss';
import { useAccount, useWriteContract, useReadContract, useBalance } from 'wagmi';
import { readContract } from "@wagmi/core";
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { NETWORK_ETHEREUM, TOKEN_USDT } from './constants';
import { useBuy } from './BuyContext';
import { config } from '../../config';
import { parseUnits } from 'viem';
import { waitForTransactionReceipt } from '@wagmi/core';
import { config as rainbowConfig } from '../../providers';
import { FLARY_PRESALE_ABI } from './flary-contract-abi';
import { ERC_20_ABI, USDT_ABI } from './erc-20-abi';
import { parseEther } from 'ethers';
import { MakeAPurchaseButton } from './BuyButton';

const {
    ETH_CONTRACT_ADDRESS,
    BSC_CONTRACT_ADDRESS,
    ETH_USDT_ADDRESS,
    BSC_USDT_ADDRESS,
} = config;

export const BuyButtonEvm = ({
    //@ts-ignore
    updateTokenHoldings
}) => {
    const { isConnected: isEvmConneted } = useAccount();

    return (
        (isEvmConneted ? <ProcessPaymentButtonEvm updateTokenHoldings={updateTokenHoldings} /> : <ConnectEvmButton />)
    );
};

const ConnectEvmButton = () => {
    const { openConnectModal } = useConnectModal();

    return (
        <div
            className={style.pay_button}
            
            onClick={openConnectModal}>
            Connect EVM Wallet To Buy FLFI
        </div>
    );
};

const ProcessPaymentButtonEvm = ({
    //@ts-ignore
    updateTokenHoldings
}) => {
    const {
        token,
        network,
    } = useBuy();

    const [contractAddress, setContractAddress] = useState(null);
    const [usdtAddress, setUsdtAddress] = useState(null);

    useEffect(() => {
        const address = network === NETWORK_ETHEREUM ? ETH_CONTRACT_ADDRESS : BSC_CONTRACT_ADDRESS;
        const usdtAddress = network === NETWORK_ETHEREUM ? ETH_USDT_ADDRESS : BSC_USDT_ADDRESS

        //@ts-ignore
        setContractAddress(address);
        //@ts-ignore
        setUsdtAddress(usdtAddress);
    }, [network]);


    return (
        (token === TOKEN_USDT
            ? <BuyWithUsdtButton
                contractAddress={contractAddress}
                usdtAddress={usdtAddress}
                updateTokenHoldings={updateTokenHoldings}
            /> : <BuyWithNativeButton contractAddress={contractAddress} updateTokenHoldings={updateTokenHoldings} />)
    );
};

const BuyWithNativeButton = ({
    //@ts-ignore
    contractAddress,
    //@ts-ignore
    updateTokenHoldings
}) => {
    const {
        setError,
        tokensFromAmount,
        setLoading,
        setErrorTransaction,
        setSuccessful,
        tokensToAmount
    } = useBuy();

    const { address } = useAccount();

    const { data: balance } = useBalance({
        address,
    });

    const { data: paused } = useReadContract({
        address: contractAddress,
        abi: FLARY_PRESALE_ABI,
        functionName: 'paused',
    });

    const {
        isError: isBuyTokensNativeError,
        writeContractAsync: buyTokensNativeWrite,
    } = useWriteContract();

    useEffect(() => {
        if (isBuyTokensNativeError) {
            setError(true);
        }
    }, [isBuyTokensNativeError]);

    const buyTokensNative = async () => {
        if (paused) {
            console.log('Token presale is PAUSED!!!');
            return;
        }

        const amountNative = parseEther(Number(tokensFromAmount).toFixed(18));

        if (balance && balance.value <= amountNative) {
            setErrorTransaction(true);
            setError(true);
            return;
        }

        try {
            setLoading(true);

            console.log('Attempting to buy tokens with native currency...');

            const buyHash = await buyTokensNativeWrite({
                address: contractAddress,
                abi: FLARY_PRESALE_ABI,
                functionName: 'buyTokensNative',
                args: [],
                value: amountNative,
            });

            const receipt = await waitForTransactionReceipt(rainbowConfig, {
                hash: buyHash,
            });

            if (receipt.status === "success") {
                try {
                    await fetch("https://back.flary.finance/api/user/boughtTokens", {
                        method: "POST",
                        body: JSON.stringify({ address, amount: Number(tokensToAmount), chain: receipt.chainId === 1 ? "eth" : "bsc" })
                    });
                } catch { }

                await updateTokenHoldings();
                setSuccessful(true);
            } else {
                setErrorTransaction(true);
            }
        } catch (error) {
            setErrorTransaction(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MakeAPurchaseButton onClick={() => buyTokensNative()} />
    )
};

const BuyWithUsdtButton = ({
    //@ts-ignore
    contractAddress,
    //@ts-ignore
    usdtAddress,
    //@ts-ignore
    updateTokenHoldings
}) => {
    const {
        network,
        setErrorTransaction,
        setError,
        tokensFromAmount,
        setLoading,
        setSuccessful,
        tokensToAmount
    } = useBuy();

    const { address } = useAccount();

    const { data: paused } = useReadContract({
        address: contractAddress,
        abi: FLARY_PRESALE_ABI,
        functionName: 'paused',
    });

    const {
        isError: isApproveError,
        writeContractAsync: approve,
    } = useWriteContract();

    const {
        isError: isBuyTokensUsdtError,
        writeContractAsync: buyTokensUsdtWrite,
    } = useWriteContract();

    useEffect(() => {
        if (isApproveError || isBuyTokensUsdtError) {
            setError(true);
            setErrorTransaction(true);
        }
    }, [isApproveError, isBuyTokensUsdtError]);

    const buyTokensUsdt = async () => {
        if (paused) {
            console.log('Token presale is PAUSED!!!');
            return;
        }

        const usdtDecimals = network === NETWORK_ETHEREUM ? 6 : 18;
        const amountUsdtBigNumber = parseUnits((Number(tokensFromAmount).toFixed(usdtDecimals)), usdtDecimals);

        const usdtBalance = await readContract(rainbowConfig, {
            address: usdtAddress,
            abi: ERC_20_ABI,
            functionName: 'balanceOf',
            args: [address],
        }) as any as bigint;

        if (!usdtBalance || usdtBalance < amountUsdtBigNumber) {
            setError(true);
            return;
        }

        try {
            setLoading(true);

            const allowance = await readContract(rainbowConfig, {
                address: usdtAddress,
                abi: ERC_20_ABI,
                functionName: 'allowance',
                args: [address, contractAddress],
            }) as any as bigint;

            console.log('Attempting to buy tokens for tokens by USDT...');
            if (allowance < amountUsdtBigNumber) {
                const abi = network === NETWORK_ETHEREUM ? USDT_ABI : ERC_20_ABI;

                if (allowance > 0n) {
                    console.log('Resetting allowance...');

                    const hash1 = await approve({
                        address: usdtAddress,
                        abi,
                        functionName: 'approve',
                        args: [contractAddress, 0]
                    });
                    await waitForTransactionReceipt(rainbowConfig, { hash: hash1 });

                    console.log('Allowance reset');
                }

                console.log('Approving');

                const hash = await approve({
                    address: usdtAddress,
                    abi,
                    functionName: 'approve',
                    args: [contractAddress, amountUsdtBigNumber]
                });

                await waitForTransactionReceipt(rainbowConfig, { hash });

                console.log('Approved');
            }

            console.log('Buying tokens...');

            const buyHash = await buyTokensUsdtWrite({
                address: contractAddress,
                abi: FLARY_PRESALE_ABI,
                functionName: 'buyTokensUSDT',
                args: [amountUsdtBigNumber],
            });

            const receipt = await waitForTransactionReceipt(rainbowConfig, { hash: buyHash });

            console.log('Tokens bought', receipt);

            if (receipt.status === "success") {
                try {
                    await fetch("https://back.flary.finance/api/user/boughtTokens", {
                        method: "POST",
                        body: JSON.stringify({ address, amount: Number(tokensToAmount), chain: receipt.chainId === 1 ? "eth" : "bsc" })
                    });
                } catch { }

                await updateTokenHoldings();
                setSuccessful(true);
            } else {
                setErrorTransaction(true);
            }
        } catch (error) {
            setErrorTransaction(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MakeAPurchaseButton onClick={() => buyTokensUsdt()} />
    );
};