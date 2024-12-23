import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FAQ, HowToBuyGuide, Navbar, Tabs } from '../../components';
import style from './HowToBuy.module.scss';

export const HowToBuy = () => {
  const buttonContent = [
    { link: '/how-to-buy', tittle: 'How To Buy', id: 'how-to-buy' },
    // { link: '/giveaway', tittle: 'Win $333K',id: 'giveaway'},
  ];

  const [selectedTabId, setSelectedTabId] = useState(1);
  return (
    <>
      <Navbar navLink={buttonContent} />
      <div className={style.HowToBuy}>
        <h1 className={style.header}>How to Buy Flary Presale</h1>
        <div className={style.content_wrapper}>
          {selectedTabId === 1 ? (
            <>
              <h3>How to Buy Flary Presale</h3>
              <p>Discover the steps to acquire Flary Finance's $FLFI tokens.</p>
            </>
          ) : (
            <>
              <h3>FAQ</h3>
              <p>Frequently asked questions</p>
            </>
          )}

          <Tabs selectedTabId={selectedTabId} setSelectedTabId={setSelectedTabId} />
          <div className={style.border}>
            {selectedTabId === 1 ? <HowToBuyGuide /> : <FAQ />}
            <Link to="/" className={style.button_invest}>Invest now </Link>
          </div>
        </div>
      </div>
    </>
  );
};
