import React, {useEffect, useState} from 'react';
import s from './Register.module.css'
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { RegisterTC } from "../../state/auth-reducer";
import {Field, Form, Formik} from "formik";


type validation = {
    email: string,
    password: string,
    error: Error
}

export const Register = () => {
    const isRegister = useSelector<any>(state => state.auth.isRegister)
    const [email, setEmail] = useState('')
   const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch<any>();

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

    const register = () => {
        const response = axios.post("https://cards-nya-back-production.up.railway.app/2.0/auth/register",
            {
                email,
                password
            })
        console.log(response)
    }
    useEffect(() => {
        if (isRegister) {
            navigate('/login')
        }
    }, [isRegister])

    return (

        <div className={s.wrapper}>
            <div>
                <h4>Register</h4>
            </div>
            <Formik
                initialValues={{
                    email: '',
                    password: '',

                }}
                onSubmit={async (values) => {
                    // await new Promise((r) => setTimeout(r, 500));
                    // alert(JSON.stringify(values, null, 2));
                    await dispatch(RegisterTC(values.email, values.password))
                }}
            >
                <Form className={s.form}>
                    <div className={s.formHolder}>
                        {/*<div className={s.input}>*/}
                        {/*    <label htmlFor="email">email</label>*/}
                        <Field  className={s.input} id="email" name="email" placeholder="enter your email..."/>
                        {/*</div>*/}

                        {/*<div className={s.input}>*/}
                        {/*    <label htmlFor="password">password</label>*/}
                        <Field className={s.input} id="password" name="password" placeholder="Enter your password" type='password'/>
                        {/*</div>*/}

                    </div>




                    <button className={s.button} type="submit">Submit</button>
                    <Link className={s.createAccount} to={'/register'}>Create Account</Link>
                </Form>
            </Formik>
            {/*<form className={s.form} onSubmit={handleSubmit}>*/}
            {/*    <div>*/}
            {/*        <label htmlFor="email">Email:</label>*/}
            {/*        <input*/}
            {/*            type="email"*/}
            {/*        id="email"*/}
            {/*        value={email}*/}
            {/*        onChange={emailChange}*/}
            {/*        required*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <label htmlFor="email">Password:</label>*/}
            {/*        <input*/}
            {/*            type="password"*/}
            {/*            id="password"*/}
            {/*            value={password}*/}
            {/*            onChange={passwordChange}*/}
            {/*            required*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <button onClick={packs} type="submit" className={s.button}>Register now</button>*/}
            {/*    <Link to={'/login'}>Login</Link>*/}
            {/*</form>*/}
        </div>
    );
};

