import logoStatic from '../../assets/logo_static.png'
import arrowRight from '../../../assets/createProject/arrowRight.png'
import arrowUp from '../../../assets/createProject/arrowUp.png'
import { useEffect, useState } from 'react';
import { updateData } from './ProjectDataHandler';
export interface ProjectContent {
    title: string;
    description: string;
}

function ProjectUploader(props: {id: any}){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [descriptionValue, setDescriptionValue] = useState<string>('');
    const [titleValue, setTitleValue] = useState<string>('');
    const handleDataUpdate = () => {
        updateData( props.id, description, title)
    }
    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value)
        handleDataUpdate()

        setDescriptionValue(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
        handleDataUpdate()
        setTitleValue(event.target.value)
    }

    return(
        <div>
            <div className="create-project-layout">
                <div>
                    <p id="about-artwork">A few words <br /> about this artwork</p>
                    <textarea onChange={handleTextareaChange}
                              placeholder="Enter text here"
                              maxLength={600}
                              value={descriptionValue}/>
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
                    <input type="text"
                           placeholder="Title of this artwork"
                           value={titleValue}
                           onChange={handleTitleChange} />
                </div>
            </div>
        </div>
    )
}

export default ProjectUploader;