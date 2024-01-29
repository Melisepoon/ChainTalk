import React, { useState, useEffect, useContext } from "react"

//INTERNAL IMPORT
import { UserCard } from "../components/index"
import Style from "../styles/alluser.module.css"
import { ChainTalkContext } from "../Context/ChainTalkContext"

const alluser = () => {
    const { userList, addFriend } = useContext(ChainTalkContext)
    return (
        <div>
            <div className={Style.alluser_info}>
                <h1>Find your friends</h1>
            </div>
            <div className={Style.alluser}>
                {userList.map((el, i) => (
                    <UserCard
                        key={i + 1}
                        el={el}
                        i={i}
                        addFriend={addFriend}
                    />
                ))}
            </div>
        </div>
    )
}

export default alluser
