import React, { useState, useEffect, useContext } from "react"

//INTERNAL IMPORT
import Style from "../styles/profile.module.css"
import { ChainTalkContext } from "../Context/ChainTalkContext"

const profile = () => {
    const {
        fetchData,
        account,
        email,
        userName,
        tokenID,
        userTokenID,
        userTokenURI,
        tokenURI,
        uploadClaims,
    } = useContext(ChainTalkContext)
    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (account) {
            tokenID(account) // Call tokenID when account is available
        }
    }, [account, tokenID])

    const decimalTokenID = parseInt(userTokenID, 16)

    useEffect(() => {
        if (account) {
            tokenURI(account) // Call tokenURI when account is available
        }
    }, [account, tokenURI])
    return (
        <div>
            <div>
                <div className={Style.heading}>Profile Page</div>
                <div className={Style.chat_box}>
                    <div className={Style.heading2}>Username: {userName}</div>
                    <div className={Style.heading2}>Email: {email}</div>
                    <div className={Style.heading2}>Address: {account}</div>
                    <div className={Style.heading2}>
                        Token ID: {decimalTokenID}{" "}
                    </div>
                    <div className={Style.heading2}>
                        Token URI: {userTokenURI}
                    </div>
                    <button
                        onClick={() =>
                            uploadClaims(account)
                            
                        }
                    >
                        Update Claims
                    </button>
                </div>
            </div>
        </div>
    )
}

export default profile
