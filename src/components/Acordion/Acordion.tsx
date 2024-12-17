import { useState } from 'react';
import style from './Acordion.module.scss';

import { AcordionItems } from './AcordionItems';

interface AcordionProps {
  list: Array<{ title: string; content: string | React.ReactNode }>;
}

export const Acordion = ({ list }: AcordionProps) => {
  const [openId, setOpenId] = useState<number | null>(null);

  
  return (
    <ul className={style.acordion}>
      {list.map((item, id) => (
        <AcordionItems
          key={id}
          item={item}
          isOpen={openId === id}
          onClick={() => 
            (id === openId ? setOpenId(null) : setOpenId(id))
          }
        />
      ))}
    </ul>
  );
};
