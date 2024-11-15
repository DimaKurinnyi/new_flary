import { useState } from 'react';
import style from './Bajan.module.scss';

export const Bajan = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const handlerOpenBajan = () => {
    setOpen(!open);
  };
  const handlerOpenBajan1 = () => {
    setOpen1(!open1);
  };
  const handlerOpenBajan2 = () => {
    setOpen2(!open2);
  };
  const handlerOpenBajan3 = () => {
    setOpen3(!open3);
  };
  const handlerOpenBajan4 = () => {
    setOpen4(!open4);
  };
  return (
    <div className={style.bajan}>
      <div className={style.bajan_section} style={{ display: 'none' }}>
        <div className={style.tittle}>
          <h2>Buying With Ethereum (ETH)</h2>
          <p onClick={handlerOpenBajan} style={{ fontSize: '20px' }}>
            {open ? '-' : '+'}
          </p>
        </div>

        <ul
          style={
            open ? { height: 'auto', overflow: 'visible' } : { height: '0px', overflow: 'hidden' }
          }
          className={style.bajan_info}>
          <li>Buying with Ethereum (ETH)</li>
          <li>
            <span>Step 1:</span> Go to Flary Finance website: https://flary.finance.
          </li>
          <li>
            <span>Step 2:</span> Click on "Connect Wallet".
          </li>
          <li>
            <span>Step 3:</span> Connect Your Wallet on Ethereum (ERC20) Network.
          </li>
          <li>
            <span>Step 4:</span> Select the ETH button.
          </li>
          <li>
            <span>Step 5:</span> Enter the desired amount of ETH you wish to swap for $FLFI Tokens.
            Remember to leave sufficient ETH in your wallet for gas fees. We recommend not
            purchasing more than 0.98 ETH if you have 1 ETH in your wallet (leaving 0.02 ETH for
            Gas).
          </li>
          <li>
            <span>Step 6</span>: Click "Buy Now".
          </li>
          <li>
            <span>Step 7:</span> Confirm the transaction within your connected wallet.
          </li>
          <li>
            <span>Step 8:</span> View your $FLFI tokens in "Your Holdings".
          </li>
          <li>
            <span>Important Note:</span> Gas fees on the Ethereum network can fluctuate between
            $10-$25 worth of ETH. Ensure you have enough ETH in your wallet to cover these fees,
            leaving a sufficient buffer to complete transactions without issues.
          </li>
        </ul>
      </div>
      <div className={style.bajan_section}>
        <div className={style.tittle}>
          <h2>Buying With Ethereum (ETH)</h2>
          <p onClick={handlerOpenBajan1} style={{ fontSize: '20px' }}>
            {open1 ? '-' : '+'}
          </p>
        </div>

        <ul style={open1 ? { display: 'block' } : { display: 'none' }} className={style.bajan_info}>
          <li>Buying with Ethereum (ETH)</li>
          <li>
            <span>Step 1:</span> Go to Flary Finance website: https://flary.finance.
          </li>
          <li>
            <span>Step 2:</span> Click on "Connect Wallet".
          </li>
          <li>
            <span>Step 3:</span> Connect Your Wallet on Ethereum Network.
          </li>
          <li>
            <span>Step 4:</span> Select the desired network (left window - Ethereum) and desired
            token (right window - Ethereum) on the presale menu.
          </li>
          <li>
            <span>Step 5:</span> Enter the desired amount of ETH you wish to swap for $FLFI Tokens.
            Remember to leave sufficient ETH in your wallet for gas fees. For example, if you’re
            planning to invest 1 ETH it is recommended not entering more than 0.98 ETH (leaving 0.02
            ETH for Gas).
          </li>
          <li>
            <span>Step 6</span>: Click "Buy $FLFI".
          </li>
          <li>
            <span>Step 7:</span> Confirm the transaction within your connected wallet.
          </li>
          <li>
            <span>Step 8:</span> View your $FLFI tokens in "Your Holdings".
          </li>
          <li>
            <span>Important Note:</span> Gas fees on the Ethereum network can fluctuate between
            $10-$25 worth of ETH. Ensure you have enough ETH in your wallet to cover these fees,
            leaving a sufficient buffer to complete transactions without issues.
          </li>
        </ul>
      </div>
      <div className={style.bajan_section}>
        <div className={style.tittle}>
          <h2>Buying with BNB</h2>
          <p onClick={handlerOpenBajan2} style={{ fontSize: '20px' }}>
            {open2 ? '-' : '+'}
          </p>
        </div>

        <ul style={open2 ? { display: 'block' } : { display: 'none' }} className={style.bajan_info}>
          <li>Buying with BNB </li>
          <li>
            <span>Step 1:</span> Go to Flary Finance website: https://flary.finance.
          </li>
          <li>
            <span>Step 2:</span> Click on "Connect Wallet".
          </li>
          <li>
            <span>Step 3:</span> Connect Your Wallet on BNB chain Network.
          </li>
          <li>
            <span>Step 4:</span> Select the desired network (left window - BNB chain) and desired
            token (right window - BNB) on the presale menu.
          </li>
          <li>
            <span>Step 5:</span> Enter the desired amount of BNB you wish to swap for $FLFI Tokens.
            Remember to leave sufficient BNB in your wallet for gas fees.
          </li>
          <li>
            <span>Step 6</span>: Click "Buy $FLFI".
          </li>
          <li>
            <span>Step 7:</span> Confirm the transaction within your connected wallet.
          </li>
          <li>
            <span>Step 8:</span> View your $FLFI tokens in "Your holdings".
          </li>
        </ul>
      </div>
      <div className={style.bajan_section}>
        <div className={style.tittle}>
          <h2>Buying with USDT</h2>
          <p onClick={handlerOpenBajan3} style={{ fontSize: '20px' }}>
            {open3 ? '-' : '+'}
          </p>
        </div>

        <ul style={open3 ? { display: 'block' } : { display: 'none' }} className={style.bajan_info}>
          <li>Buying with USDT</li>
          <li>
            <span>Step 1:</span> Go to Flary Finance website: https://flary.finance.
          </li>
          <li>
            <span>Step 2:</span> Click on "Connect Wallet".
          </li>
          <li>
            <span>Step 3:</span> Select the desired network (left window) and desired token (right
            window - USDT) on the presale menu.
          </li>
          <li>
            <span>Step 4:</span> Enter the desired amount of USDT you wish to swap for $FLFI Tokens.
            Remember to leave a sufficient amount of native token in your wallet for gas fees.
          </li>
          <li>
            <span>Step 5:</span> Click "Buy $FLFI".
          </li>
          <li>
            <span>Step 6</span>: Confirm the transaction within your connected wallet.
          </li>
          <li>
            <span>Step 7:</span> View your $FLFI tokens in "Your holdings".
          </li>
        </ul>
      </div>
      <div className={style.bajan_section} style={{ display: 'none' }}>
        <div className={style.tittle}>
          <h2>Buying With Ethereum (ETH)</h2>
          <p onClick={handlerOpenBajan4} style={{ fontSize: '20px' }}>
            {open4 ? '-' : '+'}
          </p>
        </div>

        <ul style={open4 ? { display: 'block' } : { display: 'none' }} className={style.bajan_info}>
          <li>Buying with Ethereum (ETH)</li>
          <li>
            <span>Step 1:</span> Go to Flary Finance website: https://flary.finance.
          </li>
          <li>
            <span>Step 2:</span> Click on "Connect Wallet".
          </li>
          <li>
            <span>Step 3:</span> Connect Your Wallet on Ethereum (ERC20) Network.
          </li>
          <li>
            <span>Step 4:</span> Select the ETH button.
          </li>
          <li>
            <span>Step 5:</span> Enter the desired amount of ETH you wish to swap for RETIK Tokens.
            Remember to leave sufficient ETH in your wallet for gas fees. We recommend not
            purchasing more than 0.98 ETH if you have 1 ETH in your wallet (leaving 0.02 ETH for
            Gas).
          </li>
          <li>
            <span>Step 6</span>: Click "Buy Now".
          </li>
          <li>
            <span>Step 7:</span> Confirm the transaction within your connected wallet.
          </li>
          <li>
            <span>Step 8:</span> View your $FLFI tokens in "Your Holdings".
          </li>
          <li>
            <span>Important Note:</span> Gas fees on the Ethereum network can fluctuate between
            $10-$25 worth of ETH. Ensure you have enough ETH in your wallet to cover these fees,
            leaving a sufficient buffer to complete transactions without issues.
          </li>
        </ul>
      </div>
    </div>
  );
};
