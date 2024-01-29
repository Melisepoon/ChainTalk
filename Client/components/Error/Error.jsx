import React from "react"

//Internal import
import images from "../../assets"
import Style from "./Error.module.css"

const Error = ({ error }) => {
    return (
      <div className={Style.Error}>
        <div className={Style.Error_box}>
          <h1>Error! Please Fix & Reload Browser</h1>
          {error}
        </div>
      </div>
    )
}

export default Error
