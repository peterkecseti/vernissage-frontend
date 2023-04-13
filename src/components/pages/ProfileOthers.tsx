import { useParams } from "react-router-dom";
import logoStatic from '../../assets/logo_static.png'
import { useEffect, useState } from "react";

function ProfileOthers() {
    const [data, setData] = useState({} as any);
    const [projectsList, setProjectsList] = useState([] as any);
    const [roundedBottom, setRoundedBottom] = useState(0);
    const { id } = useParams();
  
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
      if (data) {
        loadProjects();
      }
    }, [data]);
  
    async function loadProjects() {
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
            className={`project ${
              i === 0 ? "rounded-top-left" : ""
            } ${i === 2 ? "rounded-top-right" : ""} ${
              i === data?.roundedBottom ? "rounded-bottom-left" : ""
            }`}
            key={i}
          >
            {i}
          </div>
        );
      }
      await setProjectsList(projectsList);
    }

    return <div className="container centered profile-text">
        <img src={logoStatic} alt="Profile picture" id="logo-static"/>
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