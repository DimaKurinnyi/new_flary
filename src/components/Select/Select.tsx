import { useState } from 'react';
import style from './Seleckt.module.scss';

import arrow from '../../assets/arrow_down.svg';
import BTC from '../../assets/BTC.svg';
import ETH from '../../assets/ETH.svg';

export const Select = () => {
  const [selectCrypto, setSelectCrypto] = useState(BTC);
  const [isDropdown, setDropDown] = useState(false);

  //@ts-ignore
  const handlerChangeCrypto = (crypto) => {
    setSelectCrypto(crypto);
    setDropDown(false);
  };
  const toggleDropdown = () => {
    setDropDown(!isDropdown);
  };
  console.log(isDropdown);
  console.log(selectCrypto);
  return (
    <div className={style.Select} onClick={toggleDropdown}>
      <img src={selectCrypto} alt="" />
      <img src={arrow} alt="" />

      {isDropdown && (
        <div className={style.crypto_list}>
          <div className={style.item} onClick={() => handlerChangeCrypto(BTC)}>
            <img src={BTC} alt="" />
            Bitcoin
          </div>
          <div className={style.item} onClick={() => handlerChangeCrypto(ETH)}>
            <img src={ETH} alt="" />
            Ethereum
          </div>
        </div>
      )}
    </div>
  );
};
