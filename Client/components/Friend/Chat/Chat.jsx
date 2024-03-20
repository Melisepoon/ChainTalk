import React, { useState, useEffect, useContext } from "react"
import Image from "next/image"
import { useRouter } from "next/router"

//INTERNAL IMPORT
import Style from "./Chat.module.css"
import images from "../../../assets"
import { convertTime } from "../../../Utils/apiFeature"
import { Loader } from "../../index"
import { ChainTalkContext } from "../../../Context/ChainTalkContext"

const Chat = ({
    functionName,
    readMessage1,
    friendMsg,
    account,
    userName,
    loading,
    currentUserName,
    currentUserAddress,
    readUser,
}) => {
    //USESTATE
    const { sendMessage, readMessage } = useContext(ChainTalkContext)
    const [message, setMessage] = useState("")
    const [chatData, setChatData] = useState({
        name: "",
        address: "",
    })
    const [friendm, setfriendm] = useState("")
    const router = useRouter()
    useEffect(() => {
        if (!router.isReady) return
        setChatData(router.query)
    }, [router.isReady])
    // const md = readMessage(chatData.address)
    // console.log(md)

    // uncomment this
    useEffect(() => {
        if (chatData.address) {
            //when reload, person chatting with remains
            readMessage(router.query.address)
            readUser(router.query.address)
        }
    }, [])
    // console.log(friendMsg[0])
    // console.log(Array.isArray(friendMsg))

    console.log(chatData.address, chatData.name)
    // console.log(chatData.address)
    return (
        <div className={Style.Chat}>
            {currentUserName && currentUserAddress ? (
                <div className={Style.Chat_user_info}>
                    <Image
                        src={images.accountName}
                        alt="image"
                        width={70}
                        height={70}
                    ></Image>
                    <div className={Style.Chat_user_info_box}>
                        <h3>You are chatting with: </h3>
                        <h4>{currentUserName}</h4>
                        <p className={Style.show}>{currentUserAddress}</p>
                    </div>
                </div>
            ) : (
                ""
            )}

            <div className={Style.Chat_box_box}>
                <div className={Style.Chat_box}>
                    <div className={Style.Chat_box_left}>
                        {friendMsg &&
                            friendMsg.map((el, i) => (
                                <div>
                                    {el.sender == chatData.address ? (
                                        <div
                                            className={
                                                Style.Chat_box_left_title
                                            }
                                        >
                                            <Image
                                                src={images.accountName}
                                                alt="image"
                                                width={50}
                                                height={50}
                                            />
                                            <span>
                                                {chatData.name} {""}
                                                {/* <small>
                                                    Time:
                                                    {convertTime(el.timestamp)}
                                                </small> */}
                                            </span>
                                        </div>
                                    ) : (
                                        <div
                                            className={
                                                Style.Chat_box_left_title
                                            }
                                        >
                                            <Image
                                                src={images.accountName}
                                                alt="image"
                                                width={50}
                                                height={50}
                                            />
                                            <span>
                                                {userName} {""}
                                                {/* <small>
                                                    Time:
                                                    {convertTime(el.timestamp)}
                                                </small> */}
                                            </span>
                                        </div>
                                    )}
                                    <p key={i + 1}>
                                        {el.content}
                                        {""}
                                        {""}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
                {currentUserName && currentUserAddress ? (
                    <div className={Style.Chat_box_send}>
                        <div className={Style.Chat_box_send_img}>
                            {/* <Image
                                src={images.smile}
                                alt="smile"
                                width={50}
                                height={50}
                            /> */}
                            <input
                                type="text"
                                placeholder="type your message here"
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            {/* <Image
                                src={images.file}
                                alt="file"
                                width={50}
                                height={50}
                            /> */}
                            {loading == true ? (
                                <Loader />
                            ) : (
                                <Image
                                    src={images.send}
                                    alt="send"
                                    width={50}
                                    height={50}
                                    onClick={async () => {
                                        try {
                                            await sendMessage({
                                                address: chatData.address,
                                                content: message,
                                            })
                                        } catch (error) {
                                            console.error(
                                                "Error sending message:",
                                                error
                                            )
                                        }
                                    }}
                                    //     try {
                                    //         await functionName({
                                    //             address: chatData.address,
                                    //             msg: message,
                                    //         })
                                    //     } catch (error) {
                                    //         console.error(
                                    //             "Error sending message:",
                                    //             error
                                    //         )
                                    //     }
                                    // }}
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    )
}

export default Chat
