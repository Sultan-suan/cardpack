import React from 'react';
import s from "./Portal.module.css";
import {useDispatch, useSelector} from "react-redux";
import {addNewCardPacks, deleteCardPacksTC} from "../state/packs-reducer";
import ReactDOM from "react-dom";
import {CardsPacksType} from "../types/types";
import {AppRootStateType} from "../state/store";

type ModalPropsType = {
    addPack: boolean;
    onClose: () => void;
    // children: React.ReactNode;
};

const PortalAdd: React.FC<ModalPropsType> = ({addPack, onClose}) => {
   let portal = document.getElementById('portal')
    const packs = useSelector<AppRootStateType, any>(state => state.packs.cardsPacks)
    const dispatch = useDispatch<any>();
    const add = () => {
        dispatch(addNewCardPacks(packs))
        onClose()
    }
    return  addPack && portal ? ReactDOM.createPortal(
        <div className={s.modal}>
            <div className={s.modalContent}>
                <div>
                    <h2>Add new pack</h2>
                </div>
                <div>
                    <label htmlFor="pack-name">Name Pack</label>
                    <input type="text" id={'pack-name'}/>
                </div>
                <div className={s.buttonWrapper}>
                    <button className={s.cancelButton} onClick={onClose}>Cancel</button>
                    <button onClick={add} className={s.deleteButton}>Add</button>
                </div>
            </div>

        </div>, portal

    ): null;
};

export default PortalAdd;