import arrowRight from '../../../../assets/createProject/arrowRight.png'
import arrowUp from '../../../../assets/createProject/arrowUp.png'
import { ChangeEvent, useEffect, useState } from 'react';
import { updateData, handleFileInputChange } from '../../AddProject/ProjectDataHandler';

export interface ProjectContent {
    title: string;
    description: string;
}

function ProjectUploaderBig(props: {id: any}){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [displayUploaderCaption, setDisplayUploaderCaption] = useState<string | null>(null);
    const [previewImageStyleState, setPreviewImageStylesState] = useState<string | null>(null);
    const userid = localStorage.getItem('userid')
    const uploaderCaptionStyle = {
        display: `${displayUploaderCaption}`
    }
    const previewImageStyle = {
        display: `${previewImageStyleState}`
    }

    const handleImageTitleUpdate = () => {
        updateData( props.id, description, title)
    }
    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value)
        handleImageTitleUpdate()

        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
        handleImageTitleUpdate()
        // setTitleValue(event.target.value)
    }

    function handleImageChange(id: number, event: React.ChangeEvent<HTMLInputElement>) {
        handleFileInputChange(id, event)
        if(event.target.files){
            const file = event.target.files[0];
            const url = URL.createObjectURL(file);
            setImageUrl(url);
            setDisplayUploaderCaption("none")
            setPreviewImageStylesState("block")
        }
        
      }
    
      
    return(
        <div>
            <div className="create-project-layout">
                <div>
                    <p id="about-artwork">A few words <br /> about this artwork</p>
                    <textarea onChange={handleTextareaChange}
                              placeholder="Enter text here"
                              maxLength={600}/>
                </div>
                <div>
                    <img src={arrowRight} alt="" id="about-arrow-right"/>
                </div>
                <div className="upload-file-container">
                    <img style={previewImageStyle} src={imageUrl!} alt="" />
                    <input type="file"  accept="image/png, image/jpeg" onChange={(event) => handleImageChange(props.id, event)}/>
                    <p className="allcaps" style={uploaderCaptionStyle}>Click to upload image</p>
                </div>
            </div>
            <div className="create-project-layout">
                <div></div>
                <div></div>
                <div className="set-artwork-title-container">
                    <img src={arrowUp} alt="" />
                    <input type="text"
                           placeholder="Title of this artwork"
                           onChange={handleTitleChange} />
                </div>
            </div>
        </div>
    )
}

export default ProjectUploaderBig;