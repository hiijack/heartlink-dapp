import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { hardhat } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { Toaster } from 'sonner';
import App from './App';

const config = createConfig({
  chains: [hardhat],
  connectors: [injected()],
  transports: {
    [hardhat.id]: http(import.meta.env.VITE_RPC_URL), // RPC 地址
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-left"
          toastOptions={{
            classNames: {
              icon: '!text-red-400',
              title: '!text-red-400',
            },
          }}
        />
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
