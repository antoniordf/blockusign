import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, polygonMumbai, arbitrum } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia, polygonMumbai, arbitrum],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'Create Wagmi' }),
    walletConnect({ projectId: 'adebdd5d7d9bf8bfb249e600dcb87f10' }),
  ],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygonMumbai.id]: http(),
    [arbitrum.id]: http()
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
