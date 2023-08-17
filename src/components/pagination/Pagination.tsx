import React, {useCallback, useState} from 'react';
import {
    setPageCountNumber,
    setPageNumber
} from "../../state/pack-search-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import s from "./Pagination.module.css"
import {Selector} from "../selector/Selector";
import {options} from "../../helpers/helpers";
import debounce from 'lodash.debounce'
import {setLoading} from "../../state/packs-reducer";


export const Pagination = () => {
    const page = useSelector<AppRootStateType, number>((state) => state.packSearchReducer.page)
    const pageCount = useSelector<AppRootStateType, any>((state) => state.packSearchReducer.pageCount)
    const cardPacksTotalCount = useSelector<AppRootStateType, any>((state) => state.packsReducer.cardPacksTotalCount)
    const loading = useSelector<AppRootStateType, boolean>((state) => state.packsReducer.loading)
    const dispatch = useDispatch<any>()

    let [index, setIndex] = useState(1)
    let diapason = 5
    let pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    const setPageDebounce = useCallback(debounce((page: number)=>{
        dispatch(setPageNumber(page))
    }, 200), [])

    const totalPage = Math.ceil(cardPacksTotalCount / pageCount)
    const firstPage = () => {
        dispatch(setPageNumber(1))
    }
    const lastPage = () => {
        dispatch(setPageNumber(totalPage))
    }

    const prevPage = () => {
        // dispatch(setPageNumber(page - 1))
        console.log(totalPage)
        setPageDebounce(page - 1)

    }

    const nextPage = () => {
        setPageDebounce(page + 1)
    }

    const pagesArray = Array(totalPage).fill(1).map((i, index) => index + 1)

    const changePageCount = (value: number) => {
        dispatch(setPageCountNumber(value))
    }

    const onChangePageNumber = (page: number) =>{
        dispatch(setLoading(true))
        dispatch(setPageNumber(page))
    }

    return (
        <nav className={s.navWrapper}>

            <div>
                <button disabled={index === 1} onClick={() => setIndex(index - diapason)}>back</button>
                {pages.map((p, i) => {
                    let iPlusOne = i + 1
                    if (iPlusOne >= index && iPlusOne < (index + diapason)) {
                        return <span key={i} className={
                            page === p ?
                                s.selectedPage
                                : ''
                        } onClick={() => {
                            onChangePageNumber(p)
                        }}>{p}</span>
                    } else {
                        return <>
                        </>
                    }
                })}
                <button disabled={index + diapason >= pageCount} onClick={() => setIndex(index + diapason)}>next</button>
                <button  className={s.navButton} onClick={prevPage} disabled={page === 1}>{'<<'}</button>
                {pagesArray.map((pg, i) => {
                    // if (i < 5) {
                        return <button disabled={loading} key={pg} className={page === pg ? s.navButton_focus : s.navButton}
                                       onClick={() => onChangePageNumber(pg)
                                       }>{pg}</button>
                    // }
                })}

                <button className={s.navButton} onClick={nextPage} disabled={page === totalPage}>{'>>'}</button>
            </div>
            <div className={s.selector}>
                <h6>Show</h6>
                <Selector value={pageCount} options={options} onChange={changePageCount}/>
                <h6>Cards per Page</h6>
            </div>
        </nav>
    );
};
