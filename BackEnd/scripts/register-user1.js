const { ethers, getNamedAccounts } = require("hardhat")
const {
    USERNAME1,
    USER_EMAIL1,
    USER_PASSWORD_HASH1,
} = require("../helper-hardhat-config")

async function main() {
    console.log(
        `----------------------------------------------------------------------------------------------------`,
    )
    const { deployer } = await getNamedAccounts()

    const userContract = await ethers.getContract(
        "UserRegistrationAndAuthentication",
        deployer,
    )
    console.log(`Got user contract  at ${userContract.target}`)

    console.log(`Deploying Identity Contract...`)
    const deployIdentityTx = await userContract.deployIdentityContract()
    await deployIdentityTx.wait()
    console.log(
        `Identity Contract deployed successfully at address: ${deployIdentityTx.hash}`,
    )
    
    const transactionResponse = await userContract.registerUser(
        USERNAME1,
        USER_EMAIL1,
        USER_PASSWORD_HASH1,
    )

    await transactionResponse.wait()
    console.log(`User ${USERNAME1} registered with email ${USER_EMAIL1}`)
    console.log("User1 created!")

    console.log("Fetching user info")
    const userInfo = await userContract.getMyUserInfo()
    console.log(`User1 info is:`, userInfo)

    // Fetching Soulbound token details
    console.log("Fetching Soulbound token details")
    const soulboundTokenId = await userContract.getSoulboundTokenId(deployer)
    console.log("Soulbound token ID:", soulboundTokenId.toString())
    // console.log("Soulbound token:", tokenId)

    const soulboundTokenURI = await userContract.getSoulboundTokenURI(deployer)
    console.log("Soulbound token URI:", soulboundTokenURI.toString())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
