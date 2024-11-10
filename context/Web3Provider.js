import { WagmiProvider, createConfig, http } from "wagmi";
import '@rainbow-me/rainbowkit/styles.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

import {opBNB, mainnet, mode, modeTestnet,sepolia, bsc, bscTestnet, arbitrum, arbitrumGoerli, arbitrumSepolia, base, baseSepolia, optimism, optimismSepolia, opBNBTestnet } from "wagmi/chains";
import { okxWallet } from '@rainbow-me/rainbowkit/wallets';


export const Web3Agent = {
  id: 11001,
  name: 'Web3 Agent',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://web3agent.alt.technology/'] },
  },
  blockExplorers: {
    default: {
      name: 'BscScan',
      url: 'https://web3agent.alt.technology/',
      apiUrl: 'https://web3agent.alt.technology/api',
    },
  },
  
}

export const Educhain = {
  id: 656476,
  name: 'Educhain',
  nativeCurrency: {
    decimals: 18,
    name: 'EDU',
    symbol: 'EDU',
  },
  rpcUrls: {
    default: { http: ['https://rpc.open-campus-codex.gelato.digital/'] },
  },
  blockExplorers: {
    default: {
      name: 'Educhain',
      url: 'https://opencampus-codex.blockscout.com/',
      apiUrl: 'https://web3agent.alt.technology/api',
    },
  },
  
}
export const config = getDefaultConfig({
  appName: 'Web3 Agent',
  projectId: 'YOUR_PROJECT_ID',
  chains: [Educhain, sepolia],
  ssr: true,
});

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {



  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#7064E9',
            accentColorForeground: 'white',
            borderRadius: 'medium',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
        >
          <ToastContainer />
          {children}
        </RainbowKitProvider>
      </QueryClientProvider >
    </WagmiProvider >
  );
};
