// Module imports
import React, {Component, FormEvent} from 'react'
import jwt_decode from 'jwt-decode'
import withRouter from '../withRouter';
import { NavigateFunction } from 'react-router-dom';


interface State{
    email: string;
    password: string;
    loginMessage: string;
}
interface LoginProps{
    navigate: NavigateFunction;
}

class Login extends Component<LoginProps, State>{
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loginMessage: ''
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
            this.setState({loginMessage: "Invalid email or password"})
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
                    <p id="login-message">{this.state.loginMessage}</p>
                </form>
            </div>
        )
    }
}


export default withRouter(Login);