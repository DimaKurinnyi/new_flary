import { Link } from 'react-router-dom';

import style from './HeaderNav.module.scss';

export const HeaderNav = () => {
  // const buttonContent = [
  //   { link: '/how-to-buy', tittle: 'How To Buy' },
  //   { link: '/giveaway', tittle: 'Win $333K' },
  // ];
  return (
    <div className={style.HeaderNav}>
      <Link to="/how-to-buy" className={style.button}>
        <span>How To Buy</span>
      </Link>
      <div className={style.button_2}>
        <span className={style.coming}>Win $333K</span>
      </div>
    </div>
  );
};
