import React, {useEffect} from 'react';
import {authMeTC} from "../../state/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';


export const Auth = () => {
    // const isAuth = useSelector<any>(state => state.auth.isAuth)
    // const navigate = useNavigate()
    // const dispatch = useDispatch<any>()
    //
    // useEffect(() => {
    //     if(!isAuth) {
    //        dispatch(authMeTC(navigate))
    //     }
    // }, [])

    return (
        <div>
            user logged...
        </div>
    );
};

