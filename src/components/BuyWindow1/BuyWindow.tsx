import {createElement} from 'react';
import style from './BuyWindow.module.scss';
import {Progress} from './Progress/Progress';

import BNB_old_logo from '../../assets/bnb logo.webp';
import ETH from '../../assets/ETH.svg?react';
import FLFI from '../../assets/flary_coin.png';
import {Error} from './Error';
import {ErrorTransaction} from './ErrorTransaction/ErrorTransaction';
import {Loader} from './Loader/Loader';
import {PopupNetwork} from './PopapNetwork/PopupNetwork';
import {Successful} from './Successful/Successful';
import {YouPayComponent} from './YouPayComponent';
import {BuyButton} from './BuyButton';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {NetworksType} from "@/components/BuyWindow/types.ts";
import classes from "./buyWindow.module.css";
import youPayClasses from "./youPay.module.css";
import {networks, TokenIcons} from "@/components/BuyWindow/data";
import useBuyWindow from "@/components/BuyWindow/useBuyWindow";

export const BuyWindow = () => {
  const {
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
    tokensToAmount,
    successful,
    error,
    openPopupNetwork,
    handleChangeToken,
    setMaxAcceptableValue,
    handleAmountChange,
    updateTokenHoldings,
    handlerChangeNetwork,
    handleError
  } = useBuyWindow();

  return (
    <div className={style.BuyWindow}>
      <ErrorTransaction />
      {openPopupNetwork && (
        <PopupNetwork
          imgEth={ETH}
          imgBNB={BNB_old_logo}
          handlerChangeNetwork={handlerChangeNetwork}
        />
      )}
      <div className={style.bg}>
        <h1>{stage}</h1>
      </div>
      <p>1 $FLFI = ${tokenPriceActually} </p>
      <p>
        Price next stage = $
        {tokenSold < 16137500
          ? (tokenPriceActually + 0.01).toFixed(2)
          : (tokenPriceActually + 0.02).toFixed(2)}
      </p>

      <div style={{display: 'flex'}}>
        <p style={{marginTop: '15px', fontSize: '20px', display: 'inline'}}>
          <span style={{fontSize: '20px'}}>Your holdings:&nbsp;</span>
        </p>
        <p style={{marginTop: '15px', fontSize: '20px', display: 'inline'}}>
          {tokenHoldings}
        </p>
      </div>

      <Progress progress={progress.toFixed(2)}/>
      <p>
        Raised USD : $
        {collected
          .toFixed()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
        / ${usdtPerStage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </p>

      <div className={style.button_group}>
        <Select value={network} onValueChange={(value: NetworksType) => {
          handlerChangeNetwork(value);
        }}>
          <SelectTrigger>
            <SelectValue/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.entries(networks).map(item => (
                <SelectItem key={item[0]} value={item[0]}>
                  <span className="flex items-center gap-[10px]">
                    <span className={classes.icon}>
                      {createElement(TokenIcons[item[1].value])}
                    </span>
                    {item[1].name}
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className={style.down_button}>
          <YouPayComponent
            handleChangeToken={handleChangeToken}
            handleAmountChange={handleAmountChange}
            tokenValues={tokenValues}
            setMaxAcceptableValue={setMaxAcceptableValue}
          />
          <div className={youPayClasses.root}>
            <p className={youPayClasses.title}>You receive: </p>
            <div className={youPayClasses.section}>
              <div className={youPayClasses.placeholder}>
                <div className={youPayClasses.placeholderContent}>
                  <span className={youPayClasses.placeholderIcon}>
                    <img src={FLFI} alt=""/>
                  </span>
                  <span>$FLFI</span>
                </div>
              </div>
              <div className={youPayClasses.input}>
                <input
                  type="number"
                  step="any"
                  placeholder="0"
                  value={tokensToAmount}
                  onChange={(e) => handleAmountChange({type: "to", e: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <Error handleError={handleError}/>
      )}

      {loading ? (
        <Loader/>
      ) : successful ? (
        <Successful/>
      ) : (
        <BuyButton updateTokenHoldings={updateTokenHoldings}/>
      )}
    </div>
  );
};
