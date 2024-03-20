// create account, fetch account etc
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

//internal import
import {
    CheckIfWalletConnected,
    connectWallet,
    connectingWithContract1,
    connectingWithContract2,
} from "../Utils/apiFeature"

export const ChainTalkContext = React.createContext()

export const ChainTalkProvider = ({ children }) => {
    //USESTATE
    const [account, setAccount] = useState("")
    const [userName, setUsername] = useState("")
    const [email, setUserEmail] = useState("")
    const [friendLists, setFriendLists] = useState("")
    const [friendMsg, setFriendMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const [userList, setUserList] = useState([])
    const [error, setError] = useState("")
    const [userTokenID, setTokenID] = useState("")
    const [userTokenURI, setTokenURI] = useState("")

    // Chat USER DATA (to display who i am chatting with currently)
    const [currentUserName, setCurrentUsername] = useState("")
    const [currentUserAddress, setCurrentUserAddress] = useState("")

    // when someone creates new account, redirect to homepage
    const router = useRouter()

    //FETCH DATA TIME OF PAGE LOAD
    const fetchData = async () => {
        try {
            //GET CONTRACT, contract1 is user contract, contract 2 is msgStorage
            const contract1 = await connectingWithContract1()
            //GET ACCOUNT
            const connectAccount = await connectWallet()
            setAccount(connectAccount)

            const userExists = await contract1.checkUserExists()

            if (userExists) {
                //GET USER NAME
                const userInfo = await contract1.getMyUserInfo()
                const userName = userInfo[0]
                const userEmail = userInfo[1]
                setUsername(userName)
                setUserEmail(userEmail)

                //GET FRIEND LIST (FIX THIS)
                const friendList = await contract1.getMyFriendList()
                setFriendLists(friendList)

                //GET ALL APP USER LIST (not implemented in smart contract)
                const userList = await contract1.getAllAppUser()
                setUserList(userList)
            } else {
                window.alert(
                    "User does not exist, Please create account first."
                )
                // setError("")
            }
        } catch (error) {
            console.error("Error fetching user data:", error)
            // setError("Please install MetaMask and Connect Your Wallet")
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    // READ MESSAGE
    const readMessage = async (friendAddress) => {
        try {
            const contract2 = await connectingWithContract2()
            const read = await contract2.readFriendMessage(friendAddress)
            console.log(read.content)
            setFriendMsg(read)
        } catch (error) {
            // setError("Currently you have no message")
            // console.log(error)
        }
        // const contract2 = await connectingWithContract2()
        // const read = await contract2.readFriendMessage(friendAddress)
        // console.log(read.content)
        // setFriendMsg(read)
    }

    // REGISTER ACCOUNT
    const registerUser = async ({ name, email, hash }) => {
        const contract1 = await connectingWithContract1()
        const deployIdentityTx = await contract1.deployIdentityContract()
        await deployIdentityTx.wait()
        console.log(
            `Identity Contract deployed successfully at address: ${deployIdentityTx.hash}`
        )
        const getCreatedUser = await contract1.registerUser(name, email, hash)
        setLoading(true)
        await getCreatedUser.wait()
        setLoading(false)
    }

    //ADD FRIEND
    const addFriend = async ({ accountAddress }) => {
        try {
            // if (accountAddress)
            //     return setError("Please provide the correct address")

            const contract1 = await connectingWithContract1()
            const addMyFriend = await contract1.addFriend(accountAddress)
            setLoading(true)
            await addMyFriend.wait
            setLoading(false)
            router.push("/")
            window.location.reload()
        } catch (error) {
            // setError("User already friend")
            window.alert(error)
        }
    }

    // SEND MESSAGE TO YOUR FRIEND
    const sendMessage = async ({ address, content }) => {
        try {
            // if (address || content)
            //     return setError("Please provide the correct address/message")

            const contract2 = await connectingWithContract2()
            const addMessage = await contract2.sendMessage(address, content)
            setLoading(true)
            await addMessage.wait
            setLoading(false)
            window.location.reload()
        } catch (error) {
            setError("Please reload and try again")
        }
    }

    // READ USER INFO
    const readUser = async (userAddress) => {
        const contract1 = await connectingWithContract1()
        const userName = await contract1.getUsername(userAddress)
        setCurrentUsername(userName)
        setCurrentUserAddress(userAddress)
    }

    // Retrieve token ID
    const tokenID = async (userAddress) => {
        const contract1 = await connectingWithContract1()
        const userTokenID = await contract1.getSoulboundTokenId(userAddress)
        setTokenID(userTokenID)
    }
    // Retrieve token URI
    const tokenURI = async (userAddress) => {
        const contract1 = await connectingWithContract1()
        const userTokenURI = await contract1.getSoulboundTokenURI(userAddress)
        setTokenURI(userTokenURI)
    }

    const uploadClaims = async(userAddress) =>{
        const contract1 = await connectingWithContract1()
        const uploadMyClaims = await contract1.uploadClaims(userAddress)
        setLoading(true)
        await uploadMyClaims.wait
        setLoading(false)
        router.push("/")
        window.alert(
            "Claims Updated"
        )
        window.location.reload()
    }

    return (
        <ChainTalkContext.Provider
            value={{
                fetchData,
                readMessage,
                registerUser,
                addFriend,
                sendMessage,
                readUser,
                connectWallet,
                CheckIfWalletConnected,
                tokenID,
                tokenURI,
                uploadClaims,
                userList,
                account,
                userName,
                email,
                friendLists,
                friendMsg,
                loading,
                error,
                currentUserName,
                currentUserAddress,
                userTokenID,
                userTokenURI,
            }}
        >
            {children}
        </ChainTalkContext.Provider>
    )
}
