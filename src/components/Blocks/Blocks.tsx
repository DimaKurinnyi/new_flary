import { motion } from 'framer-motion';

import icon10 from '../../assets/Blocks/Benefit icon10.svg';
import icon2 from '../../assets/Blocks/Benefit icon2.svg';
import icon3 from '../../assets/Blocks/Benefit icon3.svg';
import icon6 from '../../assets/Blocks/Benefit icon6.svg';
import icon7 from '../../assets/Blocks/Benefit icon7.svg';
import icon8 from '../../assets/Blocks/Benefit icon8.svg';
import icon9 from '../../assets/Blocks/Benefit icon9.svg';
import icon5 from '../../assets/Blocks/benefiticon5.svg';
import icon4 from '../../assets/Blocks/benfiticon4.svg';
import icon from '../../assets/Blocks/icon.svg';
import style from './Blocks.module.scss';

export const Blocks = () => {
  const animationScale = {
    hidden: {
      opacity: 0,
      scale: 0.1,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };
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
  const blockInner = [
    {
      img: icon,
      tittle: 'User-Friendly',
      text: 'Access all networks and services from a single, intuitive dApp',
    },
    {
      img: icon2,
      tittle: 'Cost-Effective',
      text: 'Nearly interest-free with auto-staking covering most fees',
    },
    {
      img: icon3,
      tittle: 'Native Cross-Chain bridge',
      text: 'Seamlessly transfer assets across multiple blockchains',
    },
    {
      img: icon4,
      tittle: 'Modularity',
      text: ' Modular infrastructure allows easy integration of new features and networks',
    },
    {
      img: icon5,
      tittle: 'Dynamic Rate Evaluation',
      text: 'Dynamic supply and demand analysis ensures fair terms',
    },
    {
      img: icon6,
      tittle: 'Non-EVM compatible',
      text: 'Supports wide range of non-EVM networks like Solana, Cosmos, Bitcoin and so on',
    },
    {
      img: icon7,
      tittle: 'Robust security',
      text: 'Reliable platform with regular audits and rigorous security measures.',
    },
    {
      img: icon8,
      tittle: 'Feature Requests',
      text: 'Community governance allows $FLFI token holders to vote on new features adoption',
    },
    {},
    {
      img: icon9,
      tittle: 'Auto-staking & Yield',
      text: 'A streamlined solution that removes technical complexity and offers great additional revenue for our customers',
    },
    {
      img: icon10,
      tittle: 'High Liquidity ',
      text: 'Guaranteed liquidity with flexible withdrawal options',
    },
    {},
  ];
  return (
    <div className={style.Blocks}>
      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={animationScale}
        transition={{ duration: '1' }}>
        Ultimate aggregator powered with Lending & Borrowing, powerful functionality and modular
        architecture.{' '}
      </motion.h1>
      <div className={style.blocks_grid}>
        {blockInner.map((block, i) => (
          <motion.div
            //@ts-ignore
            kay={i}
            className={block.tittle ? style.block : style.false_block}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animation}
            transition={{ duration: '1', delay: i / 6 }}>
            <div className={block.tittle ? style.block_outer : ''}>
              <div className={block.tittle ? style.block_inner : ''}>
                <img src={block.img} alt="" />
                <h4>{block.tittle}</h4>
                <p>{block.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
