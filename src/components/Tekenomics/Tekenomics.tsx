import { motion } from 'framer-motion';

import { Schedule } from '../Schedule/Schedule';
import style from './Tekenomics.module.scss';

// import BgImage from '../../assets/bg-tekenomics.png';
const animation = {
  hidden: {
    opacity: 0,
    scale: 0.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

const animationSupply = {
  hidden: {
    x: -200,
    opacity: 0,
  },
  //@ts-ignore
  visible: (custom) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};

export const Tekenomics = () => {
  return (
    <div className={style.Tekenomics} id="tekenomics">

      <motion.p
        initial="hidden"
        whileInView="visible"
        variants={animation}
        transition={{ duration: '0.5' }}
        viewport={{ once: true }}>
        Tokenomics
      </motion.p>
      <div className={style.tekenomicsInfo}>
        <div className={style.description}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={style.data}>
            <motion.div
              className={style.titleSchedule}
              variants={animation}
              transition={{ duration: '0.5' }}>
              Total supply:
            </motion.div>
            <div className={style.titleScheduleBlur}></div>
            <div className={style.adapt}>
              <div>
                <motion.div variants={animationSupply} custom={1} className={style.infoData}>
                  <div className={style.dot} style={{ background: 'rgba(255, 60, 0)' }}></div>
                  <div className={style.info}>30% Public</div>
                </motion.div>
                <motion.div variants={animationSupply} custom={2} className={style.infoData}>
                  <div className={style.dot} style={{ background: 'rgba(255, 75, 15)' }}></div>
                  <div className={style.info}>19% Staking&Liquidity rewards</div>
                </motion.div>
                <motion.div variants={animationSupply} custom={3} className={style.infoData}>
                  <div className={style.dot} style={{ background: 'rgba(255, 90, 30)' }}></div>
                  <div className={style.info}>13% Marketing/Treasury </div>
                </motion.div>
                <motion.div variants={animationSupply} custom={3} className={style.infoData}>
                  <div className={style.dot} style={{ background: 'rgba(255, 105, 45)' }}></div>
                  <div className={style.info}>12% Adv&Team </div>
                </motion.div>
              </div>
              <div>
                <motion.div variants={animationSupply} custom={4} className={style.infoData}>
                  <div className={style.dot} style={{ background: 'rgba(255, 120, 60)' }}></div>
                  <div className={style.info}>12% Community&Ecosystem</div>
                </motion.div>
                <motion.div variants={animationSupply} custom={5} className={style.infoData}>
                  <div className={style.dot} style={{ background: 'rgba(255, 135, 75)' }}></div>
                  <div className={style.info}>10% Liquidity</div>
                </motion.div>
                <motion.div variants={animationSupply} custom={6} className={style.infoData}>
                  <div className={style.dot} style={{ background: 'rgba(255, 145, 75)' }}></div>
                  <div className={style.info}>4% Early investors</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className={style.schedule}>
          <Schedule />
        </div>
      </div>
    </div>
  );
};
