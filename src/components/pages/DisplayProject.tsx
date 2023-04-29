import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from 'jwt-decode'
import logoStatic from '../../assets/logo_static.png'
import arrowRight from '../../assets/createProject/arrowRight.png'
import arrowUp from '../../assets/createProject/arrowUp.png'
import arrowLeft from '../../assets/createProject/arrowLeft.png'
import { useEffect, useRef, useState } from "react";
import { getImages, getProfileDetails, getProjects } from "./AddProject/ProjectDataHandler";
import GetScreenSize from "../../GetScreenSize";
import DisplayProjectBig from "./DisplayProject/Big";
import DisplayProjectMobile from "./DisplayProject/Mobile";
import DisplayProjectTablet from "./DisplayProject/Tablet";
import DisplayProjectSmallDesktop from "./DisplayProject/SmallDesktop";



function DisplayProject() {
    const [screenSize, setScreenSize] = useState(GetScreenSize)
    useEffect(()=>{
        window.addEventListener('resize', ()=>{setScreenSize(GetScreenSize)})
    }, [])
    switch(screenSize){
        case 0: return <DisplayProjectMobile/>
        case 1: return <DisplayProjectTablet/>
        case 2: return <DisplayProjectTablet/>
    }
    return <DisplayProjectBig/>
}

export default DisplayProject;