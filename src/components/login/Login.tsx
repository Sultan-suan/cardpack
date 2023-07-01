import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import s from './Login.module.css'
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../state/auth-reducer";
import {Link, useNavigate} from "react-router-dom";
import {Field, Form, Formik, useFormik} from "formik";


type InitStateFormik = {
    email: string,
    password: string,
    rememberMe: boolean
}

const Login = () => {
    const isAuth = useSelector<any>(state => state.auth.isAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch<any>();


    useEffect(() => {
        if (isAuth) {
            navigate('/auth')
        }
    }, [isAuth])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: (values: InitStateFormik)  => {
            dispatch(loginTC(values.email, values.password, values.rememberMe, true));
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            <label htmlFor="email">Email Address</label>
            <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                onChange={formik.handleChange}
                // value={formik.values.rememberMe}
            />
            <button type="submit">Submit</button>
        </form>




    // useEffect(() => {
    //     if (isAuth) {
    //         navigate('/auth')
    //     }
    // }, [isAuth])
    // console.log(isAuth)
    // return (
    //     <div className={s.wrapper}>
    //
    //         <h1 className={s.title}>Login</h1>
    //         <Formik
    //             initialValues={{
    //                 email: 'nya-admin@nya.nya',
    //                 password: '1qazxcvBG',
    //                 rememberMe: false,
    //             }}
    //             onSubmit={async (values) => {
    //                 // await new Promise((r) => setTimeout(r, 500));
    //                 // alert(JSON.stringify(values, null, 2));
    //                 await dispatch(loginTC(values.email, values.password, values.rememberMe, true))
    //             }}
    //         >
    //             <Form className={s.form}>
    //                 <div className={s.formHolder}>
    //                     {/*<div className={s.input}>*/}
    //                     {/*    <label htmlFor="email">email</label>*/}
    //                         <Field  className={s.input} id="email" name="email" placeholder="jane@acme.com"/>
    //                     {/*</div>*/}
    //
    //                     {/*<div className={s.input}>*/}
    //                     {/*    <label htmlFor="password">password</label>*/}
    //                         <Field className={s.input} id="password" name="password" placeholder="Enter your password" type='password'/>
    //                     {/*</div>*/}
    //
    //                 </div>
    //
    //                 <div className={s.checkboxWrapper}>
    //                     <label htmlFor="email">Remember me</label>
    //                     <Field
    //                         className={s.checkbox}
    //                         id="rememberMe"
    //                         name="rememberMe"
    //                         type="checkbox"
    //                     />
    //                 </div>
    //
    //                 <button className={s.button} type="submit">Submit</button>
    //                 <Link className={s.createAccount} to={'/register'}>Create Account</Link>
    //             </Form>
    //         </Formik>
    //
    //
    //         {/*<div className={s.form}>*/}
    //         {/*    <div>*/}
    //         {/*        <div>*/}
    //         {/*            <label>login</label>*/}
    //         {/*            <input type="text"*/}
    //         {/*                   value={email}*/}
    //         {/*                   onChange={onChangeEmail}/>*/}
    //         {/*        </div>*/}
    //         {/*        <div>*/}
    //         {/*            <label>password</label>*/}
    //         {/*            <input type="password"*/}
    //         {/*                   value={password}*/}
    //         {/*                   onChange={onChangePassword}/>*/}
    //         {/*        </div>*/}
    //         {/*    </div>*/}
    //         {/*    <div>*/}
    //         {/*        <input type="checkbox"*/}
    //         {/*               onChange={(e) => {*/}
    //         {/*                   setRememberMe(!rememberMe)*/}
    //         {/*               }}/>*/}
    //         {/*        <div>remember me</div>*/}
    //         {/*    </div>*/}
    //         {/*    <button onClick={login}>Login</button>*/}
    //         {/*    <Link to={'/register'}>Create Account</Link>*/}
    //         {/*</div>*/}
    //     </div>
    );
};

export default Login;