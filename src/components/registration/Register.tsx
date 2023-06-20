import React, {useState} from 'react';
import s from './Register.module.css'
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';


type validation = {
    email: string,
    password: string,
    error: Error
}

export const Register = () => {
    const [email, setEmail] = useState('')
   const [password, setPassword] = useState('');

    const emailChange = (event: { target: { value: React.SetStateAction<string>}}) => {
     setEmail(event.target.value)
    }

    const passwordChange = (event: { target: { value: React.SetStateAction<string>}}) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event: { preventDefault: () => void}) => {
        event.preventDefault()
        console.log(`Email: ${email}, Password: ${password}`);
    };

    const packs = () => {
        const response = axios.post("https://cards-nya-back-production.up.railway.app/2.0/auth/register",
            {
                email,
                password
            })
        console.log(response)
    }

    return (

        <div className={s.wrapper}>
            <div>
                <h4>Register</h4>
            </div>
            <form className={s.form} onSubmit={handleSubmit}>
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
                <button onClick={packs} type="submit" className={s.button}>Register now</button>
                <Link to={'/login'}>Login</Link>
            </form>
        </div>
    );
};

