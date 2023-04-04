// Module imports
import React, {Component} from 'react'
// Element imports
import Login from '../elements/Login'
import Register from '../elements/Register'
import Search from '../elements/Search'
import Footer from '../elements/Footer'
// Asset imports
import bgVideo from '../../assets/vernissage02.mp4'
import logoGif from '../../assets/logo.gif'

interface State{
    selected : number
}
interface Props{

}
class Home extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            selected : 0,
        }
    }

    handleFormChange = () => {
        switch(this.state.selected){
            case 0: return <Login/>
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
                                Login
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
                </div>
            </div>
        </div>
        )
    }
}


export default Home;