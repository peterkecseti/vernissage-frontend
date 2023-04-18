import { useParams } from "react-router-dom";
import logoStatic from '../../assets/logo_static.png'
import arrowRight from '../../assets/createProject/arrowRight.png'
import arrowUp from '../../assets/createProject/arrowUp.png'
import { useEffect, useState } from "react";
import ProjectUploader from "./AddProject/ProjectUploader";

function AddProject() {
    const [projectContent, setProjectContent] = useState([] as any)
    const [count, setCount] = useState(0);
    const addArt = () => {
        setCount(count + 1);
      };

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
                    <h1 style={{marginTop: '20px'}}>Artist Name</h1>
                    <hr />
                    <input type="text" id="project-biginput" />
                </div>
                <div></div> {/* fourth section */}
            </div>
            {[...Array(count)].map((_, i) => (
                <ProjectUploader key={i} />
            ))}

            <button onClick={addArt}>Add art</button>
    </div>;
  }

export default AddProject;