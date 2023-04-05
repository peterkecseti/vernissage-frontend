// Module imports
import React, {Component, useState} from 'react'
// Element imports
import Footer from '../elements/Footer'
import UploadImage from './AddProject/UploadFile'
// Asset imports
import logoStatic from '../../assets/logo_static.png'
import arrowUp from '../../assets/createProject/arrowUp.png'

interface State{
    artsCount : number
}
interface Props{

}


class Project extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            artsCount : 1
        }
    }
    componentDidMount(): void {

    }
    addNewArt = () => {
            return(<div className="project-container">
            <div className='grow-wrap'>
                <textarea style={{float: "right"}} name="" maxLength={600} placeholder='Add description'></textarea>
            </div>
            <div>
                <UploadImage uploadType='upload' projectNumber={0} imageNumber={0}/>
                <input id="set-artwork-title" type="text" placeholder='Title of this artwork' />
                <img id="set-artwork-title" src={arrowUp} />
            </div>
            <div>
                <textarea style={{float: "left"}} name="" maxLength={600} placeholder='Add description'></textarea>
            </div>
        </div>);
    }
    handleTextareaChange = (e: any) => {
    }

    render() {
        return(
        <div>
            <div className='project-container'>
                <div>
                    <div className="add-cover-image">

                    </div>
                </div>
                <div>
                    <div>
                        <div className='centered'>
                            <img src={logoStatic} id="logo-static"/>
                        </div>
                        <h1 className='centered'></h1>
                        <hr />
                        <div className="centered">
                            <input type="text" placeholder='Project title'/>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>3</h1>
                </div>
            </div>
            <this.addNewArt/>
        </div>
        )
    }
}


export default Project;