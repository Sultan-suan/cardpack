import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import s from './Login.module.css'
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../state/auth-reducer";
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
    const isAuth = useSelector<any>(state => state.auth.isAuth)
    const [email, setEmail] = useState('nya-admin@nya.nya')
    const [password, setPassword] = useState('1qazxcvBG')
    const [rememberMe, setRememberMe] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch<any>();

    const login = () => {
        dispatch(loginTC(email, password, rememberMe))
    }

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [isAuth])

    return (
        <div className={s.wrapper}>
            <h1>Login</h1>
            <div className={s.form}>
                <div>
                    <div>
                        <label>login</label>
                        <input type="text"
                               value={email}
                               onChange={onChangeEmail}/>
                    </div>
                    <div>
                        <label>password</label>
                        <input type="password"
                               value={password}
                               onChange={onChangePassword}/>
                    </div>
                </div>
                <div>
                    <input type="checkbox"
                           onChange={(e) => {
                               setRememberMe(!rememberMe)
                           }}/>
                    <div>remember me</div>
                </div>
                <button onClick={login}>Login</button>
                <Link to={'/register'}>Create Account</Link>
            </div>
        </div>
    );
};

export default Login;