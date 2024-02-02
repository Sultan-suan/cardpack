import React, {useEffect, useRef, useState} from 'react';
import {authMeTC, logoutTC} from "../../state/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams, useLocation} from 'react-router-dom';
import {AppRootStateType} from "../../state/store";
import PacksList from "./packsList/PacksList";
import {getCardPacksTC} from "../../state/packs-reducer";
import {CardsPacksType} from "../../types/types";
import {
    SearchParamsStateType,
    setMinMaxPacks, setObject,
    // setPageCountNumber,
    setShowAllPacks
} from "../../state/pack-search-reducer";
import s from './Main.module.css'
import Settings from "../settings/Settings";
import {Pagination} from "../pagination/Pagination";
import {useParams} from 'react-router-dom'
import qs from 'qs'
import {objectToString} from "../../helpers/helpers";
import {createBrowserHistory} from "history";
import {Dispatch} from "redux";


export const Main = () => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth);
    const packs = useSelector<AppRootStateType, CardsPacksType[]>(state => state.packsReducer.cardsPacks);
    const userId = useSelector<AppRootStateType, string>(state => state.auth.user._id);
    const objectOfParams = useSelector<AppRootStateType, SearchParamsStateType>(state => state.packSearchReducer);
    const objectOfParams2 = useSelector<AppRootStateType, any>(state => state.packsReducer.filter);
    const dispatch = useDispatch<any>();
    const isMounted = useRef(false)


    const location = useLocation();
    const param = useParams();

    const navigate = useNavigate();

    // const [count, setCount] = useState(0);

    const history = createBrowserHistory();


    useEffect(() => {

        if (!isAuth) {
            isMounted.current = true
            // debugger
            // localStorage.setItem('userId', JSON.stringify(userId) );
            // localStorage.getItem('userId')
            // const localUserId = localStorage.getItem('userId')
            // console.log(localUserId)
            const filterParams = history.location.search.substr(1);
            const filtersFromParams = qs.parse(filterParams);
            dispatch(authMeTC(navigate));
            if (isMounted.current) {
                // debugger
                dispatch(setObject(filtersFromParams));
            }
            isMounted.current = true
        }

    }, []);

    useEffect(() => {

        const searchParams = new URLSearchParams(location.search);
        if (isAuth) {
            dispatch(getCardPacksTC());
            const filterParams = history.location.search.substr(1);
            const filtersFromParams = qs.parse(filterParams);

            const queryString = qs.stringify({
                min: objectOfParams.min,
                max: objectOfParams.max,
                page: objectOfParams.page,
                pageCount: objectOfParams.pageCount,
                user_id: objectOfParams.user_id,
                packName: objectOfParams.packName,
                sortPacks: objectOfParams.sortPacks
            });

            navigate(`?${queryString}`);
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
    ]);

    const logout = () => {
        dispatch(logoutTC(navigate))
    };

    return (
        <div className={s.container}>
            <Settings userId={userId}/>
            <div>
                <div>
                    <div>{objectOfParams2}</div>
                    <div> userId: {userId}</div>
                    <button className={s.logout} onClick={logout}>
                        logout
                    </button>
                </div>
                <div className={s.packList}>
                    <PacksList packs={packs} userId={userId}/>
                </div>
            </div>
        </div>
    );
};

