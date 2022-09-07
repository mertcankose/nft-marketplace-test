// require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: __dirname + "/.env.local" });

const walletPrivateKey = process.env.WALLET_PRIVATE_KEY.toString().trim() || "01234567890123456789";
const infuraProjectId = process.env.INFURA_PROJECT_ID.toString().trim() || "";

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${infuraProjectId}`,
      accounts: [walletPrivateKey],
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${infuraProjectId}`,
      accounts: [walletPrivateKey],
    },
    testnetbsc: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [walletPrivateKey],
    },
    mainnetbsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [walletPrivateKey],
    },
  },
  solidity: "0.8.9",
};
