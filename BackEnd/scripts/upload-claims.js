const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
    console.log(
        `----------------------------------------------------------------------------------------------------`,
    )
    const { deployer, userOne } = await getNamedAccounts()
    const userContract = await ethers.getContract(
        "UserRegistrationAndAuthentication",
        deployer,
    )

    console.log("Fetching user info")
    const userInfo = await userContract.getMyUserInfo()
    console.log(`User1 info is:`, userInfo)

    console.log(`Got user contract  at ${userContract.target}`)
    const transactionResponse = await userContract.uploadClaims(userOne)
    await transactionResponse.wait()
    console.log("Claims uploaded successfully")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
