import {useState, useEffect, useMemo, createElement} from 'react';
import {
  NETWORK_SOLANA,
} from './constants';
import {useWallet} from '@solana/wallet-adapter-react';
import {NetworksType} from "@/components/BuyWindow/types.ts";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import classes from "./youPay.module.css";
import {networks, TokenIcons} from "@/components/BuyWindow/data";
import {useAccount} from "wagmi";
import useStore from "@/store";

export const YouPayComponent = (
  // @ts-ignore
  {tokenValues,setMaxAcceptableValue,handleAmountChange,handleChangeToken} // @TODO: add type
) => {
  const {network, token, tokensFromAmount} = useStore();
  const { status } = useAccount();
  const {connected: solWalletConnected} = useWallet();
  const [mounted, setMounted] = useState(false)

  const [maxButtonAvailable, setMaxButtonAvailable] = useState(false);

  useEffect(() => {
    setMounted(true) // @TODO: investigate why this is needed
  }, [])

  useEffect(() => {
    setMaxButtonAvailable(
      network === NETWORK_SOLANA ? solWalletConnected : status === 'connected'
    );
  }, [network, solWalletConnected, status]);

  const isCurrentWalletConnected = useMemo(() => (network === NETWORK_SOLANA && solWalletConnected) || (network !== NETWORK_SOLANA && status === 'connected'), [network, status, solWalletConnected]);

  const selection = useMemo(() => {
    return isCurrentWalletConnected ? <Select value={token} onValueChange={(value: NetworksType) => {
        handleChangeToken(value);
      }}>
        <SelectTrigger>
          <SelectValue/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {networks[network as NetworksType].tokens.map((item) => (
              <SelectItem key={item} value={item}>
                <span className={classes.token}>
                  <span className={classes.tokenIcon}>
                    {createElement(TokenIcons[item])}
                  </span>
                  {item}
                  <span className="ml-auto h-full flex flex-col justify-between items-end text-[12px]">
                    <span>
                      {tokenValues[network][item].balance >= 0.001 ? tokenValues[network][item].balance.toFixed(3) : "0"}
                    </span>
                    <span>
                      ${tokenValues[network][item].usd}
                    </span>
                  </span>
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select> :
      <div className={classes.placeholder}>
        <div className={classes.placeholderContent}>
          <span className={classes.placeholderIcon}>
            {createElement(TokenIcons[token])}
          </span>
          <span>{networks[network as NetworksType].value}</span>
        </div>
      </div>
  }, [isCurrentWalletConnected, network, token, tokenValues]);

  return (
    <>
      <div className={classes.root}>
        <p className={classes.title}>You pay: </p>
        <div className={classes.section}>
          {selection}
          <div className={classes.input}>
            <input
              type="text"
              placeholder="Enter Amount"
              value={tokensFromAmount}
              onChange={(e) => handleAmountChange({type: "from", e: e.target.value})}
            />
            {mounted ? maxButtonAvailable && (
              <p className={classes.inputMaxButton} onClick={() => setMaxAcceptableValue()}>
                MAX
              </p>
            )
              : null}
          </div>
        </div>
      </div>
    </>
  )
};
