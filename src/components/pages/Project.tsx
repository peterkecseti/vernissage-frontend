
import logoStatic from '../../assets/logo_static.png'
import { useEffect, useRef, useState } from "react";
import ProjectUploader from "./AddProject/ProjectUploader";
import { handleProjectTitleChange } from './AddProject/ProjectDataHandler';
import { useNavigate } from 'react-router-dom';
// import { getName } from './AddProject/ProjectDataHandler';

function AddProject() {

    const bottom = useRef<HTMLDivElement>(null)
    const [count, setCount] = useState(1);
    const addArt = () => {
        setCount(count + 1);
        if(bottom.current){
            console.log(bottom.current.scrollHeight)
            bottom.current.scrollIntoView({behavior: 'smooth'})
        }
      };
      useEffect(() => {
        const supportsSmoothScroll = 'scrollBehavior' in document.documentElement.style;
        if (supportsSmoothScroll) {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        } else {
          window.scrollTo(0, document.body.scrollHeight);
        }
      });
    // const userdata = getName(localStorage.getItem('userid')!)
    const userdata = JSON.parse(localStorage.getItem('userdata')!)
    

    return <div>
            <div className="create-project-layout">
                <div> {/* first section */}
                    <div className="set-artwork-cover">
                        <input type="file" />
                    </div>
                </div> {/* first section */}
                <div></div> {/* second section */}
                <div className="centered">{/* third section */}
                    <img src={logoStatic} alt="" id="logo-static" />
                    <h1 style={{marginTop: '20px'}}>{userdata.firstName} {userdata.lastName}</h1>
                    <hr />
                    <input type="text" id="project-biginput" placeholder='Project title' onChange={(e) => {handleProjectTitleChange(e)}} />
                </div>
                <div>
                </div> {/* fourth section */}
            </div>
            {[...Array(count)].map((_, i) => (
                <ProjectUploader key={i} id={i} />
            ))}
            <div id="add-art-button" ref={bottom} onClick={addArt} />
    </div>;
  }

export default AddProject;