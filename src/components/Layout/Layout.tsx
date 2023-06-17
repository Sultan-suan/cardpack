import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import s from './Layout.module.css'


export const Layout = () => {
    return (
        <div className={s.wrapper}>
            <NavLink to={'/login'}>login</NavLink>
            <NavLink to={'/register'}>register</NavLink>
            <Outlet/>
        </div>
    );
};

// export default Layout