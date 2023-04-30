import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import logoStatic from "../../../assets/logo_static.png";
import arrowRight from "../../../assets/createProject/arrowRight.png";
import arrowUp from "../../../assets/createProject/arrowUp.png";
import arrowLeft from "../../../assets/createProject/arrowLeft.png";
import arrowDown from "../../../assets/createProject/arrowDown.png";
import { useEffect, useRef, useState } from "react";
import {
  getImages,
  getProfileDetails,
  getProjects,
} from "../AddProject/ProjectDataHandler";
import GetScreenSize from "../../../GetScreenSize";
import Footer from "../../elements/Footer";

function DisplayProjectMobile() {
  const { id } = useParams();
  const [userdata, setUserdata] = useState([] as any);
  const [projectData, setProjectData] = useState([] as any);
  const [projectTitle, setProjectTitle] = useState([] as any);
  const [projectLength, setProjectLength] = useState(0);
  const [projectOwnerId, setProjectOwnerId] = useState(0);
  const [imageData, setImageData] = useState([] as any);

  const navigate = useNavigate();

  async function fetchData() {
    try {
      const projectData = await getProjects(parseInt(id!), "true");
      const imageData = await getImages(parseInt(id!), 2);
      setProjectData(JSON.parse(projectData.projectData));
      setProjectTitle(projectData.projectTitle);
      setProjectOwnerId(projectData.userId);
      setProjectLength(JSON.parse(projectData.projectData).descriptions.length);
      setImageData(imageData);

      const userData = await getProfileDetails(projectData.userId);
      setUserdata(userData);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchData();
  }, [id]);
  function handleToggleFullscreen(index: number) {
    alert(index);
  }
  function projectComponents() {
    let projects = [];
    for (let i = 0; i < projectLength!; i++) {
      projects.push(
        <>
          <div key={i} className="create-project-layout">
            <div className="title-container">
              <img src={arrowDown} id="arrow-down" alt="" />
              <p>{projectData.titles[i]}</p>
            </div>
            <div>
              {imageData[i] ? (
                <img
                  onClick={() => {
                    handleToggleFullscreen(i);
                  }}
                  src={imageData[i]}
                  style={{ width: "100%" }}
                  alt=""
                  placeholder="image"
                />
              ) : (
                <div id="project-no-image-placeholder">
                  <p className="">No image to show.</p>
                </div>
              )}
            </div>
            <div className="about-artwork-container">
              <img src={arrowUp} id="arrow-down" alt="" />
              <p id="about-artwork-content">
                a few words <br />
                about this artwork
              </p>
            </div>
            <hr />
            <p id="description-content">{projectData.descriptions[i]}</p>
          </div>
        </>
      );
    }
    return projects;
  }
  function handleBackToProfile() {
    if (localStorage.getItem("token")) {
      navigate(`/profile`);
      return;
    }
    navigate(`/profile/${projectOwnerId}`);
  }
  return (
    <>
      <div style={{ margin: "5px" }}>
        <div className="background" />
        <div className="art-container">
          <div className="centered">
            <img src={logoStatic} id="logo-static" alt="" />
            <h1>
              {userdata.firstName} {userdata.lastName}
            </h1>
            <hr />
            <h1>{projectTitle}</h1>
          </div>
          {projectComponents()}
        </div>
      </div>
      <div style={{ marginBottom: "30px" }} />
    </>
  );
}

export default DisplayProjectMobile;
