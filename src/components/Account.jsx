import { useAccount, useDisconnect, useEnsAvatar, useEnsName, useChainId, useSwitchChain } from "wagmi";
import { useState } from "react";

const shortenAddress = (address) => {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
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
  
  // Get current chain object
  const currentChain = chains.find(c => c.id === chainId);
  
  // Get explorer URL using chain's blockExplorers property
  const getExplorerUrl = () => {
    if (!address || !currentChain?.blockExplorers?.default?.url) return '#';
    return `${currentChain.blockExplorers.default.url}/address/${address}`;
  };

  return (
    <div className="p-5 bg-white text-gray-800 rounded-xl shadow-md border border-gray-200">
      <div className="flex items-center justify-center mb-4">
        {ensAvatar ? (
          <img
            alt="ENS Avatar"
            src={ensAvatar}
            className="w-14 h-14 rounded-full border-2 border-blue-500"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-lg font-bold text-white">{address ? address.slice(2, 4).toUpperCase() : ""}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center mb-3">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          Chain: {currentChain?.name || chainId}
        </span>
      </div>

      {address && (
        <>
          <div className="mb-4">
            <label htmlFor="chain-select" className="block mb-2 text-sm font-medium text-gray-600">
              Network
            </label>
            <div className="relative">
              <select
                id="chain-select"
                value={chainId}
                onChange={(e) => handleSwitchChain(e.target.value)}
                disabled={isLoading}
                className="w-full p-2.5 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                {chains.map((chain) => (
                  <option key={chain.id} value={chain.id}>
                    {chain.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg text-center mb-4">
            <div className="text-sm text-gray-500 mb-1">Connected Address</div>
            <div className="font-mono font-medium">
              {ensName ? (
                <div>
                  <div className="text-blue-600">{ensName}</div>
                  <div className="text-sm text-gray-400">{shortenAddress(address)}</div>
                </div>
              ) : (
                shortenAddress(address)
              )}
            </div>
            
            {currentChain?.blockExplorers?.default && (
              <a 
                href={getExplorerUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center text-xs text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View on {currentChain.blockExplorers.default.name || 'Explorer'}
              </a>
            )}
          </div>
        </>
      )}

      <button
        onClick={() => disconnect()}
        disabled={isLoading}
        className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 border border-gray-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 2a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span>Disconnect Wallet</span>
      </button>
    </div>
  );
}