const networkConfig = {
  31337: {
    name: "localhost",
  },
  // Price Feed Address, values can be obtained at https://docs.chain.link/data-feeds/price-feeds/addresses
  11155111: {
    name: "sepolia",
    ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  },
};

const developmentChains = ["hardhat", "localhost"];
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const USERNAME1 = "User1"
const USER_EMAIL1 = "user1@gmail.com"
const USER_PASSWORD_HASH1 = "0x3a2f83b7b29e34942a4a3211bcb3e8e146c4f779193fc4f3246c41fcf5c221b8"
const USERNAME2 = "User2"
const USER_EMAIL2 = "user2@gmail.com"
const USER_PASSWORD_HASH2 = "0x3a2f83b7b29e34942a4a3211bcb3e8e146c4f779193fc4f3246c41fcf5c221b8"
const CONTENT = "hi how are you?"


module.exports = {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
  USERNAME1,
  USER_EMAIL1,
  USER_PASSWORD_HASH1,
  USERNAME2,
  USER_EMAIL2,
  USER_PASSWORD_HASH2,
  CONTENT,
};
