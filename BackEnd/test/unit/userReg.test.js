const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const {
    developmentChains,
    USERNAME1,
    USER_EMAIL1,
    USER_PASSWORD_HASH1,
    USERNAME2,
    USER_EMAIL2,
    USER_PASSWORD_HASH2,
} = require("../../helper-hardhat-config.js")

/**
 * Test cases to add:
 *
 * Registration of user + retrieve info
 *
 * Adding of friend
 *
 * Authenticating a user
 *
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
developmentChains.includes(network.name)
    ? describe.skip
    : describe("UserRegistrationAndAuthentication Contract", function () {
          let UserRegistrationAndAuthentication
          let userRegistrationAndAuthentication
          let owner
          let user
          let friend

          beforeEach(async () => {
              ;[owner, user, friend] = await ethers.getSigners()

              UserRegistrationAndAuthentication =
                  await ethers.getContractFactory(
                      "UserRegistrationAndAuthentication",
                  )
              userRegistrationAndAuthentication =
                  await UserRegistrationAndAuthentication.deploy()
              await userRegistrationAndAuthentication.deployed()

              // Register friend as a user
              const friendName = USERNAME2
              const friendEmail = USER_EMAIL2
              const friendPasswordHash = USER_PASSWORD_HASH2
              await userRegistrationAndAuthentication
                  .connect(friend)
                  .registerUser(friendName, friendEmail, friendPasswordHash)
          })

          it("Should register a new user", async function () {
              const name = USERNAME1
              const email = USER_EMAIL1
              const passwordHash = USER_PASSWORD_HASH1

              await expect(
                  userRegistrationAndAuthentication
                      .connect(user)
                      .registerUser(name, email, passwordHash),
              )
                  .to.emit(userRegistrationAndAuthentication, "UserRegistered")
                  .withArgs(user.address, name, email)

              const isRegistered =
                  await userRegistrationAndAuthentication.checkUserExists(
                      user.address,
                  )
              expect(isRegistered).to.be.true
          })

          it("Should add a friend to the user's friend list", async function () {
              await userRegistrationAndAuthentication
                  .connect(user)
                  .addFriend(friend.address)

              const friendList =
                  await userRegistrationAndAuthentication.getMyFriendList()
              expect(friendList).to.include(friend.address)
          })

          it("Should retrieve user information", async function () {
              const name = USERNAME1
              const email = USER_EMAIL1
              const passwordHash = USER_PASSWORD_HASH1

              await userRegistrationAndAuthentication
                  .connect(user)
                  .registerUser(name, email, passwordHash)

              const userInfo =
                  await userRegistrationAndAuthentication.getMyUserInfo()
              expect(userInfo[0]).to.equal(name)
              expect(userInfo[1]).to.equal(email)
              expect(userInfo[2]).to.be.an("array")
          })

          it("Should authenticate a registered user based on Soulbound token existence", async function () {
              const name = USERNAME1
              const email = USER_EMAIL1
              const passwordHash = USER_PASSWORD_HASH1

              await userRegistrationAndAuthentication
                  .connect(user)
                  .registerUser(name, email, passwordHash)

              // Ensure authentication fails before Soulbound token is minted
              let isAuthenticated = await userRegistrationAndAuthentication
                  .connect(user)
                  .authenticate()
              expect(isAuthenticated).to.be.false

              // Mint a Soulbound token for the user
              await userRegistrationAndAuthentication
                  .connect(user)
                  .deployIdentityContract()

              // Authenticate the user after Soulbound token is minted
              isAuthenticated = await userRegistrationAndAuthentication
                  .connect(user)
                  .authenticate()
              expect(isAuthenticated).to.be.true
          })
      })
