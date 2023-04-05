// Module imports
import React, {ChangeEvent, Component, FormEvent} from 'react'
// Element imports
import Footer from '../elements/Footer'
// Asset imports
import logoStatic from '../../assets/logo_static.png'
import profilePicture from '../../assets/kzs_lr.jpg'
import { Link } from 'react-router-dom'
import { upload } from '@testing-library/user-event/dist/upload'


export interface State{
    selected : number,
    showInput: boolean,
    userid : any,
    firstName: string,
    lastName: string,
    studies: string,
    occupation: string,
    workExperience: string,
    aboutMe: string,
    projectsCount: number,
    profilePicture: string,
    updateProfilePicture?: FileList
}

interface Props{

}
class Profile extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            selected : 0,
            showInput: true,
            userid : localStorage.getItem('userid'),
            firstName: '',
            lastName: '',
            studies: '',
            occupation: '',
            workExperience: '',
            aboutMe: '',
            projectsCount: 0,
            profilePicture: "",
            updateProfilePicture: undefined
        }
    }
    componentDidMount(): void {
        if(!localStorage.getItem('userid')){
            alert("Please log in first")
        }
        this.loadUserDetailsFromDatabase();
    }

    updateProfilePictureFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({updateProfilePicture : e.target.files!})
        setTimeout(this.handleUpdate, 1000)
    }

    handleUpdate = () => {
        console.log("fentvan elv")
        console.log(this.state.updateProfilePicture)
        if(!this.state.updateProfilePicture){
            return;
        }
        
        var re = /(?:\.([^.]+))?$/;
        const data = new FormData();
        const ext = re.exec(this.state.updateProfilePicture[0].name)![1]
        const filename = `${this.state.userid}-0-0-0.${ext}`
        data.append('file', this.state.updateProfilePicture[0], filename)
        fetch(`http://localhost:3000/upload`, {
            method: 'POST',
            body: data
        })
        setTimeout(()=>{window.location.reload()}, 1000)
        
    }
    loadUserDetailsFromDatabase = async() => {
        const requestData = {
            'userid': this.state.userid
        };

        const response = await fetch('http://localhost:3000/getProfileDetails', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        const responseBody = await response.json();
        console.log(responseBody)
        this.setState({
            firstName: responseBody.firstName,
            lastName: responseBody.lastName,
            studies: responseBody.studies,
            occupation: responseBody.occupation,
            workExperience: responseBody.workExperinece,
            aboutMe: responseBody.aboutMe,
            projectsCount : responseBody.projectsCount,
            profilePicture: responseBody.profilePicture
        })
    }
    
    handleInputDoubleclick = () => {
        this.setState({showInput : !this.state.showInput})
        console.log(this.state.showInput)
    }

    render() {
        return(
        <div className='container centered'>
            <img src={logoStatic} alt="Profile picture" id="logo-static"/>
            <div className='profile-container'>
                <h1>{this.state.firstName} {this.state.lastName}</h1> {/* ! */}
                <hr />
                <div className="profile-picture-container" style={{backgroundImage: `url(${this.state.profilePicture})`, backgroundSize: "cover"}}>
                    <input type="file"
                           placeholder='asd'
                           id="profile-picture"
                           onChange={this.updateProfilePictureFileChange}/>
                </div>
                <div className="about-container">
                    <p className='bold'>Studies</p>
                    {this.state.showInput ? (
                        <p onDoubleClick={this.handleInputDoubleclick}>
                        {this.state.studies ? this.state.studies : "Not given"} 
                        </p>
                    ) : (
                        <input type="text" placeholder={this.state.studies} onDoubleClick={this.handleInputDoubleclick} />
                    )}
                    
                    <hr />
                    <p className='bold'>Occupation</p>
                    <p>
                        {this.state.occupation ? this.state.occupation : "Not given"}</p> {/* ! */}  {/* ! */}
                    <hr />
                    <p className='bold'>Work experience</p>
                    <p>
                        {this.state.workExperience ? this.state.workExperience : "Not given"}
                    </p> {/* ! */}
                </div>
                <hr />
                    <p className="bold">A few words about me</p>
                    <p className="content"> {/* ! */}
                        {this.state.aboutMe ? this.state.aboutMe : "Not given"}
                    </p>
                <hr />
                    <div className="projects-container">
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