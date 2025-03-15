import * as React from "react";
import { useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <div className="flex flex-col space-y-3 max-h-80 overflow-y-auto pr-1">
      {connectors.map((connector) => {
        return (
          <button
            key={connector.uid}
            onClick={() => {
            console.log("Connecting to:", connector.name);  
            connect({ connector });
            }}
            className="flex items-center w-full p-4 bg-gray-800/70 text-white rounded-lg hover:bg-gray-700/80 transition-all duration-300 border border-gray-700/50 backdrop-filter backdrop-blur-sm relative overflow-hidden"
          >
            <div className="flex items-center w-full">
              <div className="p-2 rounded-lg mr-3 backdrop-filter backdrop-blur-sm">
                {connector.icon ? (
                  <img
                    src={connector.icon}
                    alt={connector.name}
                    className="w-6 h-6"
                  />
                ) : (
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">{connector.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <span className="text-lg font-medium">{connector.name}</span>
                {/* {connector.description && (
                  <p className="text-xs text-gray-400">{connector.description}</p>
                )} */}
              </div>
              
              <div className="bg-indigo-600/50 p-1.5 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}