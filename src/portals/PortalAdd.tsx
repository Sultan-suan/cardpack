import React, {ChangeEvent, useState} from 'react';
import s from "./Portal.module.css";
import {useDispatch, useSelector} from "react-redux";
import {addNewCardPacks, addNewCardPackTC, deleteCardPacksTC} from "../state/packs-reducer";
import ReactDOM from "react-dom";
import {CardsPacksType} from "../types/types";
import {AppRootStateType} from "../state/store";

type ModalPropsType = {
    addPack: boolean;
    onClose: () => void;
    // children: React.ReactNode;
};

const PortalAdd: React.FC<ModalPropsType> = ({addPack, onClose}) => {
    const [packName, setPackName] = useState('')
    let portal = document.getElementById('portal')
    const dispatch = useDispatch<any>();

    const add = () => {
        dispatch(addNewCardPackTC(packName))
        onClose()
    }

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
    }

    return addPack && portal ? ReactDOM.createPortal(
        <div className={s.modal}>
            <div className={s.modalContent}>
                <div>
                    <h2>Add new pack</h2>
                </div>
                <div>
                    <label htmlFor="pack-name">Name Pack</label>
                    <input type="text" id={'pack-name'} value={packName} onChange={onChangeName}/>
                </div>
                <div className={s.buttonWrapper}>
                    <button className={s.cancelButton} onClick={onClose}>Cancel</button>
                    <button onClick={add} className={s.deleteButton}>Add</button>
                </div>
            </div>

        </div>, portal
    ) : null;
};

export default PortalAdd;