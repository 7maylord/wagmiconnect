import { http, createConfig, createStorage } from 'wagmi'
import { base, mainnet, sepolia, baseSepolia, lisk, liskSepolia } from 'wagmi/chains'
import { safe, walletConnect } from 'wagmi/connectors'
import walletlogo from "../assets/walletconnect.jpg"


const projectId = import.meta.env.VITE_APP_WALLETCONNECT_PROJECT_ID
const projectUrl = import.meta.env.VITE_APP_API_URL


export const config = createConfig({
  chains: [ base, mainnet, sepolia, baseSepolia, lisk, liskSepolia ],
  multiInjectedProviderDiscovery: true,
  storage: createStorage({ storage: window.localStorage }),
  connectors: [
    // injected(),
    walletConnect({
      projectId,
      metadata: {
        name: 'Wagmi Connect',
        description: 'Connect your wallet to interact with the blockchain',
        url: projectUrl,
        icons: [walletlogo],
      },
      showQrModal: true,
      relayUrl: 'wss://relay.walletconnect.org'
    }),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
    [lisk.id]: http(),
    [liskSepolia.id]: http(),
  },
})