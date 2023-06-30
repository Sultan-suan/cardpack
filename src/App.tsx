import React from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import './App.css';
import {Layout} from "./components/Layout/Layout";
import Login from "./components/login/Login";
import {Register} from "./components/registration/Register";
import {Auth} from "./components/Auth/Auth";

export function App() {

    //authMe
    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route path={'/auth'} element={<Auth/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                </Route>
            </Routes>
        </div>
    );
}


