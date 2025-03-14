import { useState, useEffect } from "react";
import { Account } from "./components/Account";
import { WalletOptions } from "./components/WalletOptions";
import { useAccount } from "wagmi";

function ConnectWalletModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-sm text-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">Connect Wallet</h2>
        <WalletOptions />
        <button
          onClick={onClose}
          className="w-full mt-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isConnected } = useAccount(); // Detect wallet connection

  // Close modal automatically when wallet connects
  useEffect(() => {
    if (isConnected) {
      setIsModalOpen(false);
    }
  }, [isConnected]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center text-white">
        <h1 className="text-3xl font-bold mb-4">Wagmi Connect</h1>
        {isConnected ? (
          <Account /> // Show Account component when connected
        ) : (
          <>
            <p className="text-gray-400 mb-4">Please connect your wallet</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all duration-300 shadow-md w-full"
            >
              Connect Wallet
            </button>
          </>
        )}
      </div>
      {isModalOpen && <ConnectWalletModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default App;
