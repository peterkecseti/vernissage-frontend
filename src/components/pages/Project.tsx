
import logoStatic from '../../assets/logo_static.png'
import { useEffect, useRef, useState } from "react";
import ProjectUploader from "./AddProject/ProjectUploader";
import { handleProjectTitleChange, uploadProject, handleCoverImage } from './AddProject/ProjectDataHandler';
import { useNavigate } from 'react-router-dom';
import Footer from '../elements/Footer';
// import { getName } from './AddProject/ProjectDataHandler';

function AddProject() {
  const userid = localStorage.getItem('userid')
  const userdata = JSON.parse(localStorage.getItem('userdata')!)
  const bottom = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(1);
  const [previewCoverImage, setPreviewCoverImage] = useState<string | null>(null);
  const [previewCoverImageCaption, setPreviewCoverImageCaption] = useState<string | null>("Click to upload cover image");
  const naviagte = useNavigate()
  const addArt = () => {
        setCount(count + 1);
        if(bottom.current){
            console.log(bottom.current.scrollHeight)
            bottom.current.scrollIntoView({behavior: 'smooth'})
        }
      };
    useEffect(() => {
      const supportsSmoothScroll = 'scrollBehavior' in document.documentElement.style;
      if(supportsSmoothScroll) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
        } else {
        window.scrollTo(0, document.body.scrollHeight);
      }
    });

    function handleCoverImageChange(event : React.ChangeEvent<HTMLInputElement>){
      if(event.target.files){
        handleCoverImage(event)
        const url = URL.createObjectURL(event.target.files[0])
        setPreviewCoverImage(url)
        setPreviewCoverImageCaption("")
      }
    }

    async function uploadProjectHandler(){
      if(userid && userdata){
          var message = await uploadProject(userid, parseInt(userdata.projectsCount))
          if(message?.status == "OK"){
            naviagte("/profile")
          }
        }
    }

    return <div>
      <button onClick={uploadProjectHandler}>save</button>
            <div className="create-project-layout">
                <div> {/* first section */}
                    <div className="set-artwork-cover" style={{backgroundImage: `url(${previewCoverImage})`}}>
                        <p className='allcaps'>{previewCoverImageCaption}</p>
                        <input type="file" onChange={(event) => handleCoverImageChange(event)}/>
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
            <Footer></Footer>
    </div>;
  }

export default AddProject;