import React from 'react';
import s from './Login.module.css'

const Login = () => {
    return (
        <div className={s.wrapper}>
            <h1>Login</h1>
            <form className={s.form}>
                <div>
                    <div>
                        <div>login</div>
                        <input type="text"/>
                    </div>
                    <div>
                        <div>password</div>
                        <input type="password"/>
                    </div>
                </div>
                <div>
                    <input type="checkbox"/>
                    <div>remember me</div>
                </div>
                <button>Login</button>
            </form>
        </div>
    );
};

export default Login;