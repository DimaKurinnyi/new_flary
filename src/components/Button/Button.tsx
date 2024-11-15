import { useState } from 'react';

import { AccountOverview } from '../AccountOverview/AccountOverview';
import style from './Button.module.scss';

export const Button = () => {
  const [openSideBar, setOpenSideBar] = useState(false);



  const nameButton = 'Profile'

  const showOverview = () => {
    setOpenSideBar(!openSideBar)
  };

  return (
    <>
      <button
        className={style.button}
        style={{ marginTop: '0px' }}
        // onClick={()=>connectWallet()}
        onClick={showOverview}
      >
        {nameButton}
      </button>
      <AccountOverview openSideBar={openSideBar} showOverview={() => showOverview()} />
    </>
  );
};
