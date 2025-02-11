import { create } from 'zustand'
import {NetworksType, TokensType} from "@/components/BuyWindow/types";
import {NETWORK_ETHEREUM, TOKEN_ETHEREUM} from "@/components/BuyWindow/constants";

interface StoreState {
  token: TokensType,
  network: NetworksType,
  inputAmountInUsd: number,
  tokensToAmount: string,
  tokensFromAmount: string,
  successful: boolean,
  loading: boolean,
  errorTransaction: boolean,
  error: boolean,
  setError: (state: boolean) => void,
  setErrorTransaction: (state: boolean) => void
  setLoading: (loading: boolean) => void,
  setSuccessful: (successful: boolean) => void,
  setTokensFromAmount: (amount: string) => void
  setTokensToAmount: (amount: string) => void
  setInputAmountInUsd: (inputAmountInUsd: number) => void,
  setToken: (token: TokensType) => void,
  setNetwork: (network: NetworksType) => void
}

const useStore = create<StoreState>((set) => ({
  network: NETWORK_ETHEREUM,
  token: TOKEN_ETHEREUM,
  inputAmountInUsd: 0,
  tokensToAmount: "",
  tokensFromAmount: "",
  successful: false,
  loading: false,
  errorTransaction: false,
  error: false,
  setError: (state) => set(() => ({ error: state })),
  setErrorTransaction: (state) => set(() => ({ errorTransaction: state })),
  setLoading: (loading) => set(() => ({ loading: loading })),
  setSuccessful: (successful) => set(() => ({ successful: successful })),
  setTokensFromAmount: (amount) => set(() => ({ tokensFromAmount: amount })),
  setTokensToAmount: (amount) => set(() => ({ tokensToAmount: amount })),
  setInputAmountInUsd: (amount) => set(() => ({ inputAmountInUsd: amount })),
  setToken: (token) => set(() => ({ token: token })),
  setNetwork: (network) => set(() => ({ network: network })),
}))

export default useStore;