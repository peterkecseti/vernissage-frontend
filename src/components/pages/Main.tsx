import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Project from './Project';
import ProfileOthers from './ProfileOthers';

interface State{

}

interface Props{
    othersProfileId: number
}
class Main extends Component<Props, {}>{
    constructor(props: Props) {
        super(props);
    }
    render(){
        
        return(
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/project' element={<Project/>} />
                <Route path={`/profile/:id`} element={<ProfileOthers/>} />
            </Routes>
        )
    }
}
export default Main;