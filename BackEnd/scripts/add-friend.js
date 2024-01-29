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

    console.log(`Got user contract  at ${userContract.target}`)
    const transactionResponse = await userContract.addFriend(userOne);
    await transactionResponse.wait()
    console.log(`Friend with address ${userOne} added to user at address ${deployer}`);

    console.log("Fetching user info")
    const userInfo = await userContract.getMyUserInfo()
    console.log(`User1 info is:`, userInfo)

    console.log("Fetching friend list")
    const userFriendList = await userContract.getMyFriendList()
    console.log(`User1 friend list:`, userFriendList)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
