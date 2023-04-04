import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Project from './Project';
import { State } from './Profile';


class Main extends Component<{}, State>{

    render(){
        return(
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/project' element={<Project/>} />
            </Routes>
        )
    }
}
export default Main;