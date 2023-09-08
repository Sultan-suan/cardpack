import React, {useEffect} from 'react';
import s from './../Auth/packsList/PacksList.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {getCardsTC} from "../../state/cards-reducer";
import {BiSolidDownArrow, BiSolidUpArrow} from "react-icons/bi";
import {changeDateFormat} from "../../helpers/helpers";
import CommonModal from "../../portals/CommonModal";
import {CardsType} from "../../types/types";
import {useNavigate} from "react-router-dom";

const Pack = () => {
    const cards = useSelector<AppRootStateType, any>((state) => state.cards.cards)
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()
    // const str = '/PacksList.module.css'
    // // useEffect(() => {
    // //     dispatch(getCardsTC('64509d312cc655001e72cb7b'))
    // // }, [])
    const onClickHandler = () => {
        navigate('/')
    }
    return (
        <div>
            <button onClick={onClickHandler}>Back</button>
            <h1>Pack name</h1>
                {cards.length === 0 ? <h2>No cards</h2> :            <div className={s.content}>
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
                                return(
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
                            {/*<CommonModal onOpen={addPack}*/}
                            {/*             onClose={onCloseAddModal}*/}
                            {/*             buttonTitle={'Add'}*/}
                            {/*             onAction={add}*/}
                            {/*             title={'Add new pack'}*/}
                            {/*             isDeleteModal={deleteId}*/}
                            {/*             inputValue={packName}*/}
                            {/*             onChange={onChangeName}*/}
                            {/*/>*/}
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
                </div> }

        </div>
    );
};

export default Pack;