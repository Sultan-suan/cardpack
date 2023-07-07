import React, {useState} from 'react';
import s from './PacksList.module.css'
import {CardsPacksType} from "../../../types/types";
import {changeDateFormat} from "../../../helpers/helpers";
import PortalEdit from "../../../portals/PortalEdit";
import PortalDelete from "../../../portals/PortalDelete";

type PacksListType = {
    packs: CardsPacksType[],
    userId: string
}

const PacksList = (props: PacksListType) => {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)

    const onCloseDeleteModal = () => {
        setIsDeleteOpen(false)
    }
    const openDeleteModal = () => {
        setIsDeleteOpen(true)
        console.log('Modal window open')
    }
    const onCloseEditModal = () => {
        setIsEditOpen(false)
    }
    const openEditModal = () => {
        setIsEditOpen(true)
        console.log('Modal window open')
    }

    return (
        <div>
            <h1>Packs list</h1>
            <div className={s.header}>
                <div>
                    <input className={s.inputSearch} placeholder={'Search'} type="search"/>
                </div>
                <div>
                    <button className={s.button}>Add new pack</button>
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
                    {props.packs.map(el => {
                        return <div className={s.tr} key={el.created}>
                            <div className={s.td}>{el.name}</div>
                            <div className={s.td}>{el.cardsCount}</div>
                            <div className={s.td}>{changeDateFormat(el.updated)}</div>
                            <div className={s.td}>{el.name}</div>
                            <div className={s.td}>
                                {
                                    el.user_id === props.userId && <>
                                        <button onClick={openDeleteModal} className={s.deleteButton}>delete</button>
                                        <PortalDelete isOpen={isDeleteOpen} onClose={onCloseDeleteModal}/>
                                        <button  onClick={openEditModal} className={s.editButton}>edit</button>
                                        <PortalEdit isOpen={isEditOpen} onClose={onCloseEditModal}/>
                                    </>
                                }
                                <button className={s.learnButton}>learn</button>
                            </div>
                        </div>
                    })}
                </div>
            </table>
        </div>
    );
};

export default PacksList;