import { ethers } from "ethers"
import Web3Modal from "web3modal"
import {
    messageStorageAddressLH,
    messageStorageABI,
    userRegAddressLH,
    userRegABI,
} from "../Context/constants"

export const CheckIfWalletConnected = async () => {
    try {
        if (!window.ethereum) return console.log("Install MetaMask")

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        })
        const firstAccount = accounts[0]
        return firstAccount
    } catch (error) {
        console.log(error)
    }
}

export const connectWallet = async () => {
    try {
        if (!window.ethereum) return console.log("Install MetaMask")

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
        const firstAccount = accounts[0]
        return firstAccount
    } catch (error) {
        console.log(error)
    }
}

const fetchContract = (signerOrProvider, address, abi) =>
    new ethers.Contract(address, abi, signerOrProvider)

export const connectingWithContract1 = async () => {
    try {
        const web3modal = new Web3Modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = await provider.getSigner()
        const contract1 = fetchContract(signer, userRegAddressLH, userRegABI)

        return contract1
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const connectingWithContract2 = async () => {
    try {
        const web3modal = new Web3Modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = await provider.getSigner()
        const contract2 = fetchContract(
            signer,
            messageStorageAddressLH,
            messageStorageABI
        )

        return contract2
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const convertTime = (time) => {
    const newTime = new Date(time.toNumber())
    const realTime =
        newTime.getHours() +
        "/" +
        newTime.getMinutes() +
        "/" +
        newTime.getSeconds() +
        " Date: " +
        newTime.getDate() +
        "/" +
        (newTime.getMonth() + 1) +
        "/" +
        newTime.getFullYear()

    return realTime
}
