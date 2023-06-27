import React, {useEffect} from 'react';
import s from './Register.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';


import {useFormik} from "formik";

import {TextField} from "@mui/material";
import {RegisterTC} from "../../state/auth-reducer";


type InitStateFormik = {
    email: string,
    password: string,
    rememberMe: boolean
}

const validate = (values: InitStateFormik) => {
    const errors: any = {}
    if (!values.email) {
        errors.email = 'Required'
    }
    if (!values.password) {
        errors.password = 'Required'
    }
    return errors
}

export const Register = () => {
    const isRegister = useSelector<any>(state => state.auth.isRegister)
    const navigate = useNavigate()
    const dispatch = useDispatch<any>();


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: (values: InitStateFormik) => {
            dispatch(RegisterTC(values.email, values.password))
        },
    });

    useEffect(() => {
        if (isRegister) {
            navigate('/login')
        }
    }, [isRegister])
    //1 validate (not valid email and length of pass
    // 2 show error
    //3 show error from back


    return (
        <form onSubmit={formik.handleSubmit} className={s.form}>
            <div className={s.wrapper}>
                <div>
                    <h4>Register</h4>
                    <TextField
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        margin="normal"
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        id="email"
                        autoComplete="email"
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}/>

                    <TextField
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="password"
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}/>

                    <button type="submit" className={s.button}>
                        Register
                    </button>



                </div>
            </div>
        </form>

    );
};

