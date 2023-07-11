import React, {useState} from 'react';
import s from './PacksList.module.css'
import {CardsPacksType, NewCardPackType} from "../../../types/types";
import {changeDateFormat} from "../../../helpers/helpers";
import PortalEdit from "../../../portals/PortalEdit";
import PortalDelete from "../../../portals/PortalDelete";
import PortalAdd from "../../../portals/PortalAdd";

type PacksListType = {
    packs: CardsPacksType[],
    userId: string
}

const PacksList = (props: PacksListType) => {
    const [deleteId, setDeleteId] = useState('')
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [addPack, setAddPack] = useState(false)

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    const onCloseDeleteModal = () => {
        setDeleteId('')
    }
    const openDeleteModal = (id: string) => {
        setDeleteId(id)
        console.log('Modal window open ' + id)
    }
    const onCloseEditModal = () => {
        setIsEditOpen(false)
    }
    const openEditModal = () => {
        setIsEditOpen(true)
        console.log('Modal window open')
    }
    const onCloseAddModal = () => {
        setAddPack(false)
    }
    const openAddModal = () => {
        setAddPack(true)
        console.log('Added pack')
    }

    return (
        <div>
            <h1>Packs list</h1>
            <div className={s.header}>
                <div>
                    <input className={s.inputSearch} placeholder={'Search'} type="search"/>
                </div>
                <div>
                    <button className={s.button} onClick={openAddModal}>Add new pack</button>
                </div>
            </div>
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
                            <div className={s.td}>{el.updated}</div>
                            <div className={s.td}>{el.name}</div>
                            <div className={s.td}>
                                {
                                    el.user_id === props.userId && <>
                                        <button onClick={() => openDeleteModal(el._id)}
                                                className={s.deleteButton}>delete
                                        </button>
                                        <button onClick={openEditModal} className={s.editButton}>edit</button>
                                    </>
                                }
                                <button className={s.learnButton}>learn</button>
                            </div>
                        </div>
                    })}
                    <PortalEdit isOpen={isEditOpen} onClose={onCloseEditModal}/>
                    <PortalDelete id={deleteId} onClose={onCloseDeleteModal}/>
                    <PortalAdd addPack={addPack} onClose={onCloseAddModal}/>
                </div>
            </table>
        </div>
    );
};

export default PacksList;
