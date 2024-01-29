import React, { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

//INTERNAL IMPORT
import Style from "./Card.module.css"
import images from "../../../assets"


const Card = ({  el, i,readMessage, readUser, username }) => {

    return (
        <Link
            href={{
                pathname: "/",
                query: { name:`${username}`, address: `${el}` },
                // address: `${el.pubkey}`,
            }}
        >
            <div
                className={Style.Card}
                onClick={() => (readMessage(el), readUser(el))}
            >
                <div className={Style.Card_box}>
                    <div className={Style.Card_box_left}>
                        <Image
                            src={images.accountName}
                            alt="username"
                            width={50}
                            height={50}
                            className={Style.Card_box_left_img}
                        />
                    </div>
                    <div className={Style.Card_box_right}>
                        <div className={Style.Card_box_right_middle}>
                            <h4>{username}</h4>
                            <small>{el.slice(21)}..</small>
                        </div>
                        <div className={Style.Card_box_right_end}>
                            {/* <small className={Style.number}>{i + 1}</small> */}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card
