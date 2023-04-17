// Module imports
import React, {Component} from 'react'
import { NavigateFunction } from 'react-router-dom'
import withRouter from '../withRouter';
// Element imports
// Asset imports

interface State{
    selected : number,
    searchFieldValue: string,
    searchMessage: string,
    foundUsers: FoundUser[],
    roundedBottom: number,
    usersHTML: any[]
}
interface Props{
    navigate: NavigateFunction;
}

interface FoundUser{
    id: number;
    firstName: string;
    lastName: string;
}
class Search extends React.Component<Props, State, FoundUser>{
    constructor(props: Props) {
        super(props);
        this.state = {
            selected : 0,
            searchFieldValue: '',
            searchMessage: '',
            foundUsers: [],
            roundedBottom: 0,
            usersHTML: []
        }
    }
    handleSearch = async () => {
        this.setState({ searchMessage: 'Searching...' });
    
        if (this.state.searchFieldValue === '') {
          this.setState({ searchMessage: 'Search field must not be empty' });
          return;
        }
    
        const requestData = { searchTerm: this.state.searchFieldValue };
        const response = await fetch('http://localhost:3000/searchUsers', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
    
        const responseBody = await response.json();
        if (!responseBody) {
          this.setState({ searchMessage: 'Search failed' });
          return;
        }
    
        this.setState({ foundUsers: responseBody });
        this.setState({ searchMessage: '' });
        console.log(this.state.foundUsers)
        this.loadFoundUsers()
      };

     loadFoundUsers = () => {
         const user = this.state.foundUsers
         var userList = []
         if(user.length == 1){
            this.props.navigate(`profile/${user[0].id}`)
         }
         
          for(let i = 0; i < user.length; i++){
              userList.push(
                  <div key={user[i].id}
                       className={`scrollbar-item ${i === user.length-1 ? 'last-scrollbar-item' : ''}
                                                  ${i === 0 ? 'first-scrollbar-item' : ''}`}
                       onClick={()=>{this.props.navigate(`/profile/${user[i].id}`)}}>
                      <p className='scrollbar-item-username'>
                         {user[i].firstName}
                     <br />
                         {user[i].lastName}
                      </p>
                  </div>
              )
          }
          this.setState({usersHTML: userList})
     }
    render() {
        return(
            <>
            <div className="login-form-container">
                <div className='login-form centered' onSubmit={this.handleSearch}>
                    <input placeholder='Type artist name here' type="text" onChange={(e) => this.setState({ searchFieldValue: e.target.value })}/>
                    <br />
                    <div className="submit-button-container centered">
                        <button className="submit-button" onClick={this.handleSearch}>Continue</button>
                    </div>
                    <p id="login-message">{this.state.searchMessage}</p>
                </div>
            </div>
            <div className="scrollbar-center">
                <div className="scrollbar-container">
                    {this.state.usersHTML}
                </div>
            </div>
            </>
        )
    }
}


export default withRouter(Search);