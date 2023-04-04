import { ChangeEvent, Component } from "react";
import jwt_decode from 'jwt-decode'

interface IState {
    file: FileList;
}

interface Props{
    uploadType: string;
    projectCount: number;
}


class UploadImage extends Component<Props, IState>{
    handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({file : e.target.files!})
        console.log(this.props.projectCount)
    }
    
    handleUploadClick = () => {
        if(!this.state.file){
            return;
        }
        
        var re = /(?:\.([^.]+))?$/;
        const jwt : any = localStorage.getItem('authToken')
        const jwt_decoded : any = jwt_decode(jwt)
        const data = new FormData();
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        let fileName = JSON.stringify(jwt_decoded['id'])
        const ext = re.exec(this.state.file[0].name)![1]
        data.append('file', this.state.file[0], `${fileName}-${uniqueSuffix}.${ext}`)
        fetch(`http://localhost:3000/${this.props.uploadType}`, {
            method: 'POST',
            body: data
        })
    }

    render() {
        return(
            <div className="upload-file-container">
                <input type="file" id='imgUpload'
                       accept="image/png, image/jpg, image/gif, image/jpeg"
                       onChange={e => {this.handleFileChange(e)}}/>
                            <p className="allcaps bold">Click to add picture</p>
            </div>
        )
    }
}


export default UploadImage;