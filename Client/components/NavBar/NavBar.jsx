import React, { useEffect, useState, useContext } from "react"
import Image from "next/image"
import Link from "next/link"
// import { ConnectButton } from "web3uikit"

//INTERNAL IMPORT
import Style from "./NavBar.module.css"
import { ChainTalkContext } from "../../Context/ChainTalkContext"
import { Model1, Error } from "../index"
import images from "../../assets"

const NavBar = () => {
    const menuItems = [
        {
            menu: "All Users",
            link: "alluser",
        },
        {
            menu: "Chat",
            link: "/",
        },
        {
            menu: "Profile",
            link: "profile",
        },
        {
            menu: "Terms Of Use",
            link: "termsofuse",
        },

    ]

    //USESTATE
    const [active, setActive] = useState(0)
    const [open, setOpen] = useState(false)
    const [openModel, setOpenModel] = useState(false)

    const { account, userName, connectWallet, registerUser, error } =
        useContext(ChainTalkContext)

    return (
        <div className={Style.NavBar}>
            <div className={Style.NavBar_box}>
                <div className={Style.NavBar_box_left}>
                    {/* ChainTalk */}
                    <Image
                        src={images.logo1}
                        alt="logo"
                        width={80}
                        height={50}
                    />
                </div>
                <div className={Style.NavBar_box_right}>
                    {/* //DESKTOP */}
                    <div className={Style.NavBar_box_right_menu}>
                        {menuItems.map((el, i) => (
                            <div
                                onClick={() => setActive(i + 1)}
                                key={i + 1}
                                className={`${
                                    Style.NavBar_box_right_menu_items
                                }${active == i + 1 ? Style.active_btn : ""}`}
                            >
                                {" "}
                                <span className={Style.activeIndicator}>
                                    {active === i + 1 ? "**" : ""}
                                </span>
                                <Link
                                    className={
                                        Style.NavBar_box_right_menu_items_link
                                    }
                                    href={el.link}
                                >
                                    {el.menu}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* //MOBILE */}
                    {open && (
                        <div className={Style.Mobile_menu}>
                            {menuItems.map((el, i) => (
                                <div
                                    onClick={() => setActive(i + 1)}
                                    key={i + 1}
                                    className={`${Style.Mobile_menu_items}${
                                        active == i + 1 ? Style.active_btn : ""
                                    }`}
                                >
                                    {" "}
                                    <span className={Style.activeIndicator}>
                                        {active === i + 1 ? "**" : ""}
                                    </span>
                                    <Link
                                        className={Style.Mobile_menu_items_link}
                                        href={el.link}
                                    >
                                        {el.menu}
                                    </Link>
                                </div>
                            ))}

                            <p className={Style.mobile_menu_btn}>
                                <Image
                                    src={images.close}
                                    alt="close"
                                    width={50}
                                    height={50}
                                    onClick={() => setOpen(false)}
                                ></Image>
                            </p>
                        </div>
                    )}

                    {/* //CONNECT WALLET */}
                    <div className={Style.NavBar_box_right_connect}>
                        {account == "" ? (
                            <button onClick={() => connectWallet()}>
                                {""}
                                <span>Connect Wallet</span>
                            </button>
                        ) : (
                            <button onClick={() => setOpenModel(true)}>
                                {""}
                                <Image
                                    src={
                                        userName
                                            ? images.accountName
                                            : images.create2
                                    }
                                    alt="Account image"
                                    width={20}
                                    height={20}
                                />
                                {""}
                                <small>{userName || "Create Account"}</small>
                            </button>
                        )}
                    </div>

                    <div
                        className={Style.NavBar_box_right_open}
                        onClick={() => setOpen(true)}
                    >
                        <Image
                            src={images.open}
                            alt="open"
                            width={30}
                            height={30}
                        />
                    </div>
                </div>
            </div>

            {/* //MODEL COMPONENT */}
            {openModel && (
                <div className={Style.modelBox}>
                    <Model1
                        openBox={setOpenModel}
                        title="Welcome to"
                        head="ChainTalk"
                        info="A Blockchain Messaging Application"
                        smallInfo="Kindly enter your name..."
                        image={images.logo2}
                        // functionName={(params) => {
                        //     console.log("Parameters:", params) // Log parameters here
                        //     registerUser(params) // Call registerUser function
                        // }}
                        address={account}
                    />
                </div>
            )}
            {error == "" ? "" : <Error error={error} />}
        </div>
    )
}

export default NavBar
