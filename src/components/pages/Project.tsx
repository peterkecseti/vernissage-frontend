
import logoStatic from '../../assets/logo_static.png'
import { useRef, useState } from "react";
import ProjectUploader from "./AddProject/ProjectUploader";
import { handleProjectTitleChange } from './AddProject/ProjectDataHandler';
import { useNavigate } from 'react-router-dom';
// import { getName } from './AddProject/ProjectDataHandler';

function AddProject() {

    const bottom = useRef<HTMLDivElement>(null)
    const [count, setCount] = useState(1);
    const addArt = () => {
        setCount(count + 1);
      };

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
            <div id="add-art-button" onClick={addArt} />
    </div>;
  }

export default AddProject;