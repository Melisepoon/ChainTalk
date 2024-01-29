# ChainTalk

Blockchain Project to build a Messaging Application


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


**Finally**
1. Open a browser withe the metamask that has the hardhat wallet accounts 
2. Navigate to `http://localhost:3000`

**To End**
On all running terminals, press `ctr+c` to end. 


## HARDHAT TEST SCRIPTS
To run the test scripts that is used to test the contract, run the following:
```
cd BackEnd_Contract
yarn hardhat test
```
