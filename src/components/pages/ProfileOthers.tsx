import { useNavigate, useParams } from "react-router-dom";
import logoStatic from '../../assets/logo_static.png'
import { useEffect, useState } from "react";
import { getImages, getProjects } from "./AddProject/ProjectDataHandler";

function ProfileOthers() {
    const [data, setData] = useState({} as any);
    const [projectsList, setProjectsList] = useState([] as any);
    const [projectData, setProjectData] = useState([] as any);
    const [imageData, setImageData] = useState([] as any);
    const [roundedBottom, setRoundedBottom] = useState(0);
    const { id } = useParams();
    let navigate = useNavigate()
  
    const requestData = { userid: id };
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/getProfileDetails", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
        const responseJson = await response.json();
        setData(responseJson);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, [id]);
  
    useEffect(() => {
      if (data.projectsCount) {
        loadProjects();
        return
      }
      const err = []
      err.push(<div></div>)
      err.push(<h3 style={{textAlign: 'center'}}>No projects available to show.</h3>)
      setProjectsList(err)
    }, [data]);
  
    async function loadProjects() {

      try {
        const projectData = await getProjects(parseInt(id!));
        const imageData = await getImages(parseInt(id!));
        setProjectData(projectData);
        setImageData(imageData);
        console.log(imageData);
    
        let projectsList: any = [];
        if (data?.projectsCount % 3 === 2) {
          setRoundedBottom(roundedBottom - 2);
        }
        if (data?.projectsCount % 3 === 1) {
          setRoundedBottom(roundedBottom - 1);
        }
        for (let i = 0; i < data?.projectsCount; i++) {
          projectsList.push(
            <div
              className={`project
                ${i === 0 ? "rounded-top-left" : ""}
                ${i === 2 ? "rounded-top-right" : ""}
                ${i === data?.roundedBottom ? "rounded-bottom-left" : ""}`}
              key={i}
              style={{ backgroundImage: `url(${imageData[i]})`}}
              onClick={()=>{navigate(`/display-project/${projectData[i].projectId}`)}}
            >
              <p>{projectData[i].projectTitle}</p>
            </div>
          );
        }
        setProjectsList(projectsList);
        console.log(data.profilePicture);
      } catch (e) {
        console.log(e);
      }
    }

    return <div className="container centered profile-text">
        <img src={logoStatic} alt="logo" id="logo-static"/>
            <div className='profile-container'>
                <h1>{data?.firstName} {data?.lastName}</h1> {/* ! */}
                <hr />
                <div className="profile-picture-container" style={{backgroundImage: `url(${data?.profilePicture})`, backgroundSize: "cover"}}>
                </div>
                <div className="about-container">
                    <p className='bold allcaps'>Studies</p>
                        <p>
                            {data?.studies ? data?.studies : "Not given"}
                        </p>
                    <hr />
                    <p className='bold allcaps'>Occupation</p>
                        <p>
                            {data?.occupation ? data?.occupation : "Not given"}
                        </p>
                    <hr />
                    <p className='bold allcaps'>Work experience</p>
                        <p>
                            {data?.workExperience ? data?.workExperience : "Not given"}
                        </p>
                </div>
                <hr />
                    <p className="bold allcaps">A few words about me</p>
                    <br />
                        <p>
                            {data?.aboutMe ? data?.aboutMe : "Not given"}
                        </p>
                <hr />
                    <div className="projects-container">
                        {projectsList}
                    </div>
            </div>
    </div>;
  }

export default ProfileOthers;