// Module imports
import React, {Component} from 'react'
// Element imports
// Asset imports

interface State{
    selected : number
}
interface Props{

}
class Search extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            selected : 0
        }
    }
    render() {
        return(
            <div className="login-form-container">
                <form className='login-form centered'>
                    <input placeholder='Type artist name here' type="text"/>
                    <br />
                    <div className="submit-button-container centered">
                        <input type="submit" value="Continue" />
                    </div>
                </form>
            </div>
        )
    }
}


export default Search;