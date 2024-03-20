import messageStorageJSON from "./MessageStorageABI.json"
import userRegJSON from "./UserRegistrationAndAuthenticationABI.json"

export const messageStorageAddressLH =
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
export const messageStorageAddressTN =
    "0x5B7731140eee5FD3038A7fd2B013F2e683470362"

export const userRegAddressLH = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
export const userRegAddressTN = "0xC65691ED04f7457aB3F6825D28BCC2d5ffcDFBf8"

export const messageStorageABI = messageStorageJSON.abi
export const userRegABI = userRegJSON.abi

//    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
