import React from 'react';
import {
    setPageCountNumber,
    setPageNumber
} from "../../state/pack-search-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import s from "./Pagination.module.css"
import {Selector} from '../Selector/Selector';

export const Pagination = () => {
    const dispatch = useDispatch<any>()
    const page = useSelector<AppRootStateType, number>((state) => state.packSearchReducer.page)
    const pageCount = useSelector<AppRootStateType, any>((state) => state.packSearchReducer.pageCount)
    const cardPacksTotalCount = useSelector<AppRootStateType, any>((state) => state.packsReducer.cardPacksTotalCount)

    const totalPage = Math.ceil(cardPacksTotalCount / pageCount)
    const firstPage = () => {
        dispatch(setPageNumber(1))
    }
    const lastPage = () => {
        dispatch(setPageNumber(totalPage))
    }

    const prevPage = () => {
        dispatch(setPageNumber(page - 1))
    }

    const nextPage = () => {
        dispatch(setPageNumber(page + 1))
    }

    const pagesArray = Array(totalPage).fill(1).map((i, index) => index + 1)

    return (
        <nav>
            <div>
                <button onClick={prevPage} disabled={page === 1}>&lt</button>
                {pagesArray.map((pg) => (
                    <button key={pg} className={page === pg ? s.navButton_focus : s.navButton}
                            onClick={() => dispatch(setPageNumber(pg))}>{pg}</button>))}

                <button className={s.navButton} onClick={nextPage} disabled={page === totalPage}>&gt</button>
            </div>
        </nav>
    );
};
