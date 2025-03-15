# Wagmi Connect dApp

## Overview
Wagmi Connect is a decentralized application (dApp) that allows users to securely connect their cryptocurrency wallets and interact with blockchain networks. The dApp supports multiple blockchain networks and enables users to switch networks, view their account details, and disconnect their wallets.

## Features
- Connect and disconnect wallets using Wagmi.
- Supports multiple blockchain networks (Ethereum, Base, Sepolia, Lisk, etc.).
- Displays ENS name and avatar if available.
- Network switching functionality.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **State Management:** wagmi, @tanstack/react-query
- **Blockchain Interaction:** Wagmi

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/7maylord/wagmiconnect.git
   cd wagmiconnect
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```
3. Create a `.env` file and add your RPC URLs:
   ```env
   VITE_APP_ETH_RPC=<Ethereum RPC URL>
   VITE_APP_BASE_RPC=<Base RPC URL>
   VITE_APP_ETH_SEP_RPC=<Sepolia RPC URL>
   VITE_APP_BASE_SEP_RPC=<Base Sepolia RPC URL>
   VITE_APP_LISK_RPC=<Lisk RPC URL>
   VITE_APP_LISK_SEP_RPC=<Lisk Sepolia RPC URL>
   ```

## Running the Project

To start the development server:
```sh
yarn run dev
```


## Usage
1. Open the application in your browser.
2. Click the **Connect Wallet** button.
3. Select a wallet provider from the options.
4. Once connected, view account details and switch networks if needed.
5. To disconnect, click the **Disconnect Wallet** button.

## Contributions
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.

---
## Author
Developed by **[MayLord](https://github.com/7maylord)**.

