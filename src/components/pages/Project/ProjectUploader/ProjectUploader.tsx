import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import logoStatic from "../../assets/logo_static.png";
import arrowRight from "../../assets/createProject/arrowRight.png";
import arrowUp from "../../assets/createProject/arrowUp.png";
import arrowLeft from "../../assets/createProject/arrowLeft.png";
import { useEffect, useRef, useState } from "react";
import GetScreenSize from "../../../../GetScreenSize";
import AddProjectBig from "./Big";
import ProjectUploaderBig from "./Big";
import ProjectUploaderMobile from "./Mobile";

function ProjectUploader(props: { id: any }) {
  const [screenSize, setScreenSize] = useState(GetScreenSize);
  useEffect(() => {
    console.log("screen size:" + screenSize);
    window.addEventListener("resize", () => {
      setScreenSize(GetScreenSize);
    });
  }, []);
  switch (screenSize) {
    case 0:
      return <ProjectUploaderMobile id={props.id} />;
    case 1:
      return <ProjectUploaderBig id={props.id} />;
    case 2:
      return <ProjectUploaderBig id={props.id} />;
  }
  return <ProjectUploaderBig id={props.id} />;
}

export default ProjectUploader;
