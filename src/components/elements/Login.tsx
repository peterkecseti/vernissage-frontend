// Module imports
import React, {Component, FormEvent} from 'react'
import jwt_decode from 'jwt-decode'
import withRouter from '../withRouter';
import { NavigateFunction } from 'react-router-dom';


interface State{
    email: string;
    password: string;
    responseMessage: string;
}
export interface LoginProps{
    responseMessage: string;
}

interface LoginComponentProps {
    onChildProps: (childProps: LoginProps) => void;
    navigate: NavigateFunction;
  }

class Login extends Component<LoginComponentProps, State>{
    constructor(props: LoginComponentProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            responseMessage: ''
        }
    }

    handleLogin = async (e: FormEvent) => {
        
        localStorage.clear()
        e.preventDefault();
        const loginData = {
            'email': this.state.email,
            'password': this.state.password,
        };
  
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(loginData),
        });
        
        const responseBody = await response.json();
        if(!responseBody.token){
            // this.setState({loginMessage: "Invalid email or password"})
            this.setState({responseMessage: 'Invalid email or password'})
            const {responseMessage} = this.state
            this.props.onChildProps({responseMessage})
            return
        }
        const userdata : any = jwt_decode(responseBody.token)
        
        localStorage.setItem('userid', userdata['id'])
        
        this.setState({
            email: '',
            password: '',
        })
        this.props.navigate("/profile")
    }

    render() {
        return(
            <div className="login-form-container">
                <form className='login-form centered' onSubmit={this.handleLogin}>
                    <input placeholder='Email' type="text" onChange={(e) => this.setState({ email: e.target.value })}/>
                    <br />
                    <input placeholder='Password' type="password" onChange={(e) => this.setState({ password: e.target.value })}/>
                    <br />
                    <div className="submit-button-container centered">
                        <input type="submit" value="Continue" />
                    </div>
                </form>
            </div>
        )
    }
}


export default withRouter(Login);