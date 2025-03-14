import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useChainId,
  useSwitchChain,
} from "wagmi";

export function Account() {
  const { address } = useAccount();
  const chainId  = useChainId();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName || "" });
  const { chains, switchChain } = useSwitchChain()

  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      <div>ChainId: {chainId}</div>
      {address && (
        <>        
        
      <div>
            <label htmlFor="chain-select">Switch Chain: </label>
            <select
              id="chain-select"
              value={chainId}
              onChange={(e) => switchChain({ chainId: Number(e.target.value) })}
            >
              {chains.map((chain) => (
                <option key={chain.id} value={chain.id}>
                  {chain.name}
                </option>
              ))}
            </select>
          </div>
        <div>
          {ensName ? `${ensName} (${address})` : address}
        </div>
        </>
      )}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
