import { createContext, useContext, useState } from 'react';
import { useAccount } from 'wagmi';
import { NETWORK_ETHEREUM, TOKEN_ETHEREUM } from './constants';

import ETH from '../../assets/ETH.svg';

const BuyContext = createContext({});

//@ts-ignore
export const BuyProvider = ({ children }) => {
    const { address, status, chainId } = useAccount();

    const [dropToken, setDropToken] = useState(false);
    const [dropNetwork, setDropNetwork] = useState(false);

    const [tokenImage, setTokenImage] = useState(ETH);

    const [network, setNetwork] = useState(NETWORK_ETHEREUM);

    const [token, setToken] = useState(TOKEN_ETHEREUM);

    const [balanceValue, setBalanceValue] = useState(0);
    const [balanceValueFiat, setBalanceValueFiat] = useState(0);

    const [tokensFromAmount, setTokensFromAmount] = useState('');
    const [tokensToAmount, setTokensToAmount] = useState('');

    const [networkPrices, setNetworkPrices] = useState({});

    const [tokenPrice, setTokenPrice] = useState(0);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorTransaction, setErrorTransaction] = useState(false);

    const [inputAmountInUsd, setInputAmountInUsd] = useState(0);

    const [successful, setSuccessful] = useState(false);    

    const [solBalance, setSolBalance] = useState(0);
    const [solBalanceFiat, setSolBalanceFiat] = useState(0);
    const [solUsdcBalance, setSolUsdcBalance] = useState(0);

    return (
        <BuyContext.Provider value={{
            address,
            status,
            chainId,
            token,
            setToken,
            dropToken,
            setDropToken,
            network,
            setNetwork,
            dropNetwork,
            setDropNetwork,
            tokenImage,
            setTokenImage,
            balanceValue,
            setBalanceValue,
            balanceValueFiat,
            setBalanceValueFiat,
            tokensFromAmount,
            setTokensFromAmount,
            tokensToAmount,
            setTokensToAmount,
            networkPrices,
            setNetworkPrices,
            tokenPrice,
            setTokenPrice,
            error,
            setError,
            loading,
            setLoading,
            errorTransaction,
            setErrorTransaction,
            inputAmountInUsd,
            setInputAmountInUsd,
            successful,
            setSuccessful,
            solBalance,
            setSolBalance,
            solBalanceFiat,
            setSolBalanceFiat,
            solUsdcBalance,
            setSolUsdcBalance
        }}>
            {children}
        </BuyContext.Provider>
    );
};

export const useBuy = () => {
    const context = useContext(BuyContext);

    const {
        //@ts-ignore
        address,
        //@ts-ignore
        status,
        //@ts-ignore
        chainId,
        //@ts-ignore
        token,
        //@ts-ignore
        setToken,
        //@ts-ignore
        dropToken,
        //@ts-ignore
        setDropToken,
        //@ts-ignore
        network,
        //@ts-ignore
        setNetwork,
        //@ts-ignore
        dropNetwork,
        //@ts-ignore
        setDropNetwork,
        //@ts-ignore
        tokenImage,
        //@ts-ignore
        setTokenImage,
        //@ts-ignore
        balanceValue,
        //@ts-ignore
        setBalanceValue,
        //@ts-ignore
        balanceValueFiat,
        //@ts-ignore
        setBalanceValueFiat,
        //@ts-ignore
        tokensFromAmount,
        //@ts-ignore
        setTokensFromAmount,
        //@ts-ignore
        tokensToAmount,
        //@ts-ignore
        setTokensToAmount,
        //@ts-ignore
        networkPrices,
        //@ts-ignore
        setNetworkPrices,
        //@ts-ignore
        tokenPrice,
        //@ts-ignore
        setTokenPrice,
        //@ts-ignore
        error,
        //@ts-ignore
        setError,
        //@ts-ignore
        loading,
        //@ts-ignore
        setLoading,
        //@ts-ignore
        errorTransaction,
        //@ts-ignore
        setErrorTransaction,
        //@ts-ignore
        inputAmountInUsd,
        //@ts-ignore
        setInputAmountInUsd,
        //@ts-ignore
        successful,
        //@ts-ignore
        setSuccessful,

        //@ts-ignore
        solBalance,
        //@ts-ignore
        setSolBalance,
        //@ts-ignore
        solBalanceFiat,
        //@ts-ignore
        setSolBalanceFiat,
        //@ts-ignore
        solUsdcBalance,
        //@ts-ignore
        setSolUsdcBalance
    } = context;

    return {
        address,
        status,
        chainId,
        token,
        setToken,
        dropToken,
        setDropToken,
        network,
        setNetwork,
        dropNetwork,
        setDropNetwork,
        tokenImage,
        setTokenImage,
        balanceValue,
        setBalanceValue,
        balanceValueFiat,
        setBalanceValueFiat,
        tokensFromAmount,
        setTokensFromAmount,
        tokensToAmount,
        setTokensToAmount,
        networkPrices,
        setNetworkPrices,
        tokenPrice,
        setTokenPrice,
        error,
        setError,
        loading,
        setLoading,
        errorTransaction,
        setErrorTransaction,
        inputAmountInUsd,
        setInputAmountInUsd,
        successful,
        setSuccessful,

        solBalance,
        setSolBalance,
        solBalanceFiat,
        setSolBalanceFiat,
        solUsdcBalance,
        setSolUsdcBalance
    };
};
