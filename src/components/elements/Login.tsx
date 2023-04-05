// Module imports
import React, {Component, FormEvent} from 'react'
import jwt_decode from 'jwt-decode'

interface State{
    email: string;
    password: string;
}
interface LoginProps{

}
class Login extends Component<LoginProps, State>{
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
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
        const userdata : any = jwt_decode(responseBody.token)
        
        localStorage.setItem('userid', userdata['id'])
        alert(localStorage.getItem('userid'))
        
        this.setState({
            email: '',
            password: '',
        })

        // this.props.onAuthTokenChange(responseBody.token);
    }

    render() {
        return(
            <div className="login-form-container">
                <form className='login-form centered' onSubmit={this.handleLogin}>
                    <input placeholder='Email' type="text" onChange={(e) => this.setState({ email: e.target.value })}/>
                    <br />
                    <input placeholder='Password' type="password" onChange={(e) => this.setState({ password: e.target.value })}/>
                    <br />
                    <input type="submit" value="Continue" />
                </form>
            </div>
        )
    }
}


export default Login;