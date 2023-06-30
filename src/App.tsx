import React, {useEffect} from 'react';
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import './App.css';
import {Layout} from "./components/Layout/Layout";
import Login from "./components/login/Login";
import {Register} from "./components/registration/Register";
import {Auth} from "./components/Auth/Auth";
import {authMeTC} from "./state/auth-reducer";
import {useDispatch, useSelector} from "react-redux";

export function App() {

    //authMe

    const isAuth = useSelector<any>(state => state.auth.isAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()

    useEffect(() => {
        // if(!isAuth) {
            dispatch(authMeTC(navigate))
        // }
    }, [])


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


