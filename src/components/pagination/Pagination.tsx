import React, {useEffect, useState} from 'react';
import {
    setPageCountNumber,
    setPageNumber
} from "../../state/pack-search-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import s from "./Pagination.module.css"
import {Selector} from "../selector/Selector";
import {options} from "../../helpers/helpers";
import {setLoading} from "../../state/packs-reducer";
import {log} from "util";


export const Pagination = () => {
    const page = useSelector<AppRootStateType, number>((state) => state.packSearchReducer.page);
    const pageCount = useSelector<AppRootStateType, any>((state) => state.packSearchReducer.pageCount);
    const cardPacksTotalCount = useSelector<AppRootStateType, any>((state) => state.packsReducer.cardPacksTotalCount);
    const loading = useSelector<AppRootStateType, boolean>((state) => state.packsReducer.loading);
    const dispatch = useDispatch<any>();

    useEffect(()=> {
        console.log(page)
    }, [page]);

    const [index, setIndex] = useState(1);

    const totalPage = Math.ceil(cardPacksTotalCount / pageCount);

    let diapason = 5;

    const countOfListsPages = Math.ceil(totalPage / diapason);

    const firstPage = () => {
        dispatch(setPageNumber(1));
        setIndex(1)
    };

    const lastPage = () => {
        dispatch(setPageNumber(totalPage));
        setIndex(1 + diapason * (countOfListsPages - 1))
    };

    const pagesArray = Array(totalPage).fill(1).map((i, index) => index + 1);

    const changeCardsPerPage = (value: number) => {
        dispatch(setPageCountNumber(value))
    };

    const onChangePageNumber = (page: number) => {
        dispatch(setPageNumber(page));
        console.log(page)
    };

    return (
        <div className={s.navWrapper}>
            <div>
                <button className={s.button} onClick={() => {
                    setIndex(index - diapason)
                }} disabled={index === 1}>{'<<'}</button>
                {index > 1 && <>
                    <button disabled={loading} className={page === 1 ? s.navButton_focus : s.navButton} onClick={firstPage}>1</button>
                    <span>...</span>
                </>}
                {pagesArray.map((pg, i) => {
                    let iPlusOne = i + 1;
                    if (iPlusOne >= index && iPlusOne < (index + diapason)) {
                        return <button disabled={loading} key={pg}
                                       className={page === pg ?s.navButton_focus : s.navButton  }
                                       onClick={() => onChangePageNumber(pg)
                                       }>{pg}</button>
                    } else {
                        return <></>
                    }
                })}
                {index + diapason < totalPage && <>
                    <span>...</span>
                    <button disabled={loading} className={page === totalPage ? s.navButton_focus : s.navButton} onClick={lastPage}>{totalPage}</button>
                </>}
                <button className={s.button} onClick={() => {
                    setIndex(index + diapason)
                }} disabled={index + diapason >= totalPage}>{'>>'}</button>
            </div>
            <div className={s.selector}>
                <h6>Show</h6>
                <Selector value={pageCount} options={options} onChange={changeCardsPerPage}/>
                <h6>Cards per Page</h6>
            </div>
        </div>
    );
};

