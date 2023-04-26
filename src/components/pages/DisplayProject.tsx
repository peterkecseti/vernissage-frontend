import { useNavigate, useParams } from "react-router-dom";
import logoStatic from '../../assets/logo_static.png'
import arrowRight from '../../assets/createProject/arrowRight.png'
import arrowUp from '../../assets/createProject/arrowUp.png'
import { useEffect, useState } from "react";
import { getImages, getProfileDetails, getProjects } from "./AddProject/ProjectDataHandler";

async function loadProjects(){
}

function DisplayProject() {
    const { id } = useParams();
    const [userdata, setUserdata] = useState([] as any)
    const [projectData, setProjectData] = useState([] as any);
    const [projectTitle, setProjectTitle] = useState([] as any);
    const [projectLength, setProjectLength] = useState(0);
    const [imageData, setImageData] = useState([] as any);

    async function fetchData(){
        
      try {
        const projectData = await getProjects(parseInt(id!), "true");
        const imageData = await getImages(parseInt(id!), 2);
        setProjectData(JSON.parse(projectData.projectData));
        setProjectTitle(projectData.projectTitle);
        setProjectLength(JSON.parse(projectData.projectData).descriptions.length);
        setImageData(imageData);

        const userData = await getProfileDetails(projectData.userId)
        setUserdata(userData)
        console.log(userData)
      }
      catch(e){
        console.log(e)
      }
    }
    useEffect(() => {
        fetchData();
      }, [id]);
    
    function projectComponents(){
        let projects = []
        for(let i = 0; i < projectLength!; i++){
            projects.push(
                <>
                <div key={i} className="create-project-layout">
                    <div key={i + 1}>
                        <p id="about-artwork">A few words <br /> about this artwork</p>
                        <p id="about-artwork-content">{projectData.descriptions[i]}</p>
                    </div>
                    <div>
                        <img src={arrowRight} alt="" id="about-arrow-right"/>
                    </div>
                    <div>
                        {
                            imageData[i] ? <img src={imageData[i]} style={{width: '100%'}} alt="" placeholder="image" />
                                         : <div id="project-no-image-placeholder">
                                                <p className="">No image to show.</p>
                                           </div>

                        }
                         {/* kép */}
                    </div>
                </div>
                <div className="create-project-layout">
                    <div></div>
                    <div></div>
                    <div className="set-artwork-title-container">
                        <img src={arrowUp} alt="" />
                        <p id="">{projectData.titles[i]}</p>
                    </div>
                </div>
            </>
            )
        }
        return projects
    }

    return (
        <div className="">
            <div className="create-project-layout">
                <div> {/* first section */}
                    <p>back to profile</p>
                </div> {/* first section */}
                <div></div> {/* second section */}
                <div className="centered">{/* third section */}
                    <img src={logoStatic} alt="" id="logo-static" />
                    <h1 style={{marginTop: '20px'}}>{userdata.firstName} {userdata.lastName}</h1>
                    <hr />
                    <h1>{projectTitle}</h1>
                </div>
                <div>
                </div> {/* fourth section */}
            </div>
            {projectComponents()}
            
        </div>)
}

export default DisplayProject;