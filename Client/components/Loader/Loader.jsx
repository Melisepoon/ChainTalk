import React from "react"

//Internal import
import Style from "./Loader.module.css"
import Image from "next/image"
import images from "../../assets"

const Loader = () => {
    return (
        <div className={Style.Loader}>
            <div className={Style.Loader_box}>
                <Image
                    src={images.loader}
                    alt="loader"
                    widt={100}
                    height={100}
                />
            </div>
        </div>
    )
}

export default Loader
