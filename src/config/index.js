import { http, createConfig, createStorage } from 'wagmi'
import { base, mainnet, sepolia, baseSepolia, lisk, liskSepolia } from 'wagmi/chains'
import { safe, walletConnect } from 'wagmi/connectors'

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID

export const config = createConfig({
  chains: [ base, mainnet, sepolia, baseSepolia, lisk, liskSepolia ],
  multiInjectedProviderDiscovery: true,
  storage: createStorage({ storage: window.localStorage }),
  connectors: [
    // injected(),
    walletConnect({ projectId }),
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