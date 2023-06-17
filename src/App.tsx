import React from 'react';
import logo from './logo.svg';
import {Routes, Route, Link} from 'react-router-dom'
import './App.css';
import {Layout} from "./components/Layout/Layout";
import Login from "./components/login/Login";
import Register from "./components/registration/Register";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
