;
import { Acordion } from '../Acordion/Acordion';
import style from './FAQ.module.scss'

export const FAQ = () => {
  const list = [
    {
      title: `Why don't I see $FLFI tokens on my wallet?`,
      content:
        'You will be able to withdraw your tokens to your wallet when the persale is complete, and TGE (token generation event) occurs. Now you can track your balance on the site after connecting the wallet from which the purchase was made.',
    },
    {
      title: 'Why is “my holdings” balance 0 after I made a purchase?',
      content: `If you have problems with the balance display try turning off the translator, disconnecting the wallet, reloading the page and reconnecting the wallet.
    If you're using a mobile device and this method doesn't work, try accessing the site directly through a web browser inside the downloaded wallet app.
    `,
    },
    {
      title: 'When and where will $FLFI launch',
      content:
        'Flary token is scheduled to list on both centralized (CEX) and decentralized (DEX) exchanges in Q1 2025. Stay tuned for official announcements about the specific launch time and trading platforms by following our social media channels.',
    },
    {
      title: 'What Sets Flary Finance Apart from Other Protocols?',
      content: `While Flary Finance's initial core functionality lies in lending and borrowing, a modular architecture enables the seamless addition of other services and features, like autostaking, which is available right from launch. In addition, Flary supports unlimited adoption and alignment with both EVM and non-EVM networks. This cross-chain compatibility empowers users to capitalize on the growth of diverse ecosystems effortlessly, making Flary Finance a future-proof solution that evolves alongside the rapidly expanding blockchain landscape.`,
    },
    {
      title: 'Where can I learn about the project’s development plans?',
      content: (<>
        You can learn about Flary Finance’s development plans by visiting our documentation on GitBook, where you’ll find the roadmap and detailed project information.   
        <a
          href="https://flary-finance.gitbook.io/flary-finance/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#ffa957', textDecoration: 'underline' }}
        >
          Flary Finance GitBook
        </a>
      </>),
    },
    {title:'I have discovered that my wallet has been compromised/hacked. What steps should I take?',
      content: (
        <>
          If you suspect that your wallet associated with Flary Finance has been compromised, it’s crucial to act quickly to secure your assets. Follow these steps to protect yourself:
          <br />
          <br />
          <strong>1. Never Share Your Seed Phrase or Private Key</strong>
          <br />
          Under no circumstances should you share your Seed Phrase or Private Key with anyone. These are highly sensitive and must be kept secure at all times.
          <br />
          <br />
          <strong>2. Contact Flary Finance Support</strong>
          <br />
          Visit our official support page at <br />
          <a
            href="https://flary.finance/contact"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#ffa957', textDecoration: 'underline' }}
          >
            https://flary.finance/contact
          </a> <br />
          to report the issue and get guidance on the necessary steps to take.
          <br />
          <br />
          <strong>3. Important Reminder</strong>
          <br />
          While we can provide assistance in securing your <strong>$FLFI</strong> tokens in the event of wallet compromise or hacking, please note that{' '}
          <strong>we cannot recover lost funds</strong>. Ensuring the security of your wallet is your responsibility, and we urge you to take proactive measures to protect your assets.
          <br />
          <br />
          <strong>4. Stay Alert for Scammers</strong>
          <br />
          Flary Finance will <strong>never ask for your private details</strong>, such as your Seed Phrase or Private Key. Be vigilant against scams and always verify the authenticity of the support or individuals you are communicating with.
          <br />
          <br />
          Your security is our priority, and we’re here to assist you in safeguarding your assets.
        </>
      ),
    }
  ];
  return (
    <div className={style.FAQ}>
        
        <p className={style.description}>Got Questions? We've Got Answers!</p>
      <Acordion list={list} />
    </div>
  );
};
