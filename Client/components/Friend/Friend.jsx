import React, { useState, useContext, useEffect } from "react"
import Image from "next/image"

//INTERNAL IMPORT
import Style from "./Friend.module.css"
import images from "../../assets"
import Card from "./Card/Card"
import Chat from "./Chat/Chat"
import { connectWallet, connectingWithContract1 } from "../../Utils/apiFeature"

import { ChainTalkContext } from "../../Context/ChainTalkContext"

const Friend = () => {
    // const array = [1, 2, 3, 4, 5, 6]

    const {
        sendMessage,
        account,
        friendLists,
        readMessage,
        userName,
        loading,
        currentUserName,
        currentUserAddress,
        readUser,
        friendMsg,
    } = useContext(ChainTalkContext)

    const [friendUsernames, setFriendUsernames] = useState([])
    const [account1, setAccount] = useState("")

    const fetchFriendUsername = async (friendAddress) => {
        const contract1= await connectingWithContract1()
        //GET ACCOUNT
        const connectAccount = await connectWallet()
        setAccount(connectAccount)

        const friendUsername = await contract1.getUsername(friendAddress)

        return friendUsername

        // try {
        //     const { contract1 } = await connectingWithContract();

        //     // Assuming `connectWallet` returns the connected account
        //     const connectAccount = await connectWallet();

        //     // Use the connected account to fetch the username of the friend at 'friendAddress'
        //     const friendUsername = await contract1.getUsername(friendAddress);

        //     return friendUsername;
        // } catch (error) {
        //     // Handle errors, e.g., set an error state or return a default username
        //     console.error("Error fetching friend's username:", error);
        //     return "Error fetching username";
        // }
    }

    useEffect(() => {
        const fetchUsernames = async () => {
            const usernames = []
            for (const friendAddress of friendLists) {
                const username = await fetchFriendUsername(friendAddress)
                usernames.push(username)
            }
            setFriendUsernames(usernames)
        }

        fetchUsernames()
    }, [friendLists])

    // console.log(Array.isArray(friendLists)) // Check if it returns true
    return (
        <div className={Style.Friend}>
            <div className={Style.Friend_box}>
                <div className={Style.Friend_box_left}>
                    {friendLists &&
                        friendLists.map((el, i) => (
                            <Card
                                key={i + 1}
                                el={el}
                                username={friendUsernames[i]}
                                i={i}
                                readMessage={readMessage}
                                readUser={readUser}
                            />
                        ))}
                </div>
                <div className={Style.Friend_box_right}>
                    <Chat
                        functionName={sendMessage}
                        readMessage={readMessage}
                        friendMsg={friendMsg}
                        account={account}
                        userName={userName}
                        loading={loading}
                        currentUserName={currentUserName}
                        currentUserAddress={currentUserAddress}
                        readUser={readUser}
                    />
                </div>
            </div>
        </div>
    )
}

export default Friend
