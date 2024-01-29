const { ethers, getNamedAccounts } = require("hardhat")

const { CONTENT } = require("../helper-hardhat-config")

async function main() {
    console.log(
        `----------------------------------------------------------------------------------------------------`,
    )
    const { deployer, userOne } = await getNamedAccounts()
    const messageStorage = await ethers.getContract("MessageStorage", deployer)
    console.log(`Got message contract  at ${messageStorage.target}`)

    const transactionResponse = await messageStorage.sendMessage(
        userOne,
        CONTENT,
    )
    await transactionResponse.wait()
    console.log("message sent")

    // to retrieve messages
    const messages = await messageStorage.getMyMessages()
    console.log("My Messages:", messages)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
