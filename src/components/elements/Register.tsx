// Module imports
import React, {Component} from 'react'
// Element imports
// Asset imports

interface State{
    selected : number
    firstNameInput : string
    lastNameInput : string
    emailInput : string
    passwordInput : string
    passwordAgainInput : string
    user : User[]
}

interface User{
    firstName : string
    lastName : string
    email : string
    password : string
  }

interface Props{

}
class Register extends Component<Props, State>{
    constructor(props: Props) {
    super(props);
    this.state = {
      selected : 0,
      firstNameInput : '',
      lastNameInput : '',
      emailInput : '',
      passwordInput : '',
      passwordAgainInput : '',
      user : []
        }
    }
    handleUpload = async () => {

        const { firstNameInput, lastNameInput, emailInput, passwordInput, passwordAgainInput } = this.state;
        if(firstNameInput.trim() === '' ||
           lastNameInput.trim()  === '' ||
           emailInput.trim()     === '' ||
           passwordInput.length   <   8 ||
           passwordAgainInput    !== passwordInput){
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
    
        let response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(adat),
        });
        console.log(JSON.stringify(adat))
    
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
                <form className='login-form centered' onSubmit={this.handleUpload}>
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
                        <input type="submit" value="Continue" />
                    </div>
                </form>
            </div>
        )
    }
}


export default Register;