import React, {ChangeEvent, useState} from 'react';
import s from './PacksList.module.css'
import {CardsPacksType, NewCardPackType} from "../../../types/types";
import {changeDateFormat} from "../../../helpers/helpers";
import CommonModal from "../../../portals/CommonModal";
import {useDispatch} from "react-redux";
import {addNewCardPackTC, changeCardPackTitleTC, deleteCardPacksTC} from "../../../state/packs-reducer";
import Settings from "../../settings/Settings";

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

    return (
        <div className={s.componentWrapper}>
            <h1>Packs list</h1>
            <div className={s.header}>
                <div>
                    <input className={s.inputSearch} placeholder={'Search'} type="search"/>
                </div>
                <div>
                    <button className={s.button} onClick={openAddModal}>Add new pack</button>
                </div>
            </div>
            <div className={s.content}>
                <Settings/>
                <table className={s.wrapper}>
                    <div className={s.head}>
                        <div className={s.tr}>
                            <div className={s.th}>Name</div>
                            <div className={s.th}>Cards</div>
                            <div className={s.th}>Last updated</div>
                            <div className={s.th}>created by</div>
                            <div className={s.th}>Actions</div>
                        </div>
                    </div>
                    <div className={s.body}>
                        {props.packs.map((el, i) => {
                            return <div className={s.tr} key={i}>
                                <div className={s.td}>{el.name}</div>
                                <div className={s.td}>{el.cardsCount}</div>
                                <div className={s.td}>{changeDateFormat(el.updated)}</div>
                                <div className={s.td}>{el.user_name}</div>
                                <div className={s.td}>
                                    {
                                        el.user_id === props.userId && <>
                                            <button onClick={() => openDeleteModal(el._id)}
                                                    className={s.deleteButton}>delete
                                            </button>
                                            <button onClick={() => openEditModal(el._id)} className={s.editButton}>edit
                                            </button>
                                        </>
                                    }
                                    <button className={s.learnButton}>learn</button>
                                </div>
                            </div>
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
                    </div>
                </table>
            </div>
        </div>
    );
};

export default PacksList;
