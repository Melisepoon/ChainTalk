const { expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config.js")
/**
 * Test cases to add:
 *
 * Sending a message and retrieving from receiver
 *
 * Marking a message as read
 *
 * Deleting a message
 *
 * Sending and receiving multiple messages
 *
 * Making testing more dynamic and less hard coded
 */

/**
 * Skips the testing if it is on a testnet, only tests on localhost
 * */

/**
 * Decribe function wraps the entire testing
 * @notice creates 2 accounts to be used: one deployer, and one user
 * This is to test different users sending messages to each other in the ststem
 * Accounts are provided by hardhat itself and are configured in hardhat.config.js
 */
!developmentChains.includes(network.name)
    ? describe.skip
    : describe("MessageStorage Test", function () {
          let Message_Storage_d
          let Message_Storage_u_1
          let deployer
          let userOne
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              userOne = (await getNamedAccounts()).userOne
              await deployments.fixture("all")
              Message_Storage_d = await ethers.getContract(
                  "MessageStorage",
                  deployer,
              )
              Message_Storage_u_1 = await ethers.getContract(
                  "MessageStorage",
                  userOne,
              )
          })
          /**
           * @title tests whether functions are working correctly
           * @custom tests 4 functionalities
           */
          // user 1 sending message to user 2
          // check that message has been sent and that content of message is correct
          it("Should send and retrieve message", async function () {
              const content = "Hello, user2!"
              await Message_Storage_d.sendMessage(userOne, content)
              const user1Messages = await Message_Storage_d.getMyMessages()
              expect(user1Messages.length).to.equal(1)
              expect(user1Messages[0].content).to.equal(content)
              const user2Messages = await Message_Storage_u_1.getMyMessages()
              expect(user2Messages.length).to.equal(1)
              expect(user2Messages[0].sender).to.equal(deployer)
          })
          // ensure that message is marked as read
          it("Should mark a message as read", async function () {
              const content = "Hello, user2!"
              await Message_Storage_d.sendMessage(userOne, content)
              const user2Messages = await Message_Storage_u_1.getMyMessages()
              expect(user2Messages[0].isRead).to.equal(false)

              // mark message as read
              // maybe can change functionality as that when user2 get their message
              // automatically marked as read
              await Message_Storage_u_1.markAsRead(0)

              const updatedUser2Messages =
                  await Message_Storage_u_1.getMyMessages()
              expect(updatedUser2Messages[0].isRead).to.equal(true)
          })
          // ensure that messages are deleted are marked as deleted
          // maybe can change logic to physically delete the msg in solidity code
          it("Should delete a message", async function () {
              const content = "Hello, user2!"
              await Message_Storage_d.sendMessage(userOne, content)
              const user1MessagesBeforeDelete =
                  await Message_Storage_d.getMyMessages()
              expect(user1MessagesBeforeDelete[0].isDeleted).to.equal(false)

              await Message_Storage_d.deleteMessage(0)

              const user1MessagesAfterDelete =
                  await Message_Storage_d.getMyMessages()
              expect(user1MessagesAfterDelete[0].isDeleted).to.equal(true)
          })
          it("Should send and retrieve multiple messages", async function () {
              const messagesToSend = ["Message 1", "Message 2", "Message 3"]

              // send multiple messages from user 1 to user 2
              for (const content of messagesToSend) {
                  await Message_Storage_d.sendMessage(userOne, content)
              }
              const user2Messages = await Message_Storage_u_1.getMyMessages()

              expect(user2Messages.length).to.equal(messagesToSend.length)
              for (let i = 0; i < messagesToSend.length; i++) {
                  expect(user2Messages[i].content).to.equal(messagesToSend[i])
                  expect(user2Messages[i].sender).to.equal(deployer)
              }
          })
      })