// Module imports
import React, {Component} from 'react'
// Element imports
import Login, { LoginProps } from '../elements/Login'
import Register from '../elements/Register'
import Search from '../elements/Search'
import Footer from '../elements/Footer'
// Asset imports
import bgVideo from '../../assets/vernissage02.mp4'
import logoGif from '../../assets/logo.gif'

interface State{
    selected : number;
    responseMessage: LoginProps | null;
}

class Home extends Component<{}, State>{
    constructor(props: {}) {
        super(props);
        this.state = {
            selected : 0,
            responseMessage : null
        }
    }
    handleResponseMessage = (responseMessage: LoginProps) => {
        this.setState({ responseMessage });
    }

    handleFormChange = () => {
        switch(this.state.selected){
            case 0: return <Login onChildProps={this.handleResponseMessage}/>
            case 1: return <Register/>
            case 2: return <Search/>
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