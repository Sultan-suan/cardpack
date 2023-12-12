import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import s from './../Auth/packsList/PacksList.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {addNewCardTC, changeCardInfoTC, deleteCardTC, getCardsTC} from "../../state/cards-reducer";
import {changeDateFormat, override} from "../../helpers/helpers";
import CommonModal from "../../portals/CommonModal";
import {CardsType} from "../../types/types";
import {useNavigate} from "react-router-dom";
import {ClockLoader} from "react-spinners";
import {changeCardPackTitleTC, deleteCardPacksTC} from "../../state/packs-reducer";
import debounce from "lodash.debounce";
import {SearchParamsStateType, setPacksName, setSortPacks} from "../../state/pack-search-reducer";
import {SearchCardsParamsStateType, setCardsPackId, setSortCards} from "../../state/card-search-reducer";
import {BiSolidDownArrow, BiSolidUpArrow} from "react-icons/bi";
import {Pagination} from "../pagination/Pagination";
import {CardsPagination} from "../pagination/CardsPagination";
import {createBrowserHistory} from "history";
import qs from "qs";
import {getPackId} from "../../utils/getPackId";


const Pack = () => {
    const cards = useSelector<AppRootStateType, any>((state) => state.cards.cards);
    const packTitle = useSelector<AppRootStateType, any>((state) => state.cards.packTitle);
    const packId = useSelector<AppRootStateType, any>((state) => state.cards.packId);
    const packUserId = useSelector<AppRootStateType, any>((state) => state.cards.packUserId);
    const loading = useSelector<AppRootStateType, boolean>((state) => state.packsReducer.loading);
    const userId = useSelector<AppRootStateType, string>(state => state.auth.user._id);
    const totalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount);
    const objectOfParams = useSelector<AppRootStateType, SearchCardsParamsStateType>(state => state.searchCards);
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const isMounted = useRef(false);

    const [addCard, setAddCard] = useState(false);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [deleteCardId, setDeleteCardId] = useState('');
    const [editOpen, setEditOpen] = useState('');
    const [sorted, setSorted] = useState(true);
    const [packLocalId, setPackLocalId] = useState(packId);

    // useEffect(() => {
    //     localStorage.setItem('pack', packId);
    //     localStorage.setItem('packUserId', packUserId);
    //     console.log(totalCount);
    //     // dispatch(getCardsTC(packId, packUserId));
    //     dispatch(setCardsPackId(packId))
    // }, [packId, packUserId]);


    const history = createBrowserHistory();

    useEffect(() => {
        const filterParams = history.location.search.substr(1);
        const filtersFromParams = qs.parse(filterParams);
        if (filtersFromParams.count) {
            setPackLocalId(Number(filtersFromParams.count));
        }
    }, []);

    // useEffect(() => {
    //     history.push(`?packId=${packLocalId}`);
    // }, [packLocalId]);
    // useEffect(() => {
    //     const savedCount = localStorage.getItem('packId');
    //     if (savedCount !== null) {
    //         setPackLocalId(savedCount);
    //     }
    // }, []);

    useEffect(() => {
        const queryString = qs.stringify({
            cardAnswer: objectOfParams.cardAnswer,
            cardQuestion: objectOfParams.cardQuestion,
            // cardsPack_id: objectOfParams.cardsPack_id,
            min: objectOfParams.min,
            max: objectOfParams.max,
            page: objectOfParams.page,
            pageCount: objectOfParams.pageCount,
            sortCards: objectOfParams.sortCards
        });

        console.log(queryString);
        // console.log(filter.object)
        navigate(`?${queryString}`);
    }, []);

    const SearchDebounce = useCallback(debounce((value: string) => {
        // dispatch(getCardName(value))
    }, 1000), []);

    const openAddCardModal = () => {
        setAddCard(true);
        console.log('Added card')
    };
    const onCloseAddCardModal = () => {
        setAddCard(false)
    };

    const openDeleteModal = (id: string) => {
        // alert(id === userId)
        setDeleteCardId(id)
    };
    const onCloseDeleteModal = () => {
        setDeleteCardId('')
    };


    const openEditCardModal = (id: string, question: string, answer: string) => {
        setEditOpen(id);
        setQuestion(question);
        setAnswer(answer);
        console.log(id);
        console.log('Modal edit open')
    };

    const onCloseEditModal = () => {
        setEditOpen('')
    };

    const onClickBackHandler = () => {
        navigate('/')
    };

    const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    };
    const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    };

    const add = () => {
        dispatch(addNewCardTC(packId, question, answer));
        setAddCard(false)
    };

    const deletePack = () => {
        dispatch(deleteCardTC(deleteCardId));
        setDeleteCardId('')
    };

    const edit = () => {
        dispatch(changeCardInfoTC(editOpen, question, answer));
        setEditOpen('')
    };


    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        SearchDebounce(e.currentTarget.value)
    };

    const onClickSort = () => {
        setSorted(!sorted);
        if (sorted) {
            dispatch(setSortCards('grade'))
        } else {
            dispatch(setSortCards(''))
        }
    };

    return (
        <div className={s.mainContainer}>
            <button onClick={onClickBackHandler}>Back</button>
            <h1>Pack: {packTitle}</h1>
            <div>packId: {packId}</div>
            <div>packUserId: {packUserId}</div>
            <div className={s.searchAndAdd}>
                <div className={s.searchWrapper}>
                    <input className={s.inputSearch} placeholder={'Search'} type="search" onChange={onChangeSearch}/>
                </div>
                {packUserId === userId &&
                <div>
                    <button className={s.button} onClick={openAddCardModal}>Add new pack</button>
                </div>}
            </div>
            {loading ? <div className={s.loading}>
                <ClockLoader
                    color={'blue'}
                    loading={loading}
                    cssOverride={override}
                    size={300}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div> : cards.length === 0 ? <h2>No cards</h2> :

                <div className={s.content}>
                    <div className={s.tableWrapper}>
                        <table className={s.table}>
                            <thead className={s.head}>
                            <tr className={s.tr}>
                                <th className={s.th}>Question</th>
                                <th className={s.th}>Answer</th>
                                <th className={s.th}>Last updated
                                    <button className={s.sortButton} onClick={onClickSort}>
                                        {sorted ? <BiSolidDownArrow className={s.arrow}/> :
                                            <BiSolidUpArrow className={s.arrow}/>}
                                    </button>
                                </th>
                                <th className={s.th}>Grade</th>
                                {userId === packUserId && <th className={s.th}>Actions</th>}
                            </tr>
                            </thead>

                            <tbody className={s.tbody}>

                            {cards.map((el: CardsType, i: number) => {
                                return (
                                    <tr className={s.tr} key={i}>
                                        <td className={s.td}>{el.question}</td>
                                        <td className={s.td}>{el.answer}</td>
                                        <td className={s.td}>{changeDateFormat(el.updated)}</td>
                                        <td className={s.td}>{el.grade}</td>
                                        {
                                            el.user_id === userId &&
                                            <td className={s.td}>
                                                <>
                                                    <button onClick={() => openDeleteModal(el._id)}
                                                            className={s.deleteButton}>delete
                                                    </button>
                                                    <button
                                                        onClick={() => openEditCardModal(el._id, el.question, el.answer)}
                                                        className={s.editButton}>edit
                                                    </button>
                                                </>
                                                {/*<button className={s.learnButton}>learn</button>*/}
                                            </td>
                                        }
                                    </tr>)
                            })}


                            </tbody>
                        </table>

                    </div>
                </div>}
            <CommonModal onOpen={addCard}
                         onClose={onCloseAddCardModal}
                         buttonTitle={'Add'}
                         onAction={add}
                         title={'Add card'}
                         isDeleteModal={''}
                         inputValue={question}
                         inputValue2={answer}
                         onChange={onChangeQuestion}
                         onChange2={onChangeAnswer}
                         isCardModal={addCard}
            />
            <CommonModal onOpen={deleteCardId}
                         onClose={onCloseDeleteModal}
                         buttonTitle={'Delete'}
                         onAction={deletePack}
                         title={'Delete card'}
                         isDeleteModal={deleteCardId}
            />
            <CommonModal onOpen={editOpen}
                         onClose={onCloseEditModal}
                         buttonTitle={'Edit'}
                         onAction={edit}
                         title={'Change card info'}
                         isDeleteModal={deleteCardId}
                         inputValue={question}
                         inputValue2={answer}
                         onChange={onChangeQuestion}
                         onChange2={onChangeAnswer}
                         isCardModal={editOpen}
            />
            <CardsPagination/>


        </div>
    );
};

export default Pack;

