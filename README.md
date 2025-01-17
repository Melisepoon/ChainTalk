# ChainTalk -  A Decentralised Messaging Application
_This project was completed as part of the requirements for Final Year Project, in partial fulfillment of the Computer Science degree program at Nanyang Technological University (NTU)._ <br>

****

### Description of Project:
- Ethereum-based innovative communication application built on the blockchain, encompassing both front-end and back-end components.
- Developed and deployed unique smart contracts using Solidity and InterPlanetary File System (IPFS).
- ERC-735 standard to form an identity management system.
- Soulbound tokens for tamper-proof user identities.

## The project video submission of higher quality can be found below:
https://youtu.be/db6JeYC1XHY

## CLONING THE REPOSITORY AND INSTALLING PACKAGES

```
git clone https://github.com/Melisepoon/ChainTalk.git
cd BackEnd
yarn
cd ..
cd Client
yarn
```


## ADDING HARHDAT WALLETS TO METAMASK

**Finding Private Keys of Hardhat Wallets**

1. Run `yarn hardhat node`
2. Copy one of the private keys. The first account is the owner by default. 


**Add Account**

1. Press the button `+ Add account or hardware wallet`


**Import Account**

1. Press the `Import account` button


**Paste Private Key**
1. Paste the private key copied earlier
2. Click `Import`


## DEPLOYING THE CONTRACT & FRONTEND

1. Open one terminal for backend
```
cd BackEnd_Contract
yarn hardhat node
```
2. Open second terminal for front-end
```
cd Client 
yarn dev
```

**To view ChainTalk Website**
1. Open a browser with the metamask that has the hardhat wallet accounts 
2. Navigate to `http://localhost:3000`

**To End Program**
On all running terminals, press `ctr+c` to end. 


## HARDHAT SCRIPTS
To run the scripts that is used to test the functions of the contract, run the following:
```
cd BackEnd
yarn hardhat run scripts/register-user1.js --network localhost
yarn hardhat run scripts/register-user2.js --network localhost
yarn hardhat run scripts/add-friend.js --network localhost
yarn hardhat run scripts/send-message.js --network localhost
yarn hardhat run scripts/get-user-info.js --network localhost
yarn hardhat run scripts/upload-claims.js --network localhost

```

## HARDHAT TEST SCRIPTS
To run the test scripts that is used to test the contract, run the following:
```
cd BackEnd
yarn hardhat test test/unit/msgStorage.test.js
yarn hardhat test test/unit/soulbound.test.js
yarn hardhat test test/unit/userReg.test.js
```

## DEPLOYING THE CONTRACT & FRONTEND TO SEPOLIA TESTNET

1. Open one terminal for backend
```
cd BackEnd_Contract
yarn hardhat deploy --network sepolia
```
2. Open second terminal for front-end
```
cd Client 
yarn dev
```
3. Replace contract addresses in Client/Context/constants.js with address of deployed testnet contract.<br />
```
export const messageStorageAddressTN =
    "0x5B7731140eee5FD3038A7fd2B013F2e683470362"
```
```
export const userRegAddressTN = 
    "0xC65691ED04f7457aB3F6825D28BCC2d5ffcDFBf8"
```

### References:

https://github.com/smartcontractkit/full-blockchain-solidity-course-js <br>
https://www.youtube.com/watch?v=yle9MMqY7yY&t=10046s <br>

