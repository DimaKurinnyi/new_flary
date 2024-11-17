import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import React, { ReactNode } from 'react';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  walletConnectWallet,
  coinbaseWallet
} from '@rainbow-me/rainbowkit/wallets';
// import {configureChain,createConfig, WagmiConfig} from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { bsc, mainnet } from 'wagmi/chains';

// // import {publicProvider} from 'wagmi/pro'
const projectId = '95b12f1450eb1b99e25683fb739ccb3e';
const connectors = connectorsForWallets([
  {
    groupName: 'EVN',
    wallets: [rainbowWallet, walletConnectWallet, rabbyWallet, metaMaskWallet,coinbaseWallet]
  }
], {
  appName: 'RainbowKit demo',
  projectId: projectId,
})


export const config = createConfig({
  connectors,

  chains: [mainnet, bsc],

  transports: {
    [mainnet.id]: http("https://white-necessary-owl.quiknode.pro/c26e18f7c44ccb597880ed06ef5cfb487905b6bb"),
    [bsc.id]: http("https://solitary-intensive-thunder.bsc.quiknode.pro/108841f2c56aaf76b159d6c107d3ad390711260e"),
  },
});
const queryClient = new QueryClient();

export interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          locale="en-US"
          theme={darkTheme({
            overlayBlur: 'small',
            accentColor: 'linear-gradient(90deg, #ff6e48, #fe9452)',
            accentColorForeground: 'white',
            borderRadius: 'medium',
          })}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
