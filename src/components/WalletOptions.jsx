import * as React from "react";
import { useConnect } from "wagmi";

// Fallback icons (custom mapping if needed)
const walletIcons = {
  MetaMask: "https://cryptologos.cc/logos/metamask-fox-logo.png",
  WalletConnect: "https://walletconnect.com/walletconnect-logo.svg",
  Safe: "https://safe.global/favicon.ico",
};

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <div className="flex flex-col space-y-3">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          className="flex items-center w-full p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
        >
          <img
            src={connector.icon || walletIcons[connector.name] || "/default-wallet.png"}
            alt={connector.name}
            className="w-8 h-8 mr-3"
          />
          <span className="text-lg font-medium">{connector.name}</span>
        </button>
      ))}
    </div>
  );
}
