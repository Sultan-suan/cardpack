import React, {useEffect, useState} from 'react';
import {authMeTC, logoutTC} from "../../state/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams, useLocation} from 'react-router-dom';
import {AppRootStateType} from "../../state/store";
import PacksList from "./packsList/PacksList";
import {getCardPacksTC, setObject} from "../../state/packs-reducer";
import {CardsPacksType} from "../../types/types";
import {SearchParamsStateType} from "../../state/pack-search-reducer";
import s from './Main.module.css'
import Settings from "../settings/Settings";
import {Pagination} from "../pagination/Pagination";
import {useParams} from 'react-router-dom'
import qs from 'qs'
import {objectToString} from "../../helpers/helpers";


export const Main = () => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
    const packs = useSelector<AppRootStateType, CardsPacksType[]>(state => state.packsReducer.cardsPacks)
    const userId = useSelector<AppRootStateType, string>(state => state.auth.user._id)
    const objectOfParams = useSelector<AppRootStateType, SearchParamsStateType>(state => state.packSearchReducer)
    const objectOfParams2 = useSelector<AppRootStateType, any>(state => state.packsReducer.object)
    const dispatch = useDispatch<any>()

    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    // const param = useParams()

    const navigate = useNavigate()


    const params = qs.parse(location.search.substring(1))

    useEffect(() => {
        if (!isAuth) {
            // console.log(searchParams)
            // console.log(qs.parse(location.search.substring(1)))
            // console.log(param)
            // console.log(qs.parse(window.location.search.substring(1)))
            dispatch(authMeTC(navigate))
            if (window.location.search) {
                // console.log(objectOfParams2)
                // console.log(window.location.search)
                // setSearchParams( {
                //     ...params
                // })
            }
        }
    }, [])

    // console.log(useParams())
    useEffect(() => {

        if (isAuth) {
            dispatch(getCardPacksTC())
            const queryString = qs.stringify({
                min: objectOfParams.min,
                max: objectOfParams.max,
                page: objectOfParams.page,
                pageCount: objectOfParams.pageCount,
                user_id: objectOfParams.user_id,
                packName: objectOfParams.packName,
                sortPacks: objectOfParams.sortPacks
            })
            // const filter =
            dispatch(setObject(params))
            // console.log(params)
            // console.log(filter.object)
            // console.log(objectOfParams2)
            navigate(`?${queryString}`)
            console.log(qs.parse(window.location.search.substring(1)))
            // console.log(qs.parse(window.location.search.substring(1)))
            console.log(params)
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
            {/*<div>{filter.object.min}</div>*/}
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

