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
    const { deployer } = await getNamedAccounts();

    const userContract = await ethers.getContract(
        "UserRegistrationAndAuthentication",
        deployer,
    )
    console.log(`Got user contract  at ${userContract.target}`)
    const transactionResponse = await userContract.registerUser(
        USERNAME1,
        USER_EMAIL1,
        USER_PASSWORD_HASH1,
    )
    await transactionResponse.wait()
    console.log(
        `User ${USERNAME1} registered with email ${USER_EMAIL1}`,
    )
    console.log("User1 created!")

    console.log("Fetching user info")
    const userInfo = await userContract.getMyUserInfo()
    console.log(`User1 info is:`, userInfo)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
