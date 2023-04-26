import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Project from './Project';
import ProfileOthers from './ProfileOthers';
import DisplayProject from './DisplayProject';

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
                <Route path={`/display-project/:id`} element={<DisplayProject/>} />
            </Routes>
        )
    }
}
export default Main;