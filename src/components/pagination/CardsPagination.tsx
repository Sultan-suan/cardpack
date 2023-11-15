import React, {useState} from 'react';
import {
    setCardsPageCountNumber,
    setCardsPageNumber
} from "../../state/card-search-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import s from "./Pagination.module.css"
import {Selector} from "../selector/Selector";
import {options} from "../../helpers/helpers";
import {setLoading} from "../../state/packs-reducer";


export const CardsPagination = () => {
    const page = useSelector<AppRootStateType, number>((state) => state.cards.page);
    const pageCount = useSelector<AppRootStateType, any>((state) => state.cards.pageCount);
    const cardsTotalCount = useSelector<AppRootStateType, any>((state) => state.cards.cardsTotalCount);
    const loading = useSelector<AppRootStateType, boolean>((state) => state.packsReducer.loading);
    const dispatch = useDispatch<any>();


    const [index, setIndex] = useState(1);

    const totalPage = Math.ceil(cardsTotalCount / pageCount);

    let diapason = 5;

    const countOfListsPages = Math.ceil(totalPage / diapason);

    const firstPage = () => {
        dispatch(setCardsPageNumber(1));
        setIndex(1)
    };

    console.log(cardsTotalCount, page, pageCount);

    const lastPage = () => {
        dispatch(setCardsPageNumber(totalPage));
        setIndex(1 + diapason * (countOfListsPages - 1))
    };

    const pagesArray = Array(totalPage).fill(1).map((i, index) => index + 1);

    const changeCardsPerPage = (value: number) => {
        dispatch(setCardsPageCountNumber(value))
    };

    const onChangePageNumber = (page: number) => {
        dispatch(setCardsPageNumber(page))
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
                                       className={page === pg ? s.navButton_focus : s.navButton}
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
