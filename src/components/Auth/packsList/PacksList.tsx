import React, {ChangeEvent, useState} from 'react';
import s from './PacksList.module.css'
import {CardsPacksType} from "../../../types/types";
import {changeDateFormat} from "../../../helpers/helpers";
import CommonModal from "../../../portals/CommonModal";
import {useDispatch} from "react-redux";
import {addNewCardPackTC, changeCardPackTitleTC, deleteCardPacksTC, getCardPacksTC} from "../../../state/packs-reducer";
import Settings from "../../settings/Settings";
import {getPacksName, setSortPacks} from "../../../state/pack-search-reducer";
import up from './../../../assets/icons/up.png'
import down from './../../../assets/icons/down.png'

type PacksListType = {
    packs: CardsPacksType[],
    userId: string
}

const PacksList = (props: PacksListType) => {
    const [deleteId, setDeleteId] = useState('')
    const [EditPackId, setEditOpen] = useState('')
    const [addPack, setAddPack] = useState(false)
    const [packName, setPackName] = useState('')
    const [newPackName, setNewPackName] = useState('')
    const [updated, setUpdated] = useState(true)

    const dispatch = useDispatch<any>();
    const onCloseDeleteModal = () => {
        setDeleteId('')
    }
    const openDeleteModal = (id: string) => {
        setDeleteId(id)
        console.log('Modal window open ' + id)
    }
    const onCloseEditModal = () => {
        setEditOpen('')
    }
    const openEditModal = (id: string) => {
        setEditOpen(id)
        console.log('Modal window open')
    }
    const onCloseAddModal = () => {
        setAddPack(false)
    }
    const openAddModal = () => {
        setAddPack(true)
        console.log('Added pack')
    }

    const add = () => {
        dispatch(addNewCardPackTC(packName))
        setAddPack(false)
    }

    const deletePack = () => {
        dispatch(deleteCardPacksTC(deleteId))
        setDeleteId('')
    }

    const edit = () => {
        dispatch(changeCardPackTitleTC(EditPackId, newPackName))
        setEditOpen('')
    }

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
    }

    const onChangeEditName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPackName(e.currentTarget.value)
    }

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(getPacksName(e.currentTarget.value))
    }

    const onClickSearch = () => {
        dispatch(getCardPacksTC())
    }

    const onClickSort = () => {
        setUpdated(!updated)
        if (updated) {
            dispatch(setSortPacks('updated'))
        } else {
            dispatch(setSortPacks(''))
        }
    }

    return (
        <div className={s.container}>
            <h1>Packs list</h1>
            <div className={s.searchAndAdd}>
                <div className={s.searchWrapper}>
                    <input className={s.inputSearch} placeholder={'Search'} type="search" onChange={onChangeSearch}/>
                    <button onClick={onClickSearch}>search</button>
                </div>
                <div>
                    <button className={s.button} onClick={openAddModal}>Add new pack</button>
                </div>
            </div>
            <div className={s.content}>
                <Settings userId={props.userId}/>
                <div className={s.tableWrapper}>
                    <table className={s.table} >
                        <thead className={s.head}>
                        <tr className={s.tr}>
                            <th className={s.th}>Name</th>
                            <th className={s.th}>Cards</th>
                            <th className={s.th}>Last updated
                                <button onClick={onClickSort}>sort
                                    {/*{updated ? down : up}*/}
                                </button>
                            </th>
                            <th className={s.th}>created by</th>
                            <th className={s.th}>Actions</th>
                        </tr>
                        </thead>
                        <tbody className={s.tbody}>
                        {props.packs.map((el, i) => {
                            return <tr className={s.tr} key={i}>
                                <td className={s.td}>{el.name}</td>
                                <td className={s.td}>{el.cardsCount}</td>
                                <td className={s.td}>{changeDateFormat(el.updated)}</td>
                                <td className={s.td}>{el.user_name}</td>
                                <td className={s.td}>
                                    {
                                        el.user_id === props.userId &&
                                        <>
                                            <button onClick={() => openDeleteModal(el._id)}
                                                    className={s.deleteButton}>delete
                                            </button>
                                            <button onClick={() => openEditModal(el._id)} className={s.editButton}>edit
                                            </button>
                                        </>
                                    }
                                    <button className={s.learnButton}>learn</button>
                                </td>
                            </tr>
                        })}
                        <CommonModal onOpen={addPack}
                                     onClose={onCloseAddModal}
                                     buttonTitle={'Add'}
                                     onAction={add}
                                     title={'Add new pack'}
                                     isDeleteModal={deleteId}
                                     inputValue={packName}
                                     onChange={onChangeName}
                        />
                        <CommonModal onOpen={EditPackId}
                                     onClose={onCloseEditModal}
                                     buttonTitle={'Edit'}
                                     onAction={edit}
                                     title={'Change pack name'}
                                     isDeleteModal={deleteId}
                                     inputValue={newPackName}
                                     onChange={onChangeEditName}
                        />
                        <CommonModal onOpen={deleteId}
                                     onClose={onCloseDeleteModal}
                                     buttonTitle={'Delete'}
                                     onAction={deletePack}
                                     title={'Delete Pack'}
                                     isDeleteModal={deleteId}
                        />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PacksList;
