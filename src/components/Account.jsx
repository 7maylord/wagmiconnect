import { useAccount, useDisconnect, useEnsAvatar, useEnsName, useChainId, useSwitchChain } from "wagmi";
import { useState } from "react";

const shortenAddress = (address) => {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
};

// Function to get explorer URL for a chain and address
const getExplorerUrl = (chainId, address) => {
  const explorers = {
    1: `https://etherscan.io/address/${address}`, // Ethereum Mainnet
    11155111: `https://etherscan.io/address/${address}`, // Sepolia Testnet
    8453: `https://basescan.org/address/${address}`, // Base
    84532: `https://sepolia.basescan.org/address/${address}`, // Base Sepolia
    1135: `hhttps://blockscout.lisk.com/address/${address}`, // Lisk
    4202: `https://sepolia-blockscout.lisk.com/address/${address}`, // Lisk Sepolia
    // Add more chains as needed
  };
  
  return explorers[chainId] || `https://etherscan.io/address/${address}`;
};

export function Account() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName || "" });
  const { chains, switchChain } = useSwitchChain();
  const [isLoading, setIsLoading] = useState(false);

  const handleSwitchChain = async (newChainId) => {
    setIsLoading(true);
    try {
      await switchChain({ chainId: Number(newChainId) });
    } catch (error) {
      console.error("Failed to switch chain:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const explorerUrl = address ? getExplorerUrl(chainId, address) : '';

  return (
    <div className="p-5 bg-gray-800 text-white rounded-xl shadow-lg border border-gray-700">
      <div className="flex items-center justify-center mb-4">
        {ensAvatar ? (
          <img
            alt="ENS Avatar"
            src={ensAvatar}
            className="w-14 h-14 rounded-full border-2 border-indigo-500"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-lg font-bold">{address ? address.slice(2, 4).toUpperCase() : ""}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center mb-3">
        <span className="px-3 py-1 bg-indigo-900 rounded-full text-xs font-medium">
          Chain: {chains.find(c => c.id === chainId)?.name || chainId}
        </span>
      </div>

      {address && (
        <>
          <div className="mb-4">
            <label htmlFor="chain-select" className="block mb-2 text-sm font-medium text-gray-300">
              Network
            </label>
            <div className="relative">
              <select
                id="chain-select"
                value={chainId}
                onChange={(e) => handleSwitchChain(e.target.value)}
                disabled={isLoading}
                className="w-full p-2.5 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
              >
                {chains.map((chain) => (
                  <option key={chain.id} value={chain.id}>
                    {chain.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-gray-700 rounded-lg text-center mb-4">
            <div className="text-sm text-gray-400 mb-1">Connected Address</div>
            <div className="font-mono font-medium">
              {ensName ? (
                <div>
                  <div className="text-indigo-400">{ensName}</div>
                  <div className="text-sm text-gray-400">{shortenAddress(address)}</div>
                </div>
              ) : (
                shortenAddress(address)
              )}
            </div>
            
            <a 
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View on Explorer
            </a>
          </div>
        </>
      )}

      <button
        onClick={() => disconnect()}
        disabled={isLoading}
        className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 border border-gray-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 2a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span>Disconnect Wallet</span>
      </button>
    </div>
  );
}