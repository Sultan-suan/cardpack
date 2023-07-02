import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import s from './Login.module.css'
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../state/auth-reducer";
import {Link, useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {AppRootStateType} from "../../state/store";

const Login = () => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch<any>();


    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [isAuth])

    return (
        <div className={s.wrapper}>

            <h1 className={s.title}>Login</h1>
            <Formik
                initialValues={{
                    email: 'nya-admin@nya.nya',
                    password: '1qazxcvBG',
                    rememberMe: false,
                }}
                onSubmit={async (values) => {

                    await dispatch(loginTC(values.email, values.password, values.rememberMe))
                }}
            >
                <Form className={s.form}>
                    <div className={s.formHolder}>

                        <Field className={s.input} id="email" name="email" placeholder="jane@acme.com"/>

                        <Field className={s.input} id="password" name="password" placeholder="Enter your password"
                               type='password'/>


                    </div>

                    <div className={s.checkboxWrapper}>
                        <label htmlFor="email">Remember me</label>
                        <Field
                            className={s.checkbox}
                            id="rememberMe"
                            name="rememberMe"
                            type="checkbox"
                        />
                    </div>

                    <button className={s.button} type="submit">Submit</button>
                    <Link className={s.createAccount} to={'/register'}>Create Account</Link>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;