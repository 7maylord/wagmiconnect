import { http, createConfig, createStorage } from 'wagmi'
import { base, mainnet, sepolia, baseSepolia, lisk, liskSepolia } from 'wagmi/chains'
//import { walletConnect } from 'wagmi/connectors'


export const config = createConfig({
  chains: [ base, mainnet, sepolia, baseSepolia, lisk, liskSepolia ],
  connectors: [ 
    //walletConnect()
  ],
  multiInjectedProviderDiscovery: true,
  storage: createStorage({ storage: window.localStorage }),
  transports: {
    [mainnet.id]: http({ url: import.meta.env.VITE_APP_ETH_RPC }),
    [base.id]: http({ url: import.meta.env.VITE_APP_BASE_RPC }),
    [sepolia.id]: http({ url: import.meta.env.VITE_APP_ETH_SEP_RPC }),
    [baseSepolia.id]: http({ url: import.meta.env.VITE_APP_BASE_SEP_RPC }),
    [lisk.id]: http({ url: import.meta.env.VITE_APP_LISK_RPC }),
    [liskSepolia.id]: http({ url: import.meta.env.VITE_APP_LISK_SEP_RPC }),
  },
})