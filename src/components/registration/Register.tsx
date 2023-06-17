import React from 'react';
import s from "../login/Login.module.css";

const Register = () => {
    return (
        <div className={s.wrapper}>
            <h1>Register</h1>
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
                    <div>
                        <div>repeat password</div>
                        <input type="password"/>
                    </div>
                </div>

                <button>Sign up</button>
            </form>
        </div>
    );
};

export default Register;