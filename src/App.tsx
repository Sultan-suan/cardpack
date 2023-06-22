import React from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import './App.css';
import {Layout} from "./components/Layout/Layout";
import Login from "./components/login/Login";
import {Register} from "./components/registration/Register";

export function App() {
    //DAL
    //UI
    //Sultan
    //authMe
    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route path={'/'} element={<div>user logged</div>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                </Route>
            </Routes>
        </div>
    );
}


