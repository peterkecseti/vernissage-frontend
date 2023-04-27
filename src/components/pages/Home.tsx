// Module imports
import React, {Component} from 'react'
// Element imports
import Login, { LoginProps } from '../elements/Login'
import Register, { RegisterProps } from '../elements/Register'
import Search, { SearchProps } from '../elements/Search'
import Footer from '../elements/Footer'
// Asset imports
import bgVideo from '../../assets/vernissage02.mp4'
import logoGif from '../../assets/logo.gif'
// CSS imports
import '../../css/mobile.css'
import '../../css/tablet.css'
import '../../css/small-desktop.css'

interface State{
    selected : number;
    responseMessage: LoginProps | RegisterProps | null;
}

class Home extends Component<{}, State>{
    constructor(props: {}) {
        super(props);
        this.state = {
            selected : 0,
            responseMessage : null
        }
    }

    handleLoginMessage = (responseMessage: LoginProps) => {
        this.setState({ responseMessage });
    }
    
    handleRegisterMessage = (responseMessage: RegisterProps) => {
        this.setState({ responseMessage });
    }

    handleSearchMessage = (responseMessage: SearchProps) => {
        this.setState({ responseMessage });
    }

    handleFormChange = () => {
        // this.setState({responseMessage: null})   
        switch(this.state.selected){
            case 0: return <Login onChildProps={this.handleLoginMessage}/>
            case 1: return <Register onChildProps={this.handleRegisterMessage}/>
            case 2: return <Search onChildProps={this.handleSearchMessage}/>
        }
    }

    render() {
        return(
        <div>
            <div id="video-container">
                <video autoPlay loop muted id="bgvideo">
                    <source src={bgVideo}/>
                </video>                
            </div>
            <div className="container">
                <div className="centered">
                    <img id='logogif' src={logoGif} alt="" />
                    <div id="form-nav" className='centered'>
                        <ul>
                            <li id={(this.state.selected === 0) ? 'selected' : ''} onClick={()=>{this.setState({selected : 0})}}>
                                Log in
                            </li>
                            <li id={(this.state.selected === 1) ? 'selected' : ''} onClick={()=>{this.setState({selected : 1})}}>
                                Register
                            </li>
                            <li id={(this.state.selected === 2) ? 'selected' : ''} onClick={()=>{this.setState({selected : 2})}}>
                                Search
                            </li>
                        </ul>
                    </div>
                    <div className="forms-container">
                        {this.handleFormChange()}
                    </div>
                    <p id="response-message">
                        {this.state.responseMessage?.responseMessage}
                    </p>
                </div>
            </div>
        </div>
        )
    }
}


export default Home;