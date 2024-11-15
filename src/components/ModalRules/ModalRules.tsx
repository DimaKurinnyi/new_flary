import { IoMdClose } from 'react-icons/io';
import style from './ModalRules.module.scss';

//@ts-ignore
export const ModalRules = ({ isOpen, onClose, children, title }) => {
  return (
    <>
      {isOpen && (
        <div className={style.modal} onClick={() => onClose()}>
          <div className={style.modal_wrapper} onClick={(e) => e.stopPropagation()}>
            <div onClick={() => onClose()} className={style.close_button}>
              <IoMdClose size={24} />
            </div>
            <h2 className={style.modal_tittle}>{title}</h2>
            <div className={style.modal_content} onClick={(e) => e.stopPropagation()}>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
