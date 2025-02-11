import {
  NETWORK_BSC,
  NETWORK_ETHEREUM,
  NETWORK_SOLANA,
  TOKEN_BNB,
  TOKEN_ETHEREUM, TOKEN_SOL, TOKEN_USDC, TOKEN_USDT
} from "@/components/BuyWindow/constants.ts";

export type NetworksType = typeof NETWORK_ETHEREUM | typeof NETWORK_BSC | typeof NETWORK_SOLANA;
export type TokensType = typeof TOKEN_ETHEREUM | typeof TOKEN_BNB | typeof TOKEN_SOL | typeof TOKEN_USDC | typeof  TOKEN_USDT;
