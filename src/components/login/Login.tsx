import React, {ChangeEvent, FormEvent, useState} from 'react';
import s from './Login.module.css'
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../state/auth-reducer";
import {Link} from "react-router-dom";
import axios from 'axios';


const Login = () => {
    // const auth = useSelector<any>(state => state.login)
    // let dispatch = useDispatch<any>()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(email, password, rememberMe)
        axios.post("https://cards-nya-back-production.up.railway.app/2.0/auth/login", {email, password, rememberMe})
            .then(res => {
                console.log(res.data)
            })
        // dispatch(loginTC)
    }

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

      const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return (
        <div className={s.wrapper}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className={s.form}>
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
                           onChange={(e) => {setRememberMe(!rememberMe)}}/>
                    <div>remember me</div>
                </div>
                <button type={"submit"}>Login</button>
                <Link to={'/register'}>Create Account</Link>
            </form>
        </div>
    );
};

export default Login;