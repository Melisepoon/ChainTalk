const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const {
    developmentChains,
    USERNAME1,
    USER_EMAIL1,
    USER_PASSWORD_HASH1,
} = require("../../helper-hardhat-config.js")

/**
 * NOT OK
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
    : describe("UserRegistrationAndAuthentication", function () {
        //   let User_d
        //   let deployer
        let UserRegistrationAndAuthentication;
        let userRegistration;
          beforeEach(async () => {
            //   deployer = (await getNamedAccounts()).deployer
            //   userOne = (await getNamedAccounts()).userOne
            //   await deployments.fixture("all")
            //   User_d = await ethers.getContract(
            //       "UserRegistrationAndAuthentication",
            //       deployer,
            //   )
              UserRegistrationAndAuthentication = await ethers.getContractFactory(
                "UserRegistrationAndAuthentication"
              );
              userRegistration = await UserRegistrationAndAuthentication.deploy();
              await userRegistration.deployed();
          })
          /**
           * @title tests whether functions are working correctly
           * @custom tests 4 functionalities
           */
          // user 1 sending message to user 2
          // check that message has been sent and that content of message is correct
          it("Should register a user and retrieve info", async function () {
              const userName = USERNAME1
              const userEmail = USER_EMAIL1
              const userPasswordHash = USER_PASSWORD_HASH1

              await userRegistration.registerUser(userName, userEmail, userPasswordHash)

              const userInfo = await userRegistration.getMyUserInfo()
              expect(userInfo[0]).to.equal(userName)
              expect(userInfo[1]).to.equal(userEmail)
          })
      })
