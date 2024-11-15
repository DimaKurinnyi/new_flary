import { BiSolidError } from 'react-icons/bi';
import style from './Error.module.scss';

//@ts-ignore
export const Error = ({ setError, setTokensFromAmount, setTokensToAmount }) => {
  const errorClick = () => {
    setError(false)
    setTokensFromAmount('')
    setTokensToAmount('')
  }
  return (

    <div className={style.Error}>
      <BiSolidError size={35} color="rgba(255, 204, 0)" />
      <p>You don't have enough funds to complete the transaction.</p>
      <div onClick={errorClick} className={style.button_error}>
        close
      </div>
    </div>
  );
};
