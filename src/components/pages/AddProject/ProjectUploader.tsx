import logoStatic from '../../assets/logo_static.png'
import arrowRight from '../../../assets/createProject/arrowRight.png'
import arrowUp from '../../../assets/createProject/arrowUp.png'
import TextArea from './TextArea';
export interface ProjectContent {
    title: string;
    description: string;
}

function ProjectUploader(props: any){

    return(
        <div>
            <div className="create-project-layout">
            <div> {/* first section */}
            </div>

                <div></div> {/* second section */}
                <div className="centered ">{/* third section */}
                </div>
                <div></div> {/* fourth section */}
            </div>

            <div className="create-project-layout">
                <div>
                    <p id="about-artwork">A few works <br /> about this artwork</p>
                    <TextArea/>
                </div>
                <div>
                    <img src={arrowRight} alt="" id="about-arrow-right" />
                </div>
                <div className="upload-file-container">
                    <input type="file" />
                    <p className="allcaps">Click to upload image</p>
                </div>
            </div>
            <div className="create-project-layout">
                <div></div>
                <div></div>
                <div className="set-artwork-title-container">
                    <img src={arrowUp} alt="" />
                    <input type="text" placeholder="Title of this artwork" />
                </div>
            </div>
        </div>
    )
}

export default ProjectUploader;