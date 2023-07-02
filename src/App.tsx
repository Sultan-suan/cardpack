import React from 'react';
import {Routes, Route} from 'react-router-dom'
import './App.css';
import Login from "./components/login/Login";
import {Register} from "./components/registration/Register";
import {Main} from "./components/Auth/Main";


export function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<Main/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
            </Routes>
        </div>
    );
}


