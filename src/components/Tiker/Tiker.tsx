import AMB from '../../assets/Featured/AMB.png';
import Analytics from '../../assets/Featured/analytics insight.png';
import beIn from '../../assets/Featured/be in crypto.png';
import Benzinga from '../../assets/Featured/benzinga.png';
import Bitcoin from '../../assets/Featured/bitcoin com.png';
import Bloomberg from '../../assets/Featured/bloomberg.png';
import Cointelegraph from '../../assets/Featured/cointelegraph.png';
import Entrepreneur from '../../assets/Featured/entrepreneur.png';
import Investing from '../../assets/Featured/Investing.png';
import Khaleei from '../../assets/Featured/khaleei times.png';
import midDAy from '../../assets/Featured/mid day.png';
import Morningstar from '../../assets/Featured/morningstar.png';
import News from '../../assets/Featured/news btc.png';
import Economic from '../../assets/Featured/the economic times.png';
import newsCripto from '../../assets/Featured/the news crypto.png';
import timesIndia from '../../assets/Featured/the times of india.png';
import WBS from '../../assets/Featured/wbs.png';

import { motion } from 'framer-motion';
import { Animate } from '../Header/Animate';
import style from './Tiker.module.scss';

export const Tiker = () => {
  return (
    <div className={style.Tiker}>
      <Animate custom={1}>
        <h1>Featured In</h1>
      </Animate>

      <div className={style.ticker_container}>
        <motion.div
          className={style.ticker}
          animate={{ translateX: '-50%' }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}>
          <img src={AMB} alt={AMB} />
          <img src={Analytics} alt={Analytics} />
          <img src={beIn} alt={beIn} />
          <img src={Benzinga} alt={Benzinga} />
          <img src={Bitcoin} alt={Bitcoin} />
          <img src={Bloomberg} alt={Bloomberg} />
          <img src={Cointelegraph} alt={Cointelegraph} />
          <img src={Entrepreneur} alt={Entrepreneur} />
          <img src={Investing} alt={Investing} />
          <img src={Khaleei} alt={Khaleei} />
          <img src={midDAy} alt={midDAy} />
          <img src={Morningstar} alt={Morningstar} />
          <img src={News} alt={News} />
          <img src={Economic} alt={Economic} />
          <img src={newsCripto} alt={newsCripto} />
          <img src={timesIndia} alt={timesIndia} />
          <img src={WBS} alt={WBS} />
        </motion.div>
      </div>
    </div>
  );
};
