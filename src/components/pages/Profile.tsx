// Module imports
import React, {ChangeEvent, Component, FormEvent} from 'react'
import withRouter from '../withRouter';
// Element imports
import Footer from '../elements/Footer'
// Asset imports
import logoStatic from '../../assets/logo_static.png'
import { Link, NavigateFunction } from 'react-router-dom'
import { getImages, getProfileDetails, getProjects, updateProfileDetails } from './AddProject/ProjectDataHandler';


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
    projectsData: any[],
    imageData: any[],
    updateProfilePicture?: FileList,
}

interface Props{
    navigate: NavigateFunction;
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
            projectsData: [],
            imageData: [],
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
        const responseBody = await getProfileDetails(this.state.userid)
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
        
        const projectsData = await getProjects(parseInt(this.state.userid))
        this.setState({projectsData: projectsData})

        const imageData = await getImages(parseInt(this.state.userid))
        this.setState({imageData: imageData})

        localStorage.setItem('projectsCount', this.state.projectsCount.toString())
        localStorage.setItem('userdata', JSON.stringify(responseBody))

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
                                                       ${i === this.state.roundedBottom ? 'rounded-bottom-left' : ''}`} key={i}
                                    onClick={()=>{this.props.navigate(`/display-project/${this.state.projectsData[i].projectId}`)}}
                                    style={{backgroundImage: `url(${this.state.imageData[i]})`}}>
                                                        
                                                        <p className="allcaps">{this.state.projectsData[i].projectTitle}</p>
                                                       </div>)
        }
        this.setState({projects: projectsList})
        
    }
    
    handleInputDoubleclick = async() => {
        this.setState({showInput : !this.state.showInput})
        if(!this.state.showInput){
            const updateData = {
                userid: this.state.userid,
                updateStudies: this.state.studies,
                updateOccupation: this.state.occupation,
                updateWorkExperience: this.state.workExperience,
                updateAboutMe: this.state.aboutMe
            }
            await updateProfileDetails(updateData).then(()=>{this.loadUserDetailsFromDatabase()});
        }
    }

    render() {
        return(
        <div className='container centered profile-text'>
            <Link to="/">
                <img src={logoStatic} alt="Profile picture" id="logo-static"/>
            </Link>
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
                    <p className='bold allcaps'>Studies</p>
                    {this.state.showInput ? (
                        <p className='edit-hover'
                           onDoubleClick={this.handleInputDoubleclick}>
                            {this.state.studies ? this.state.studies : "Not given - double click to edit"}
                        </p>
                    ) : (
                        <input type="text"
                               placeholder="double click to save"
                               id="update-profile"
                               value={this.state.studies}
                               onDoubleClick={(e)=>{this.setState({}); this.handleInputDoubleclick()}}
                               onChange={(e)=>{this.setState({studies : e.target.value})}}/>
                    )}
                    
                    <hr />
                    <p className='bold allcaps'>Occupation</p>
                    {this.state.showInput ? (
                        <p className='edit-hover'
                           onDoubleClick={this.handleInputDoubleclick}>
                            {this.state.occupation ? this.state.occupation : "Not given - double click to edit"}
                        </p>
                    ) : (
                        <div>    
                        <input type="text"
                               id="update-profile"
                               placeholder="double click to save"
                               value={this.state.occupation}
                               onDoubleClick={(e)=>{this.setState({}); this.handleInputDoubleclick()}}
                               onChange={(e)=>{this.setState({occupation : e.target.value})}}/>
                        <button>delete</button>
                        
                        </div>
                    )}
                    <hr />
                    <p className='bold allcaps'>Work experience</p>
                    {this.state.showInput ? (
                        <p className='edit-hover'
                           onDoubleClick={this.handleInputDoubleclick}>
                            {this.state.workExperience ? this.state.workExperience : "Not given - double click to edit"}
                        </p>
                    ) : (
                        <input type="text"
                               id="update-profile"
                               placeholder="double click to save"
                               value={this.state.workExperience}
                               onDoubleClick={(e)=>{this.setState({}); this.handleInputDoubleclick()}}
                               onChange={(e)=>{this.setState({workExperience : e.target.value})}}/>
                    )}
                </div>
                <hr />
                    <p className="bold allcaps">A few words about me</p>
                    <br />
                    {this.state.showInput ? (
                        <p className='edit-hover'
                           onDoubleClick={this.handleInputDoubleclick}>
                            {this.state.aboutMe ? this.state.aboutMe : "Not given - double click to edit"}
                        </p>
                    ) : (
                        <input type="text"
                               id="update-profile"
                               placeholder="double click to save"
                               value={this.state.aboutMe}
                               onDoubleClick={(e)=>{this.setState({}); this.handleInputDoubleclick()}}
                               onChange={(e)=>{this.setState({aboutMe : e.target.value})}}/>
                    )}
                <hr />
                    <div className="projects-container">
                        {this.state.projects}
                        <Link className="project" id="create-project" to='/project'>
                        </Link>
                    </div>
            </div>
            {/* <Footer/> */}
            <Footer></Footer>
        </div>
        )
    }
}


export default withRouter(Profile);