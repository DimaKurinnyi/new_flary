import { motion } from 'framer-motion';

import { Diagram } from './Diagram';
import style from './TokenInfo.module.scss';

export const TokenInfo = () => {
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
  return (
    <div className={style.TokenInfo}>
      <motion.div
        className={style.header}
        initial="hidden"
        whileInView="visible"
        variants={animation}
        transition={{ duration: '0.5' }}
        viewport={{ once: true }}>
        What makes $FLFI destined for huge growth?{' '}
      </motion.div>
      <div className={style.TokenInfo_content}>
        <motion.div
          className={style.block}
          initial="hidden"
          whileInView="visible"
          variants={animation}
          transition={{ duration: '0.5' }}
          viewport={{ once: true }}>
          <div className={style.block_header}>Token Info</div>
          <div className={style.blok_content}>
            <p>TICKER</p>
            <p>$FLFI</p>
          </div>
          <div className={style.blok_content}>
            <p>CHAIN</p>
            <p>ETHEREUM</p>
          </div>
          <div className={style.blok_content}>
            <p>TOKEN SUPPLY</p>
            <p> 100.000.000</p>
          </div>
          <div className={style.blok_content}>
            <p>INITIAL MARKET CAP</p>
            <p> $3.065.677</p>
          </div>
          <a
            href="https://docs.google.com/spreadsheets/d/1Z2hgw8ZQ7TDD4f8IEDFU7KoZgZ-S3PUEycSTUyJGzok/edit?gid=427940397#gid=427940397"
            target='_blank'
            rel='noreferrer'
            className={style.block_button}>
            <p>Detailed Info</p>
          </a>
        </motion.div>
        <Diagram />
        {/* <motion.div
          className={style.content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}>
          <ol>
            <motion.li variants={animationSupply} transition={{ duration: '1.5' }}>
              Full of real utility:
              <motion.ul variants={animationSupply} custom={1}>
                <div className={style.dot}></div> Enhanced staking
              </motion.ul>
              <motion.ul variants={animationSupply} custom={2}>
                <div className={style.dot}></div>Empowered lend
              </motion.ul>
              <motion.ul variants={animationSupply} custom={3}>
                <div className={style.dot}></div>Cheapened borrow
              </motion.ul>
              <motion.ul variants={animationSupply} custom={4}>
                <div className={style.dot}></div>Special offers
              </motion.ul>
            </motion.li>
            <motion.li variants={animationSupply} custom={5}>Deflationary</motion.li>
            <motion.li variants={animationSupply} custom={6}> Perfectly designed tokenomics</motion.li>
            <motion.li variants={animationSupply} custom={7}>No institutional selling pressure </motion.li>
            <motion.li variants={animationSupply} custom={8}>Governance</motion.li>
          </ol>
        </motion.div> */}
      </div>
    </div>
  );
};
