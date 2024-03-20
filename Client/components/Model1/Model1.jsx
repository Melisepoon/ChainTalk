import React, { useState, useContext } from "react"
import Image from "next/image"
import { keccak256 } from "web3-utils"

//Internal import
import Style from "./Model1.module.css"
import images from "../../assets"
import { ChainTalkContext } from "../../Context/ChainTalkContext"
import { Loader } from "../index"

const Model1 = ({
    openBox,
    title,
    head,
    info,
    smallInfo,
    image,
    // functionName,
    address,
}) => {
    //USESTATE
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [hash, setHash] = useState("")
    const [accountAddress, setAccountAddress] = useState("")

    const { loading, registerUser } = useContext(ChainTalkContext)
    return (
        <div className={Style.Model}>
            <div className={Style.Model_box}>
                <div className={Style.Model_box_left}>
                    <Image src={image} alt="buddy" width={700} height={700} />
                </div>
                <div className={Style.Model_box_right}>
                    <h1>
                        {title} <span>{head}</span>
                    </h1>
                    <p>{info}</p>
                    <small>{smallInfo}</small>

                    {loading == true ? (
                        <Loader />
                    ) : (
                        <div className={Style.Model_box_right_name}>
                            <div className={Style.Model_box_right_name_info}>
                                <Image
                                    src={images.username}
                                    alt="User"
                                    width={30}
                                    height={30}
                                />
                                <input
                                    type="text"
                                    placeholder="your name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className={Style.Model_box_right_name_info}>
                                <Image
                                    src={images.username}
                                    alt="Email"
                                    width={30}
                                    height={30}
                                />
                                <input
                                    type="text"
                                    placeholder="your email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className={Style.Model_box_right_name_info}>
                                <Image
                                    src={images.username}
                                    alt="Password"
                                    width={30}
                                    height={30}
                                />
                                <input
                                    type="password"
                                    placeholder="your password"
                                    onChange={(e) => {
                                        const hashedPassword = keccak256(
                                            e.target.value
                                        )
                                        console.log(hashedPassword)
                                        setHash(hashedPassword)
                                    }}
                                />
                            </div>
                            <div className={Style.Model_box_right_name_info}>
                                <Image
                                    src={images.account}
                                    alt="User"
                                    width={30}
                                    height={30}
                                />
                                <input
                                    type="text"
                                    placeholder={address || "Enter address"}
                                    onChange={(e) =>
                                        setAccountAddress(e.target.value)
                                    }
                                />
                            </div>
                            <div className={Style.Model_box_right_name_btn}>
                                <button
                                    onClick={() => {
                                        console.log("Name:", name)
                                        console.log("Email:", email)
                                        console.log("Hash:", hash)
                                        registerUser({ name, email, hash })
                                        // window.location.reload() // Reload the page
                                        // window.location.href = "alluser"

                                        // functionName({ name, email, hash })
                                    }}
                                >
                                    {""}
                                    <Image
                                        src={images.send}
                                        alt="send"
                                        width={30}
                                        height={30}
                                    />
                                    {""}
                                    Submit
                                </button>

                                <button onClick={() => openBox(false)}>
                                    {""}
                                    <Image
                                        src={images.close}
                                        alt="send"
                                        width={30}
                                        height={30}
                                    />
                                    {""}
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Model1
