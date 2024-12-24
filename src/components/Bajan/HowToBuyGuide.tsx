import { Acordion } from '../Acordion/Acordion';

export const HowToBuyGuide = () => {
  const list = [
    {
      title: 'Buying with Ethereum (ETH)',
      content: (
        <>
          <strong>Step1 :</strong>Go to Flary Finance website:
          <a
            href="https://flary.finance/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#ffa957', textDecoration: 'underline' }}>
            https://flary.finance/
          </a>
          <br />
          <br />
          <strong>Step2 :</strong> Click on "Connect Wallet".
          <br />
          <br />
          <strong>Step3 :</strong> Connect Your Wallet on Ethereum (ERC20) Network.
          <br />
          <br />
          <strong>Step4 :</strong> Select the ETH button.
          <br />
          <br />
          <strong>Step5 :</strong> Enter the desired amount of ETH you wish to swap for $FLFI
          Tokens. Remember to leave sufficient ETH in your wallet for gas fees. We recommend not
          purchasing more than 0.98 ETH if you have 1 ETH in your wallet (leaving 0.02 ETH for Gas).
          <br />
          <br />
          <strong>Step6 :</strong> Click "Buy Now".
          <br />
          <br />
          <strong>Step7 :</strong> Confirm the transaction within your connected wallet.
          <br />
          <br />
          <strong>Step8 :</strong> View your $FLFI tokens in "Your Holdings".
          <br />
          <br />
          <strong>Important Note :</strong> Gas fees on the Ethereum network can fluctuate between
          $10-$25 worth of ETH. Ensure you have enough ETH in your wallet to cover these fees,
          leaving a sufficient buffer to complete transactions without issues.
        </>
      ),
    },
    {
      title: 'Buying with BNB',
      content: (
        <>
          <strong>Step1 :</strong> Go to Flary Finance website:
          <a
            href="https://flary.finance/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#ffa957', textDecoration: 'underline' }}>
            https://flary.finance/
          </a>
          <br />
          <br />
          <strong>Step2 :</strong> Click on "Connect Wallet".
          <br />
          <br />
          <strong>Step3 :</strong> Connect Your Wallet on BNB chain Network.Network.
          <br />
          <br />
          <strong>Step4 :</strong> Select the desired network (left window - BNB chain) and desired
          token (right window - BNB) on the presale menu.
          <br />
          <br />
          <strong>Step5 :</strong> Enter the desired amount of BNB you wish to swap for $FLFI
          Tokens. Remember to leave sufficient BNB in your wallet for gas fees.
          <br />
          <br />
          <strong>Step6 :</strong> Click "Buy Now".
          <br />
          <br />
          <strong>Step7 :</strong> Confirm the transaction within your connected wallet.
          <br />
          <br />
          <strong>Step8 :</strong> View your $FLFI tokens in "Your Holdings".
        </>
      ),
    },
    {
      title: 'Buying with USDT',
      content: (
        <>
          <strong>Step1 :</strong> Go to Flary Finance website:
          <a
            href="https://flary.finance/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#ffa957', textDecoration: 'underline' }}>
            https://flary.finance/
          </a>
          <br />
          <br />
          <strong>Step2 :</strong> Click on "Connect Wallet".
          <br />
          <br />
          <strong>Step3 :</strong> Select the desired network (left window) and desired token (right
          window - USDT) on the presale menu
          <br />
          <br />
          <strong>Step4 :</strong> Enter the desired amount of USDT you wish to swap for $FLFI
          Tokens. Remember to leave a sufficient amount of native token in your wallet for gas fees.
          <br />
          <br />
          <strong>Step5 :</strong> Click "Buy Now".
          <br />
          <br />
          <strong>Step6 :</strong> Confirm the transaction within your connected wallet.
          <br />
          <br />
          <strong>Step7 :</strong> View your $FLFI tokens in "Your Holdings".
        </>
      ),
    },
  ];
  return (
    <div>
      
      
      <Acordion list={list} />
    </div>
  );
};
