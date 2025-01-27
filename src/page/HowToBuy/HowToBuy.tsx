import { Link } from 'react-router-dom';
import { HowToBuyGuide, Navbar } from '../../components';
import style from './HowToBuy.module.scss';

export const HowToBuy = () => {
  const buttonContent = [
    { link: '/how-to-buy', tittle: 'How To Buy', id: 'how-to-buy' },
    // { link: '/giveaway', tittle: 'Win $333K',id: 'giveaway'},
  ];

  return (
    <>
      <Navbar navLink={buttonContent} />
      <div className={style.HowToBuy}>
        <h1 className={style.header}>How to Buy $FLFI</h1>
        <div className={style.content_wrapper}>
          <h3>How to Buy Flary Presale</h3>
          <p className={style.title_3}>
            Discover the steps to acquire Flary Finance's $FLFI tokens.
          </p>
          <p>Choose the option that matches your preference and get started.</p>
          {/* </>
          ) : (
            <>
              <h3>FAQ</h3>
              <p className={style.title_3}>Frequently asked questions</p>
              <p className={style.description}>Got Questions? We've Got Answers!</p>
            </>
          )} */}

          {/* <Tabs selectedTabId={selectedTabId} setSelectedTabId={setSelectedTabId} /> */}

          <HowToBuyGuide />
          <div className={style.button_invest}>
            <Link to="/" style={{ width: 'fit-content', color: 'black' }}>
              Invest now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
