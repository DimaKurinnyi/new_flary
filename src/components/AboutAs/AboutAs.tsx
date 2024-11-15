import { motion } from 'framer-motion';

import style from './AboutAs.module.scss';

import AboutAsImg from '../../assets/AboutAs.png';

const animation = {
  hidden: {
    y: 75,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const AboutAs = () => {
  return (
    <div className={style.AboutAs} id="about">
      <motion.div
        className={style.block}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}>
        <motion.div
          variants={animation}
          transition={{ duration: '1', delay: 0.25 }}
          className={style.contentHelperImg}>
          <img loading='lazy' src={AboutAsImg} alt="AboutAsImg" />
        </motion.div>
        <motion.div
          variants={animation}
          transition={{ duration: '1', delay: 0.25 }}
          className={style.content}>
          <div className={style.contentTitle}>One platform - multiple solution </div>
          <div className={style.contentText}>
            Flary bridges the gap between the familiar world of Web-2 and the exciting potential of
            Web3. Our platform is designed to make the leap from TradFI to DeFi seamless and
            advantageous for all users. With Flary, you can unlock the power of your assets without
            the usual headaches, ensuring you're always ready to seize the next big opportunity.
          </div>
          {/* <div className={style.containerBlikDark}>
            
          </div>
          <div className={style.containerBlik}>
            
          </div> */}
        </motion.div>
      </motion.div>

      <section className={style.netBackground}>
        <motion.div
          viewport={{ once: true }}
          initial="hidden"
          whileInView="visible"
          className={style.block}>
          <motion.div
            variants={animation}
            transition={{ duration: '1', delay: 0.25 }}
            className={style.content}>
            <div className={style.contentTitleLittle}>Problem </div>
            <div className={style.contentTitleLittleBlur}></div>
            <div className={style.contentText}>
              <p>
                {' '}
                Today, at the height of the crypto era and the volatile bull market, there is a
                great need to increase the mobility of your assets in order not to lose the best
                opportunities.
                <br />
                <br /> Imagine a scenario where you urgently need USDT tokens on the ERC-20 network
                to participate in some promising event, but you only have Bitcoin Inscriptions that
                you are bullish on and don't want to sell, what would you do?
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={animation}
            transition={{ duration: '1', delay: 0.25 }}
            className={style.contentHelper}>
            <span className={style.numSpan}>01</span>
            <h3>
              Get the <span className={style.textSpan}>maximum</span> with Flary finance
            </h3>
          </motion.div>
        </motion.div>
        <motion.div
          viewport={{ once: true }}
          initial="hidden"
          whileInView="visible"
          className={style.block}>
          <motion.div
            variants={animation}
            transition={{ duration: '1', delay: 0.25 }}
            className={style.contentHelper}>
            <span className={style.numSpan}>02</span>
            <h3>
              We work to <span className={style.textSpan}>make</span> your life easier
            </h3>
          </motion.div>
          <motion.div
            variants={animation}
            transition={{ duration: '1', delay: 0.25 }}
            className={style.content}>
            <div className={style.contentTitleSolution}>Solution</div>
            <div className={style.contentText}>
              <p>
                Flary Finance is innovatively designed to tackle such complex tasks as lending
                assets from one network while borrowing on a completely different one. Our unique
                developments allow us to combine advanced lending & borrowing protocol with
                cross-chain bridges enhanced by revenue-generating solutions. High liquidity, low
                commissions and total flexibility. All in one place. All at your convenience. All is
                Flary.
              </p>
              {/* <div className={style.contentTextBlur}></div> */}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};
