import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer1 } from './components';
import { Contact, Giveaway, Home, HowToBuy } from './page';
import { useAccount } from 'wagmi';
import { useEffect, useMemo } from 'react';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  const { isConnected, address } = useAccount();


  useEffect(() => {
    // Parse the URL to get the ref value
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');

    if (ref) {
      // Save to localStorage
      localStorage.setItem('ref', ref);
    }
  }, []);

  useEffect(() => {
    const handleAuth = async () => {
      const referrerCode = new URLSearchParams(window.location.search).get('ref') ?? localStorage.getItem('ref');
      console.log(referrerCode);

      await fetch("https://back.flary.finance/api/user/registerUser", {
        method: "POST",
        body: JSON.stringify({ address, referrerCode })
      });

      localStorage.setItem('wagmi-connected', 'true')
    }
    const connectedStatus = localStorage.getItem('wagmi-connected')
    if (!connectedStatus && isConnected) {
      handleAuth()
    } else {
      localStorage.removeItem('wagmi-connected')
    }
  }, [isConnected])

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <div className="App">
      <div className="wrapper">

      <ConnectionProvider endpoint={"https://orbital-quick-general.solana-mainnet.quiknode.pro/025eaf7069a981637cdb8ec59488b781a7606cd8"}>
          <WalletProvider wallets={wallets} autoConnect >
            <WalletModalProvider>

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/how-to-buy" element={<HowToBuy />} />
                <Route path="/giveaway" element={<Giveaway />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>

            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>
      <Footer1 />
    </div>
  );
}

export default App;
