// Module imports
import React, {Component} from 'react'
import { address } from '../../backed.url'
// Element imports
// Asset imports

interface State{
    selected : number
    firstNameInput : string
    lastNameInput : string
    emailInput : string
    passwordInput : string
    passwordAgainInput : string
    user : User[],
    responseMessage: string
}

interface User{
    firstName : string
    lastName : string
    email : string
    password : string
  }
export interface RegisterProps{
  responseMessage: string
}

export interface RegisterComponentProps {
  onChildProps: (childProps: { responseMessage: string }) => void;
}
class Register extends Component<RegisterComponentProps, State>{
    constructor(props: RegisterComponentProps) {
    super(props);
    this.state = {
      selected : 0,
      firstNameInput : '',
      lastNameInput : '',
      emailInput : '',
      passwordInput : '',
      passwordAgainInput : '',
      user : [],
      responseMessage: ''
        }
    }
    handleUpload = async () => {
        this.props.onChildProps({ responseMessage: "Registration in progress" });
        const { firstNameInput, lastNameInput, emailInput, passwordInput, passwordAgainInput } = this.state;
        if(firstNameInput.trim() === ''  ||
            lastNameInput.trim()  === '' ||
            emailInput.trim()     === '' ||
            passwordInput.length   <   8 ||
            passwordAgainInput    !== passwordInput){
            this.props.onChildProps({ responseMessage: "Register form must be filled correctly" });
          // this.setState()- tel hibaüzenet megjelenítése
          return;
        }
    
        const adat = {
          firstName : firstNameInput,
          lastName : lastNameInput,
          email : emailInput,
          password : passwordInput,
          passwordAgain : passwordAgainInput
        }
    
        let response = await fetch(`http://${address}:3000/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(adat),
        });
        this.props.onChildProps({ responseMessage: "Registration successful, please log in" });
        this.setState({ 
          firstNameInput : '',
          lastNameInput : '',
          emailInput : '',
          passwordInput : '',
          passwordAgainInput : ''
        })

        
      };

    render() {
        return(
            <div className="login-form-container">
                <div className='login-form centered' onSubmit={this.handleUpload}>
                      <input placeholder='Email' type="text" onChange={e=> this.setState({ emailInput: e.currentTarget.value})}/>
                    <br />
                      <input placeholder='First name' className='input-half' type="text" onChange={e=> this.setState({ firstNameInput: e.currentTarget.value})}/>
                      <input placeholder='Last name' className='input-half' type="text" onChange={e=> this.setState({ lastNameInput: e.currentTarget.value})}/>
                    <br />
                      <input placeholder='Password' type="password"  onChange={e=> this.setState({ passwordInput: e.currentTarget.value})}/>
                    <br />
                      <input placeholder='Password again' type="password" onChange={e=> this.setState({ passwordAgainInput: e.currentTarget.value})}/>
                    <br />
                    <div className="submit-button-container centered">
                      <button className="submit-button" onClick={this.handleUpload}>Continue</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default Register;