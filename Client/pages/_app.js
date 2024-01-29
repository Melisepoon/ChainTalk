import "../styles/globals.css"
//internal import
import { ChainTalkProvider } from "../Context/ChainTalkContext"
import { NavBar } from "../components/index"

const MyApp = ({ Component, pageProps }) => (
    <div>
        <ChainTalkProvider>
            <NavBar />
            <Component {...pageProps} />
        </ChainTalkProvider>
    </div>
)

export default MyApp
