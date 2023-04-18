
import logoStatic from '../../assets/logo_static.png'
import { useState } from "react";
import ProjectUploader from "./AddProject/ProjectUploader";

function AddProject() {
    const [count, setCount] = useState(1);
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
                <div>
                </div> {/* fourth section */}
            </div>
            {[...Array(count)].map((_, i) => (
                <ProjectUploader key={i} id={i} />
            ))}
            <div id="add-button-container">
                <div onClick={addArt} id="add-art-button"></div>
            </div>
    </div>;
  }

export default AddProject;