// Module imports
import React, {Component, FormEvent} from 'react'
import jwt_decode from 'jwt-decode'

interface State{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token: any;
}
interface LoginProps{

}
class Login extends Component<LoginProps, State>{
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            token: ''
        }
    }

    handleLogin = async (e: FormEvent) => {
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
        this.setState({token: responseBody.token})
        const userdata : any = jwt_decode(this.state.token)
        const toLocalStorage = {
            firstName: userdata['firstName'],
            lastName: userdata['lastName'],
            email: userdata['email'],
            studies: userdata['studies'],
            occupation: userdata['occupation'],
            workExperience: userdata['workExperience'],
            aboutMe: userdata['aboutMe'],
            projectsCount: userdata['projectsCount']
        }
        
        /* ezt még fel kell rakni localstorageba */
        localStorage.setItem('userdataJson', JSON.stringify(toLocalStorage))

        this.setState({
            firstName: userdata['firstName'],
            lastName : userdata['lastName'],
            email: userdata['email']
        })
        
        localStorage.setItem('authToken', responseBody.token);
        this.setState({
            email: '',
            password: '',
        })
        window.alert(localStorage.getItem('authToken'))
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