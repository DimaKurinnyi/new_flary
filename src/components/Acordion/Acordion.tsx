import { motion } from 'framer-motion';
import { useState } from 'react';
import style from './Acordion.module.scss';

import { AcordionItems } from './AcordionItems';

interface AcordionProps {
  list: Array<{ title: string; content: string | React.ReactNode }>;
}

export const Acordion = ({ list }: AcordionProps) => {
  const [openId, setOpenId] = useState<number | null>(null);
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
    <motion.ul
      className={style.acordion}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}>
      {list.map((item, id) => (
        <>
          <AcordionItems
            key={id}
            id={id}
            item={item}
            animation={animation}
            isOpen={openId === id}
            onClick={() => (id === openId ? setOpenId(null) : setOpenId(id))}
          />
        </>
      ))}
    </motion.ul>
  );
};
