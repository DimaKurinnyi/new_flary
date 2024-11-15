import style from './TokenInfo.module.scss';

import { FaGift } from 'react-icons/fa6';
import { GiBurningEmbers, GiReceiveMoney, GiTakeMyMoney } from 'react-icons/gi';
import { GrStakeholder } from 'react-icons/gr';
import { MdMoneyOff, MdToken } from 'react-icons/md';
import { TbBuildingBank } from 'react-icons/tb';

export const Diagram = () => {
  return (
    <div className={style.Diagram}>
      <div className={style.Tittle}>
        Full of real utility
        <div className={style.line1}>
          <div className={style.Diagram_1level}>
            {' '}
            <GrStakeholder
              size={35}
              color="#ea512f" className={style.icon_1level}
            />
            Enhanced staking
          </div>
        </div>
        <div className={style.line2}>
          <div className={style.Diagram_tittle}>
            Perfectly designed
            <div className={style.line1} style={{ left: '35%', backgroundColor: '#ffa957' }}>
              <div className={style.Diagram_1level} style={{ textWrap: 'wrap' }}>
                {' '}
                <GiBurningEmbers size={35} className={style.icon_2level} color="#ffa957" />
                Deflationary
              </div>
            </div>
            <div className={style.line3} style={{ left: '65%', backgroundColor: '#ffa957' }}>
              <div className={style.Diagram_1level} style={{ textWrap: 'wrap' }}>
                {' '}
                <MdToken size={35} color="#ffa957" className={style.icon_2level} />
                Perfectly designed tokenomics
              </div>
            </div>
            <div className={style.line4} style={{ backgroundColor: '#ffa957' }}>
              <div className={style.Diagram_1level} style={{ textWrap: 'wrap' }}>
                {' '}
                <TbBuildingBank size={35} color="#ffa957" className={style.icon_2level} />
                Governance
              </div>
            </div>
            <div className={style.line5} style={{ backgroundColor: '#ffa957' }}>
              <div className={style.Diagram_1level} style={{ textWrap: 'wrap' }}>
                {' '}
                <MdMoneyOff size={35} color="#ffa957" className={style.icon_2level} />
                No institutional selling pressure
              </div>
            </div>
          </div>
        </div>
        <div className={style.line3}>
          <div className={style.Diagram_1level}>
            <GiReceiveMoney
              size={35}
              color="#ea512f" className={style.icon_1level}
            />
            Cheapened borrow
          </div>
        </div>
        <div className={style.line4}>
          <div className={style.Diagram_1level}>
            {' '}
            <FaGift
              size={28}
              color="#ea512f" className={style.icon_1level}
            />
            Special offers
          </div>
        </div>
        <div className={style.line5}>
          <div className={style.Diagram_1level}>
            {' '}
            <GiTakeMyMoney
              size={35}
              color="#ea512f" className={style.icon_1level}
            />
            Empowered lend
          </div>
        </div>
      </div>
    </div>
  );
};
