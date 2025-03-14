import { Account } from './components/Account'
import { WalletOptions } from './components/WalletOptions'
import { useAccount } from 'wagmi'
import './App.css'

function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <WalletOptions />
}

function App() {

  return (
    <>
     <ConnectWallet />
    </>
  )
}

export default App
