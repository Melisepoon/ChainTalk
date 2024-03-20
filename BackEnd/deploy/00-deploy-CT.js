// how to deploy the chatApp contract
require("dotenv").config()

//import
const {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")
const { network, ethers } = require("hardhat")
const { verify } = require("../utils/verify")

//main function
module.exports = async ({ getNamedAccounts, deployments }) => {
    // get these variables from hre
    const { deploy, log } = deployments

    const { deployer } = await getNamedAccounts()
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    const chainId = network.config.chainId
    const arguments = []

    // get the IPFS hashes of soulbound tokens

    log("----------------------------------------------------")
    log("Deploying Soulbound Contract and waiting for confirmations...")
    const Soulbound = await deploy("Soulbound", {
        from: deployer,
        args: arguments,
        log: true,
        // We need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`Soulbound Contract deployed at ${Soulbound.address}`)
    log("Verifying...")

    log("----------------------------------------------------")
    log("Deploying MessageStorage and waiting for confirmations...")
    const MessageStorage = await deploy("MessageStorage", {
        from: deployer,
        args: arguments,
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`Message Storage Contract deployed at ${MessageStorage.address}`)
    log("Verifying...")

    log("----------------------------------------------------")
    log("Deploying User Contract and waiting for confirmations...")
    const UserContract = await deploy("UserRegistrationAndAuthentication", {
        from: deployer,
        args: [Soulbound.address],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log(`User Contract deployed at ${UserContract.address}`)
    log("Verifying...")

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        //verify
        await verify(MessageStorage.address, arguments)
        await verify(UserContract.address, arguments)
        await verify(Soulbound.address, arguments)
    }
}
module.exports.tags = ["all", "CT"]

// how to deploy the chatApp contract
// require("dotenv").config()

// // Import
// const { networkConfig, developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
// const { network, ethers } = require("hardhat")
// const { verify } = require("../utils/verify")

// // Main function
// module.exports = async ({ getNamedAccounts, deployments }) => {
//     // Get these variables from hre
//     const { deploy, log } = deployments

//     const { deployer } = await getNamedAccounts()
//     const waitBlockConfirmations = developmentChains.includes(network.name)
//         ? 1
//         : VERIFICATION_BLOCK_CONFIRMATIONS
//     const chainId = network.config.chainId
//     const arguments = []

//     log("----------------------------------------------------")
//     log("Deploying MessageStorage and waiting for confirmations...")
//     const MessageStorage = await deploy("MessageStorage", {
//         from: deployer,
//         args: arguments,
//         log: true,
//         // We need to wait if on a live network so we can verify properly
//         waitConfirmations: network.config.blockConfirmations || 1,
//     })
//     log(`Message Storage Contract deployed at ${MessageStorage.address}`)
//     log("Verifying...")

//     log("----------------------------------------------------")
//     log("Deploying User Contract and waiting for confirmations...")
//     const UserContract = await deploy("UserRegistrationAndAuthentication", {
//         from: deployer,
//         args: arguments,
//         log: true,
//         // We need to wait if on a live network so we can verify properly
//         waitConfirmations: network.config.blockConfirmations || 1,
//     })
//     log(`User Contract deployed at ${UserContract.address}`)
//     log("Verifying...")

//     log("----------------------------------------------------")
//     log("Deploying Soulbound Contract and waiting for confirmations...")
//     const Soulbound = await deploy("Soulbound", {
//         from: deployer,
//         args: arguments,
//         log: true,
//         // We need to wait if on a live network so we can verify properly
//         waitConfirmations: network.config.blockConfirmations || 1,
//     })
//     log(`Soulbound Contract deployed at ${Soulbound.address}`)
//     log("Verifying...")

//     if (
//         !developmentChains.includes(network.name) &&
//         process.env.ETHERSCAN_API_KEY
//     ) {
//         // Verify
//         await verify(MessageStorage.address, arguments)
//         await verify(UserContract.address, arguments)
//         await verify(Soulbound.address, arguments)
//     }
// }
// module.exports.tags = ["all", "CT"]
