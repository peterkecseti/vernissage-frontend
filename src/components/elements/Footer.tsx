// Module imports
import React, {Component, FormEvent} from 'react'
import jwt_decode from 'jwt-decode'
// Element imports
// Asset imports
import logoWhite from '../../assets/logo_white.png'

class Footer extends Component<{}>{
    render() {
        return(<div id="footer-container">
                <footer>
                    <img src={logoWhite} alt="" id="logo-white" />
                </footer>
        </div>

        )
    }
}


export default Footer;