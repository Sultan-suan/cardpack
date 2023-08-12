import React, {useEffect} from 'react';
import {authMeTC, logoutTC, UserType} from "../../state/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {AppRootStateType} from "../../state/store";
import PacksList from "./packsList/PacksList";
import {getCardPacksTC, packsReducer} from "../../state/packs-reducer";
import {CardsPacksType} from "../../types/types";

import {Pagination} from "../Pagination/Pagination";
import {SearchParamsStateType} from "../../state/pack-search-reducer";


export const Main = () => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
    const user = useSelector<AppRootStateType, UserType>(state => state.auth.user)
    const packs = useSelector<AppRootStateType, CardsPacksType[]>(state => state.packsReducer.cardsPacks)
    const userId = useSelector<AppRootStateType, string>(state => state.auth.user._id)
    const objectOfParams = useSelector<AppRootStateType, SearchParamsStateType>(state => state.packSearchReducer)

    const navigate = useNavigate()
    const dispatch = useDispatch<any>()

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
        <div>
            <div>
                {user.name}
            </div>
            <div>
                <button onClick={logout}>
                    logout
                </button>
            </div>
            <div>
                <PacksList packs={packs} userId={userId}/>
                <Pagination/>
            </div>
        </div>
    );
};

