import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useChainId,
  useSwitchChain,
} from "wagmi";

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

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      {ensAvatar && (
        <img
          alt="ENS Avatar"
          src={ensAvatar}
          className="w-12 h-12 rounded-full mx-auto mb-3"
        />
      )}
      <div className="mb-2 text-center">Chain ID: {chainId}</div>

      {address && (
        <>
          <div className="mb-4 text-center">
            <label htmlFor="chain-select" className="block mb-1 text-sm">
              Switch Chain:
            </label>
            <select
              id="chain-select"
              value={chainId}
              onChange={(e) => switchChain({ chainId: Number(e.target.value) })}
              className="w-full p-2 bg-black text-white border border-gray-700 rounded-md focus:ring focus:ring-indigo-500"
            >
              {chains.map((chain) => (
                <option key={chain.id} value={chain.id}>
                  {chain.name}
                </option>
              ))}
            </select>
          </div>
          <div className="text-center">
            {ensName
              ? `${ensName} (${shortenAddress(address)})`
              : shortenAddress(address)}
          </div>
        </>
      )}

      <button
        onClick={() => disconnect()}
        className="w-full mt-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
      >
        Disconnect
      </button>
    </div>
  );
}
