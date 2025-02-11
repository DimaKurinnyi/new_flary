import { BiSolidError } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import style from './ErrorTransaction.module.scss';
import useStore from "@/store";

//@ts-ignore
export const ErrorTransaction = () => {
  const {setErrorTransaction, errorTransaction} = useStore()

  const handlerCloseError = () => {
    setErrorTransaction(false);
  };

  return (
    <div
      className={style.ErrorTransaction}
      style={
        errorTransaction ? { display: 'block', scale: '1' } : { display: 'none', scale: '0.1' }
      }>
      <div className={style.wrapper}>
        <BiSolidError className={style.errorIcon} size={30} />
        <div className={style.content}>
          <h3 className={style.errorText}>Transaction Failed</h3>
          <p className={style.errorDescription}>Please check your wallet and try again.</p>
        </div>
        <IoMdClose size={20} onClick={handlerCloseError} style={{ cursor: 'pointer' }} />
      </div>
    </div>
  );
};
