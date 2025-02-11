import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import style from './PopupNetwork.module.scss';

import {
  NETWORK_BSC,
  NETWORK_ETHEREUM,
} from '../constants';

export const PopupNetwork = ({
  //@ts-ignore
  imgEth,
  //@ts-ignore
  imgBNB,
  //@ts-ignore
  handlerChangeNetwork,
}) => {
  return (
    <div className={style.modal}>
      <div className={style.modal_wrapper}>
        <div className={style.tittle}>
          <h3>Wrong Chain</h3>
          <p>Please select one of the supported chains</p>
        </div>
        <div
          className={style.button_network}
          onClick={() => handlerChangeNetwork(NETWORK_ETHEREUM, imgEth, false)}>
          <div className={style.chain_grope}>
            <img src={imgEth} alt="" />
            <p>{NETWORK_ETHEREUM}</p>
          </div>
          <MdOutlineKeyboardDoubleArrowRight size={30} className={style.arrow} />
        </div>
        <div className={style.button_network} onClick={() => handlerChangeNetwork(NETWORK_BSC, imgBNB, false)}>
          <div className={style.chain_grope}>
            <img src={imgBNB} alt="" />
            <p>{NETWORK_BSC}</p>
          </div>
          <MdOutlineKeyboardDoubleArrowRight size={30} className={style.arrow} />
        </div>
      </div>
    </div>
  );
};
