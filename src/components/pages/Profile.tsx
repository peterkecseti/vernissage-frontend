// Module imports
import React, {Component} from 'react'
// Element imports
import Footer from '../elements/Footer'
// Asset imports
import logoStatic from '../../assets/logo_static.png'
import profilePicture from '../../assets/kzs_lr.jpg'
import { Link } from 'react-router-dom'


export interface State{
    selected : number
    userdata : any
}

interface Props{

}
class Profile extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            selected : 0,
            userdata : localStorage.getItem('userdataJson')
        }
    }
    componentDidMount(): void {
        console.log(this.state.userdata)
        

        if(this.state.userdata){
            const parsedUserdata = JSON.parse(this.state.userdata)
            this.setState({userdata : parsedUserdata})
            console.log(parsedUserdata.projectsCount)
            localStorage.setItem("projectsCount", parsedUserdata.projectsCount)
        }
        {/* Ha nincs token akkor redirecteljen a főoldalra */}
    }

    render() {
        return(
        <div className='container centered'>
            <img src={logoStatic} alt="Profile picture" id="logo-static"/>
            <div className='profile-container'>
                <h1>{this.state.userdata.firstName} {this.state.userdata.lastName}</h1> {/* ! */}
                <hr />
                <div className="profile-picture-container">
                    <img src={profilePicture} alt="" id="profile-picture"/>
                </div>
                <div className="about-container">
                    <p className='bold'>Studies</p>
                    <p>
                        {this.state.userdata.studies ? this.state.userdata.studies : "Not given"}
                    </p>  {/* ! */}
                    <hr />
                    <p className='bold'>Occupation</p>
                    <p>
                        {this.state.userdata.occupation ? this.state.userdata.occupation : "Not given"}</p> {/* ! */}  {/* ! */}
                    <hr />
                    <p className='bold'>Work experience</p>
                    <p>
                        {this.state.userdata.workExperience ? this.state.userdata.workExperience : "Not given"}
                    </p> {/* ! */}
                </div>
                <hr />
                    <p className="bold">A few words about me</p>
                    <p className="content"> {/* ! */}
                        {this.state.userdata.aboutMe ? this.state.userdata.aboutMe : "Not given"}
                    </p>
                <hr />
                    <div className="projects-container">
                        <div className="project"></div>
                        <div className="project"></div>
                        <div className="project"></div>
                        <div className="project"></div>
                        <div className="project"></div>
                        <div className="project"></div>
                        <div className="project"></div>
                        <div className="project"></div>
                        <Link className="project" id="create-project" to="/project">
                        </Link>
                    </div>
            </div>
            <Footer/>
        </div>
        )
    }
}


export default Profile;