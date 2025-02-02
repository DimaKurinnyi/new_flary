import { motion } from 'framer-motion';
import { useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import style from './Acordion.module.scss';
interface ItemProps {
  item: { title: string; content: string | React.ReactNode };

  isOpen: boolean;
  onClick: () => void;
  animation: { [key: string]: { x: number; opacity: number } };
  id:number
}

export const AcordionItems = ({ item, isOpen, onClick, animation,id }: ItemProps) => {
  const itemRef = useRef<HTMLDivElement | null>(null);
  return (
    <motion.li
      className={style.acordion_item}
      variants={animation}
      transition={{ duration: '1', delay: 0.25*id }}>
      <div className={style.acordion_header} onClick={() => onClick()}>
        <h2>{item.title}</h2>
        <span>
          <IoIosArrowDown
            size={25}
            style={
              isOpen
                ? { transform: 'rotate(180deg)' }
                : { transform: 'rotate(0deg)', transition: 'transform 0.3s ease' }
            }
          />
        </span>
      </div>
      <div
        className={style.acordion_collapse}
        style={isOpen ? { height: `${itemRef.current?.scrollHeight}px` } : { height: '0px' }}>
        <div className={style.acordion_body} ref={itemRef}>
          {item.content}
        </div>
      </div>
    </motion.li>
  );
};
