const { ethers, getNamedAccounts } = require("hardhat")
const {
    USERNAME2,
    USER_EMAIL2,
    USER_PASSWORD_HASH2,
} = require("../helper-hardhat-config")

async function main() {
    console.log(
        `----------------------------------------------------------------------------------------------------`,
    )
    const { userOne } = await getNamedAccounts();

    const userContract = await ethers.getContract(
        "UserRegistrationAndAuthentication",
        userOne,
    )
    console.log(`Got user contract  at ${userContract.target}`)
    const transactionResponse = await userContract.registerUser(
        USERNAME2,
        USER_EMAIL2,
        USER_PASSWORD_HASH2,
    )
    await transactionResponse.wait()
    console.log(
        `User ${USERNAME2} registered with email ${USER_EMAIL2}`,
    )
    console.log("User2 created!")

    console.log("Fetching user info")
    const userInfo = await userContract.getMyUserInfo()
    console.log(`User2 info is:`, userInfo)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
