import React, { useState, useContext } from "react"
import Image from "next/image"

//Internal import
import Style from "./Model2.module.css"
import images from "../../assets"
import { ChainTalkContext } from "../../Context/ChainTalkContext"
import { Loader } from "../index"

const Model2 = ({
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
    // const [name, setName] = useState("")
    // const [email, setEmail] = useState("")
    // const [hash, setHash] = useState("")
    const [accountAddress, setAccountAddress] = useState("")

    const { loading, addFriend } = useContext(ChainTalkContext)
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
                                        addFriend({ accountAddress })
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

export default Model2
