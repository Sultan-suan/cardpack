import React, {ChangeEvent, CSSProperties, useEffect, useState} from 'react';
import s from './../Auth/packsList/PacksList.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {addNewCardTC, getCardsTC} from "../../state/cards-reducer";
import {BiSolidDownArrow, BiSolidUpArrow} from "react-icons/bi";
import {changeDateFormat, override} from "../../helpers/helpers";
import CommonModal from "../../portals/CommonModal";
import {CardsType} from "../../types/types";
import {useNavigate} from "react-router-dom";
import {ClockLoader} from "react-spinners";
import {addNewCardPackTC} from "../../state/packs-reducer";
import {string} from "yup";

const Pack = () => {
    const cards = useSelector<AppRootStateType, any>((state) => state.cards.cards)
    const packTitle = useSelector<AppRootStateType, any>((state) => state.cards.packTitle)
    const packId = useSelector<AppRootStateType, any>((state) => state.cards.packId)
    const loading = useSelector<AppRootStateType, boolean>((state) => state.packsReducer.loading)
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()

    const [addCard, setAddCard] = useState(false)
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')


    const onCloseAddModal = () => {
        setAddCard(false)
    }
    const openAddCardModal = () => {
        setAddCard(true)
        console.log('Added card')
    }

    const add = () => {
        dispatch(addNewCardTC(packId, question, answer))
        setAddCard(false)
    }

    const onClickBackHandler = () => {
        navigate('/')
    }

    const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }


    return (
        <div className={s.mainContainer}>
            <button onClick={onClickBackHandler}>Back</button>
            <h1>Pack: {packTitle}</h1>
            <div>packId: {packId}</div>
            <div className={s.searchWrapper}>
                <input className={s.inputSearch} placeholder={'Search'} type="search"/>
            </div>
            <div>
                <button className={s.button} onClick={openAddCardModal}>Add new pack</button>
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
                </div> : cards.length === 0 ?<h2>No cards</h2> :

                <div className={s.content}>
                    <div className={s.tableWrapper}>
                        <table className={s.table}>
                            <thead className={s.head}>
                            <tr className={s.tr}>
                                <th className={s.th}>Question</th>
                                <th className={s.th}>Answer</th>
                                <th className={s.th}>Last updated
                                    {/*<button className={s.sortButton} onClick={onClickSort}>*/}
                                    {/*    {updated ? <BiSolidDownArrow className={s.arrow}/> : <BiSolidUpArrow className={s.arrow}/>}*/}

                                    {/*</button>*/}
                                </th>
                                <th className={s.th}>Grade</th>
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
                                        {/*<td className={s.td}>*/}
                                        {/*    {*/}
                                        {/*        el.user_id === props.userId &&*/}
                                        {/*        <>*/}
                                        {/*            <button onClick={() => openDeleteModal(el._id)}*/}
                                        {/*                    className={s.deleteButton}>delete*/}
                                        {/*            </button>*/}
                                        {/*            <button onClick={() => openEditModal(el._id, el.name)} className={s.editButton}>edit*/}
                                        {/*            </button>*/}
                                        {/*        </>*/}
                                        {/*    }*/}
                                        {/*    <button className={s.learnButton}>learn</button>*/}
                                        {/*</td>*/}
                                    </tr>)
                            })}
                            {/*<CommonModal onOpen={EditPackId}*/}
                            {/*             onClose={onCloseEditModal}*/}
                            {/*             buttonTitle={'Edit'}*/}
                            {/*             onAction={edit}*/}
                            {/*             title={'Change pack name'}*/}
                            {/*             isDeleteModal={deleteId}*/}
                            {/*             inputValue={newPackName}*/}
                            {/*             onChange={onChangeEditName}*/}
                            {/*/>*/}
                            {/*<CommonModal onOpen={deleteId}*/}
                            {/*             onClose={onCloseDeleteModal}*/}
                            {/*             buttonTitle={'Delete'}*/}
                            {/*             onAction={deletePack}*/}
                            {/*             title={'Delete Pack'}*/}
                            {/*             isDeleteModal={deleteId}*/}
                            {/*/>*/}
                            </tbody>
                        </table>

                    </div>
                </div>}
            <CommonModal onOpen={addCard}
                         onClose={onCloseAddModal}
                         buttonTitle={'Add'}
                         onAction={add}
                         title={String(addCard)}
                         isDeleteModal={''}
                         inputValue={question}
                         inputValue2={answer}
                         onChange={onChangeQuestion}
                         onChange2={onChangeAnswer}
                         isCardModal={addCard}
            />
        </div>
    );
};

export default Pack;