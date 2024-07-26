import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-verify';
import '@nomicfoundation/hardhat-toolbox';
import dotenv from 'dotenv';
dotenv.config();

import './scripts/deployTasks';

interface Environment {
  ETHEREUM_RPC_URL: string;
  SEPOLIA_RPC_URL: string;
  PRIVATE_KEY: string;
  ETHERSCAN_API_KEY: string;
}

const env: Environment = {
  ETHEREUM_RPC_URL: process.env.ETHEREUM_RPC_URL ?? '',
  SEPOLIA_RPC_URL: process.env.SEPOLIA_RPC_URL ?? '',
  PRIVATE_KEY: process.env.PRIVATE_KEY ?? '',
  ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY ?? '',
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.20',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      // forking: {
      //   url: env.ETHEREUM_RPC_URL,
      //   blockNumber: 20127471,
      // },
    },
    ethereum: {
      chainId: 1,
      url: env.ETHEREUM_RPC_URL,
      accounts: env.PRIVATE_KEY.length > 0 ? [env.PRIVATE_KEY] : [],
    },
    sepolia: {
      chainId: 11155111,
      url: env.SEPOLIA_RPC_URL,
      accounts: env.PRIVATE_KEY.length > 0 ? [env.PRIVATE_KEY] : [],
    },
  },
  sourcify: {
    enabled: false,
  },
  etherscan: {
    apiKey: env.ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 10000000,
  },
};

export default config;
