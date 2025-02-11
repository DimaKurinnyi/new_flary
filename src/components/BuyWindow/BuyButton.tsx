import style from './BuyWindow.module.scss';
import { NETWORK_SOLANA } from './constants';
import { BuyButtonSolana } from './BuyButtonSolana';
import { BuyButtonEvm } from './BuyButtonEvm';
import useStore from "@/store";

//@ts-ignore
export const BuyButton = ({ updateTokenHoldings }) => {
  const {network} = useStore();
  return (
    <>
      {
        network === NETWORK_SOLANA
          ? <BuyButtonSolana updateTokenHoldings={updateTokenHoldings} />
          : <BuyButtonEvm updateTokenHoldings={updateTokenHoldings} />
      }
    </>
  );
};

export const MakeAPurchaseButton = ({
  //@ts-ignore
  onClick
}) => {
  const {inputAmountInUsd} = useStore();

  return (
    <div
      className={style.pay_button}
      onClick={onClick}
      style={
        inputAmountInUsd < 50
          ? {
            opacity: '0.3',
            pointerEvents: 'none',
            cursor: 'not-allowed',
          }
          : { opacity: '1' }
      }>
      {inputAmountInUsd < 50 ? 'Minimum purchase is $50' : 'Buy FLFI'}
    </div>
  )
};