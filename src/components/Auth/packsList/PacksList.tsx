import React, {useState} from 'react';
import s from './PacksList.module.css'
import {CardsPacksType, NewCardPackType} from "../../../types/types";
import {changeDateFormat} from "../../../helpers/helpers";
import PortalEdit from "../../../portals/PortalEdit";
import PortalDelete from "../../../portals/PortalDelete";
import PortalAdd from "../../../portals/PortalAdd";
import CommonModal from "../../../portals/CommonModal";
import {useDispatch} from "react-redux";
import {addNewCardPackTC, changeCardPackTitleTC, deleteCardPacksTC} from "../../../state/packs-reducer";

type PacksListType = {
    packs: CardsPacksType[],
    userId: string
}

const PacksList = (props: PacksListType) => {
    const [deleteId, setDeleteId] = useState('')
    const [EditPackId, setEditOpen] = useState('')
    const [addPack, setAddPack] = useState(false)

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



    const add = (packName: string) => {
        dispatch(addNewCardPackTC(packName))
        setAddPack(false)
    }

    const dle = (id: string) => {
        dispatch(deleteCardPacksTC(id))
        setDeleteId('')
    }

    const edit = (packId: string, newPackName: string) => {
        dispatch(changeCardPackTitleTC(packId, newPackName))
        setEditOpen('')
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
                            <div className={s.td}>{changeDateFormat(el.updated)}</div>
                            <div className={s.td}>{el.user_name}</div>
                            <div className={s.td}>
                                {
                                    el.user_id === props.userId && <>
                                        <button onClick={() => openDeleteModal(el._id)}
                                                className={s.deleteButton}>delete
                                        </button>
                                        <button onClick={()=>openEditModal(el._id)} className={s.editButton}>edit</button>
                                    </>
                                }
                                <button className={s.learnButton}>learn</button>
                            </div>
                        </div>
                    })}
                    {/*<CommonModal onOpen={addPack} onClose={onCloseAddModal} buttonTitle={'add'} onAction={add}/>*/}
                    <PortalEdit EditPackId={EditPackId} onClose={onCloseEditModal} />
                    <PortalDelete id={deleteId} onClose={onCloseDeleteModal}/>
                    <PortalAdd addPack={addPack} onClose={onCloseAddModal}/>
                </div>
            </table>
        </div>
    );
};

export default PacksList;
