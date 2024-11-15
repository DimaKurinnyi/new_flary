import { motion } from 'framer-motion';
import style from './ContactInfo.module.scss';

import { BsTwitterX } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { IoShareSocialOutline } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { PiTelegramLogoBold } from 'react-icons/pi';

export const ContactInfo = () => {
  const animation = {
    hidden: {
      x: -75,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,

    },
  };
  return (
    <motion.div
      className={style.ContactInfo}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}>
      <motion.div
        className={style.contentBlockWrap}
        variants={animation}
        transition={{ duration: '1', delay: 0.25 }}>
        <div className={style.contentBloc}>
          <MdOutlineEmail size={20} />
          <p>Email</p>
          <span>exampleEmail.com</span>
          <a
            href="mailto:examle8@gmail.com"
            className="z-10 mt-[10px] text-sm font-medium"
            target="_blank"
            rel="noreferrer">
            Send message
          </a>
        </div>
      </motion.div>
      <motion.div className={style.contentBlockWrap} variants={animation}
        transition={{ duration: '1', delay: 0.5 }}>
        <div className={style.contentBloc}>
          <IoShareSocialOutline size={20} />
          <p>Socials</p>
          <div className={style.socialLinks}>
            <a
              className={style.socialLink}
              href="https://discord.gg/vQtzREsQ6k"
              target="_blank"
              rel="noreferrer">
              <FaDiscord size={21} />
            </a>
            <a
              href="https://twitter.com/FlaryFinance"
              target="_blank"
              rel="noreferrer"
              className={style.socialLink}>
              <BsTwitterX size={21} />
            </a>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
              className="z-10 mt-[10px] text-sm font-medium">
              <PiTelegramLogoBold size={21} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
