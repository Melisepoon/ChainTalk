import React from "react"
import Style from "../styles/termsofuse.module.css"

const TermsOfUse = () => {
    return (
        <div>
            <div>
                <div className={Style.heading}>Terms Of Use</div>
                <div className={Style.body}>
                    This webpage is developed for educational purposes only. Any
                    use of this application for other purposes is not endorsed.
                    By using this application, you agree to use it solely for
                    educational purposes.
                </div>
                <div className={Style.heading}>Disclaimer</div>
                <div className={Style.body}>
                    This application is provided "as is" without any warranties
                    or representations, express or implied. The developers of
                    this application do not guarantee its accuracy, reliability,
                    or suitability for any purpose. Use at your own risk.
                </div>
                <div className={Style.heading}>Source</div>
                <div className={Style.body}>
                    All code can be found at:{" "}
                    <a
                        href="https://github.com/Melisepoon/ChainTalk.git"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://github.com/Melisepoon/ChainTalk.git
                    </a>
                </div>
                <div className={Style.heading}>Copyright</div>
                <div className={Style.body}>
                    Developed by: Poon Yan Xin Melise. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default TermsOfUse
