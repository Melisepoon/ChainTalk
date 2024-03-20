const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
    console.log(
        `----------------------------------------------------------------------------------------------------`,
    )
    const { deployer, userOne } = await getNamedAccounts();
    const userContract = await ethers.getContract(
        "UserRegistrationAndAuthentication",
        deployer,
    )
    // const userContract = await ethers.getContract(
    //     "UserRegistrationAndAuthentication",
    //     userOne,
    // )

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
