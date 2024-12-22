import { motion } from 'framer-motion';
import style from './Roadmap.module.scss';
const animation = {
  hidden: {
    scale: 1.4,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
  },
};

export const Roadmap = () => {
  return (
    <section id="roadmap" className={style.hidden}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={animation}
        transition={{ duration: '1' }}
        viewport={{ amount: 0.2, once: true }}
        className={style.Roadmap}>
        <div className="tittle">Roadmap</div>
        <div className={style.littleTittle}>
          <div className={style.infoData}>
            <div className={style.dotGreen}></div>
            <div className={style.info}>Done</div>
          </div>
          <div className={style.infoData}>
            <div className={style.dotYellow}></div>
            <div className={style.info}>In progress</div>
          </div>
          <div className={style.infoData}>
            <div className={style.dotWhite}></div>
            <div className={style.info}>Upcoming</div>
          </div>
        </div>
        <div className={style.response}>
          <div className={style.timeLine}>
            <div className={style.line}></div>
            <div className={style.tileLineBlok}>
              <div className={style.lineDotGreen}></div>
              <div className={style.lineTittle}>Stage 1</div>
              <div className={style.infoData}>
                <div className={style.dotGreen}></div>
                <div className={style.infoLine}>Team up</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotGreen}></div>
                <div className={style.infoLine}>Market Analysis</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotGreen}></div>
                <div className={style.infoLine}>Complete development of Business Model</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotGreen}></div>
                <div className={style.infoLine}> Protocol architecture design</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotGreen}></div>
                <div className={style.infoLine}>Launch Social Media</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotGreen}></div>
                <div className={style.infoLine}>Initial infrastructure setup</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotGreen}></div>
                <div className={style.infoLine}>Website Development</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotGreen}></div>
                <div className={style.infoLine}>Community Building</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotGreen}></div>
                <div className={style.infoLine}>Marketing Strategy Setup</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotGreen}></div>
                <div className={style.infoLine}>Core modules development</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotGreen}></div>
                <div className={style.infoLine}>Introduction to Potential Partners</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotYellow}></div>
                <div className={style.infoLine}> Active Marketing Campaign</div>
              </div>
            </div>
            <div className={style.tileLineBlok}>
              <div className={style.lineDotYellow}></div>
              <div className={style.lineTittle}>Stage 2</div>
              <div className={style.infoData}>
                <div className={style.dotYellow}></div>
                <div className={style.infoLine}>Release technical documentation</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotYellow}></div>
                <div className={style.infoLine}>TGE</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotWhite}></div>
                <div className={style.infoLine}>Governance Model Implementation</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotWhite}></div>
                <div className={style.infoLine}>Closed Beta Test</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotWhite}></div>
                <div className={style.infoLine}>Improving UI/UX</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotWhite}></div>
                <div className={style.infoLine}>Launch testnet</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotWhite}></div>
                <div className={style.infoLine}>Security audit</div>
              </div>
            </div>
            <div className={style.tileLineBlok}>
              <div className={style.lineDotWhite}></div>
              <div className={style.lineTittle}>Stage 3</div>
              <div className={style.infoData}>
                <div className={style.dotWhite}></div>
                <div className={style.infoLine}>Mainnet Launch</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotWhite}></div>
                <div className={style.infoLine}>Integration with DeFi Protocols</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotWhite}></div>
                <div className={style.infoLine}>Community Rewards</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotWhite}></div>
                <div className={style.infoLine}>Global Expansion</div>
              </div>
              <div className={style.infoData}>
                <div className={style.dotWhite}></div>
                <div className={style.infoLine}>Tier 1 listing</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
