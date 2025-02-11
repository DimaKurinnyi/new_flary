import {
  NETWORK_BSC,
  NETWORK_ETHEREUM, NETWORK_SOLANA,
  TOKEN_BNB,
  TOKEN_ETHEREUM, TOKEN_SOL, TOKEN_USDC,
  TOKEN_USDT
} from "@/components/BuyWindow/constants.ts";
import {FunctionComponent, SVGProps} from "react";
import ETH from "../../assets/ETH.svg?react";
import BNB from '../../assets/bnb-chain.svg?react';
import SOL from "../../assets/solana.svg?react";
import USDT from "../../assets/USDT.svg?react";
import USDC from "../../assets/USDC.svg?react";
import {NetworksType, TokensType} from "@/components/BuyWindow/types";

export const networks: Record<NetworksType, {name: string, value: TokensType, tokens: TokensType[]}> = {
  [NETWORK_ETHEREUM]: {
    name: 'Ethereum',
    value: TOKEN_ETHEREUM,
    tokens: [
      TOKEN_ETHEREUM,
      TOKEN_USDT
    ]
  },
  [NETWORK_BSC]: {
    name: 'BNB Chain',
    value: TOKEN_BNB,
    tokens: [TOKEN_BNB,TOKEN_USDT]
  },
  [NETWORK_SOLANA]: {
    name: 'Solana',
    value: TOKEN_SOL,
    tokens: [TOKEN_SOL,TOKEN_USDC]
  }
}

export const TokenIcons: Record<string, FunctionComponent<SVGProps<SVGSVGElement>>> = {
  [TOKEN_ETHEREUM]: ETH,
  [TOKEN_BNB]: BNB,
  [TOKEN_SOL]: SOL,
  [TOKEN_USDT]: USDT,
  [TOKEN_USDC]: USDC,
}