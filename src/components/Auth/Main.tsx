import React, {useEffect} from 'react';
import {authMeTC, logoutTC, UserType} from "../../state/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {AppRootStateType} from "../../state/store";
import {packsApi} from "../../api/api";


export const Main = () => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
    const user = useSelector<AppRootStateType, UserType>(state => state.auth.user)
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()

    useEffect(() => {
        if (!isAuth) {
            dispatch(authMeTC(navigate))
        }
    }, [])

    useEffect(() => {
        if (isAuth) {
            packsApi.get()
        }
    }, [isAuth])

    const logout = () => {
        dispatch(logoutTC(navigate))
    }
    return (
        <div>
            {user.name}
            <div>
                <button onClick={logout}>
                    logout
                </button>
            </div>
        </div>
    );
};

