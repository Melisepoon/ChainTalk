import React, { useEffect, useState, useContext } from "react"

//internal import
// import { ChainTalkContext } from "../Context/ChainTalkContext"
import { Filter, Friend } from "../components/index"

const ChainTalk = () => {
    // const {} = useContext(ChainTalkContext)
    return <div>
        <Filter/>
        <Friend/>
    </div>
}

export default ChainTalk
