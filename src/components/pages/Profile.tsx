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
    roundedBottom: number,

    projects: any[],

    updateProfilePicture?: FileList,
    updateStudies: string,
    updateOccupation: string,
    updateWorkExperience: string,
    updateAboutMe: string
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
            profilePicture: '',
            updateProfilePicture: undefined,
            updateStudies: '',
            updateOccupation: '',
            updateWorkExperience: '',
            updateAboutMe: '',
            projects: [],
            roundedBottom: 0
        }
    }
    componentDidMount(): void {
        if(!localStorage.getItem('userid')){
            alert("Please log in first")
            console.log(localStorage.getItem('userid'))
        }
        this.loadUserDetailsFromDatabase();

        
    }

    updateProfilePictureFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({updateProfilePicture : e.target.files!})
        setTimeout(this.handleUpdate, 1000)
    }

    handleUpdate = async () => {
        if(!this.state.updateProfilePicture){
            return;
        }
        
        var re = /(?:\.([^.]+))?$/;
        const data = new FormData();
        const ext = re.exec(this.state.updateProfilePicture[0].name)![1]
        const filename = `${this.state.userid}-0-0-0.${ext}`
        data.append('file', this.state.updateProfilePicture[0], filename)
        await fetch(`http://localhost:3000/upload`, {
            method: 'POST',
            body: data
        }).then(()=>{this.loadUserDetailsFromDatabase()})
        
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
            workExperience: responseBody.workExperience,
            aboutMe: responseBody.aboutMe,
            projectsCount : responseBody.projectsCount,
            profilePicture: responseBody.profilePicture
        })
        this.loadProjects();
    }

    loadProjects = () => {
        let projectsList = [];
        if(this.state.projectsCount % 3 === 2){
            this.setState({roundedBottom: this.state.projectsCount - 2})
        }
        if(this.state.projectsCount % 3 === 1){
            this.setState({roundedBottom: this.state.projectsCount - 1})
        }
        if(this.state.projectsCount % 3 === 0){
            this.setState({roundedBottom: this.state.projectsCount})
        }
        for(let i = 0; i < this.state.projectsCount; i++){
            projectsList.push(<div className={`project ${i === 0 ? 'rounded-top-left' : ''}
                                                       ${i === 2 ? 'rounded-top-right' : ''}
                                                       ${i === this.state.roundedBottom ? 'rounded-bottom-left' : ''}`} key={i}>{i}</div>)
        }
        this.setState({projects: projectsList})
        
    }
    
    handleInputDoubleclick = async() => {
        this.setState({showInput : !this.state.showInput})
        console.log(this.state.showInput)
        if(!this.state.showInput){
            const updateData = {
                userid: this.state.userid,
                updateStudies: this.state.updateStudies,
                updateOccupation: this.state.updateOccupation,
                updateWorkExperience: this.state.updateWorkExperience,
                updateAboutMe: this.state.updateAboutMe
            }

            await fetch('http://localhost:3000/updateProfileDetails', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updateData)
        }).then(()=>{this.loadUserDetailsFromDatabase()});
        }
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
                        <p className='edit-hover'
                           onDoubleClick={this.handleInputDoubleclick}>
                            {this.state.studies ? this.state.studies : "Not given - double click to edit"}
                        </p>
                    ) : (
                        <input type="text"
                               placeholder="double click to save"
                               id="update-profile"
                               onDoubleClick={(e)=>{this.setState({}); this.handleInputDoubleclick()}}
                               onChange={(e)=>{this.setState({updateStudies : e.target.value})}}/>
                    )}
                    
                    <hr />
                    <p className='bold'>Occupation</p>
                    {this.state.showInput ? (
                        <p className='edit-hover'
                           onDoubleClick={this.handleInputDoubleclick}>
                            {this.state.occupation ? this.state.occupation : "Not given - double click to edit"}
                        </p>
                    ) : (
                        <input type="text"
                               id="update-profile"
                               placeholder="double click to save"
                               onDoubleClick={(e)=>{this.setState({}); this.handleInputDoubleclick()}}
                               onChange={(e)=>{this.setState({updateOccupation : e.target.value})}}/>
                    )}
                    <hr />
                    <p className='bold'>Work experience</p>
                    {this.state.showInput ? (
                        <p className='edit-hover'
                           onDoubleClick={this.handleInputDoubleclick}>
                            {this.state.workExperience ? this.state.workExperience : "Not given - double click to edit"}
                        </p>
                    ) : (
                        <input type="text"
                               id="update-profile"
                               placeholder="double click to save"
                               onDoubleClick={(e)=>{this.setState({}); this.handleInputDoubleclick()}}
                               onChange={(e)=>{this.setState({updateWorkExperience : e.target.value})}}/>
                    )}
                </div>
                <hr />
                    <p className="bold">A few words about me</p>
                    {this.state.showInput ? (
                        <p className='edit-hover'
                           onDoubleClick={this.handleInputDoubleclick}>
                            {this.state.aboutMe ? this.state.aboutMe : "Not given - double click to edit"}
                        </p>
                    ) : (
                        <input type="text"
                               id="update-profile"
                               placeholder="double click to save"
                               onDoubleClick={(e)=>{this.setState({}); this.handleInputDoubleclick()}}
                               onChange={(e)=>{this.setState({updateAboutMe : e.target.value})}}/>
                    )}
                <hr />
                    <div className="projects-container">
                        {this.state.projects}
                        <Link className="project" id="create-project" to="/project">
                        </Link>
                    </div>
            </div>
            {/* <Footer/> */}
        </div>
        )
    }
}


export default Profile;