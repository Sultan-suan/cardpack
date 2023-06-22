import React, {ChangeEvent, ChangeEventHandler, useState} from 'react';
import s from './Register.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


type validation = {
    email: string,
    password: string,
    error: Error

}
export const Register = () => {
    //no useState
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const emailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value)
    }

    const passwordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
    }

    // redux => registration reducer
    // thunk
    // navigate to login

    //ui
    //redux



    const register = () => {
        const response = axios.post("https://cards-nya-back-production.up.railway.app/2.0/auth/register",
            {
                email,
                password
            })
    }

    return (
        <div className={s.wrapper}>
            <div>
                <h4>Register</h4>
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={emailChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={passwordChange}
                    required
                />
            </div>
            <button onClick={register} className={s.button}>Register now</button>
        </div>
    );
};

