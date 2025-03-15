import { useState, useEffect } from "react";
import { Account } from "./components/Account";
import { WalletOptions } from "./components/WalletOptions";
import { useAccount } from "wagmi";

function ConnectWalletModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 p-4 z-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm text-gray-800 border border-gray-200 animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Connect Wallet</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <WalletOptions />
        
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500 mb-2">
            By connecting your wallet, you agree to our Terms of Service and Privacy Policy
          </p>
          <a 
            href="https://ethereum.org/en/wallets/find-wallet/#main-content" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-800 transition-colors mt-2 inline-block"
          >
            Need a wallet? Find one here →
          </a>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isConnected } = useAccount();

  // Close modal automatically when wallet connects
  useEffect(() => {
    if (isConnected) {
      setIsModalOpen(false);
    }
  }, [isConnected]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center text-gray-800 border border-gray-200">
        <div className="mb-6">
          <div className="inline-block p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Wagmi Connect</h1>
          <p className="text-gray-500 mt-2">Securely connect to decentralized applications</p>
        </div>
        
        {isConnected ? (
          <Account />
        ) : (
          <div className="space-y-6">
            <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
              <p className="text-gray-600 mb-5">Connect your wallet to access blockchain features</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md shadow-blue-200 font-medium flex items-center justify-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
                </svg>
                <span>Connect Wallet</span>
              </button>
            </div>
            
            <div className="text-xs text-gray-400">
              Powered by wagmi & Maylord
            </div>
          </div>
        )}
      </div>
      
      {isModalOpen && <ConnectWalletModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default App;