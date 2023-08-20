import React, {useEffect, useState} from 'react';
import {authMeTC, logoutTC, UserType} from "../../state/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {AppRootStateType} from "../../state/store";
import PacksList from "./packsList/PacksList";
import {getCardPacksTC, setIndex} from "../../state/packs-reducer";
import {CardsPacksType} from "../../types/types";
import {SearchParamsStateType} from "../../state/pack-search-reducer";
import s from './Main.module.css'
import Settings from "../settings/Settings";
import {Pagination} from "../pagination/Pagination";


export const Main = () => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
    const user = useSelector<AppRootStateType, UserType>(state => state.auth.user)
    const packs = useSelector<AppRootStateType, CardsPacksType[]>(state => state.packsReducer.cardsPacks)
    const userId = useSelector<AppRootStateType, string>(state => state.auth.user._id)
    const objectOfParams = useSelector<AppRootStateType, SearchParamsStateType>(state => state.packSearchReducer)
    const index = useSelector<AppRootStateType, number>(state => state.packsReducer.index)
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()


    // const [index, setIndex] = useState(1)
    useEffect(() => {
        if (!isAuth) {
            dispatch(authMeTC(navigate))
        }
    }, [])

    useEffect(() => {
        if (isAuth) {
            dispatch(getCardPacksTC())
        }
    }, [
        isAuth,
        objectOfParams.pageCount,
        objectOfParams.sortPacks,
        objectOfParams.max,
        objectOfParams.min,
        objectOfParams.user_id,
        objectOfParams.packName,
        objectOfParams.page
    ])

    const logout = () => {
        dispatch(logoutTC(navigate))
    }

    return (
        <div className={s.container}>
            <Settings userId={userId}/>
            <div>
                <div>
                    <button className={s.logout} onClick={logout}>
                        logout
                    </button>
                </div>
                <div className={s.packList}>
                    <PacksList packs={packs} userId={userId}/>
                    <Pagination/>
                </div>
            </div>
        </div>
    );
};

