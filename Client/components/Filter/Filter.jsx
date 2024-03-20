import React, { useState, useContext } from "react"
import Image from "next/image"

//Internal import
import Style from "./Filter.module.css"
import images from "../../assets"
import { ChainTalkContext } from "../../Context/ChainTalkContext"
import { Model2 } from "../index"

const Filter = () => {
    const { account, addFriend } = useContext(ChainTalkContext)
    //USESTATE
    const [addFriends, setAddFriends] = useState(false)

    return (
        <div className={Style.Filter}>
            <div className={Style.Filter_box}>
                <div className={Style.Filter_box_left}>
                    <div className={Style.Filter_box_left_search}>
                        <Image
                            src={images.search}
                            alt="image"
                            width={20}
                            height={20}
                        />
                        <input type="text" placeholder="search.."></input>
                    </div>
                </div>
                <div className={Style.Filter_box_right}>
                    <button onClick={() => setAddFriends(true)}>
                        <Image
                            src={images.user}
                            alt="clear"
                            width={20}
                            height={20}
                        />
                        Add Friend
                    </button>
                </div>
            </div>

            {/* //MODEL */}
            {addFriends && (
                <div className={Style.Filter_model}>
                    <Model2
                        openBox={setAddFriends}
                        title="Welcome to "
                        head="ChainTalk"
                        info="A Blockchain messaging application"
                        smallInfo="Kindly enter your friend's address"
                        image={images.logo2}
                        // functionName={addFriend}
                        account
                    />
                </div>
            )}
        </div>
    )
}

export default Filter
