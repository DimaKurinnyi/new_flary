import { FaPowerOff } from 'react-icons/fa';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import style from './AccountOverview.module.scss';

import Avatar from '../../assets/fire.png';

//@ts-ignore
export const AccountOverview = ({ openSideBar, showOverview }) => {
  return (
    <div className={openSideBar ? style.AccountOverview_open : style.AccountOverview_close}>
      <div className={style.arrowClose} onClick={showOverview}>
        <MdKeyboardDoubleArrowRight size={40} />
      </div>
      <div className={style.contentOverview}>
        <div className={style.headerOverview}>
          <div className={style.headerOverviewLeft}>
            <img src={Avatar} alt="" className={style.avatarOverview} />
            <p style={{ fontSize: '16px', fontWeight: '400' }}>5555</p>
          </div>

          <FaPowerOff size={20} color="#fff" style={{ cursor: 'pointer' }} />
        </div>
        <div className={style.price}>
          <p style={{ fontSize: '16px', fontWeight: '400' }}>Price on launch:</p>
          <h2>93,00$</h2>
          <div className={style.priceToken}>
            <h3 style={{ fontSize: '16px', fontWeight: '400' }}>0,010$</h3>
            <p>(Price per token)</p>
          </div>
        </div>
        <div className={style.overviewBlocks}>
          <div className={style.overviewBlock}>
            <p>10000,00 FLFI</p>
            <span>You Holdings</span>
          </div>
          <div className={style.overviewBlock}>
            <p>100,00 </p>
            <span>Spend money in USDC</span>
          </div>
          <div className={style.overviewBlock}>
            <p>0.012$</p>
            <span>Average price per token</span>
          </div>
        </div>
      </div>
    </div>
  );
};
