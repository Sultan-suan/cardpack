import React from 'react';
import s from "./Portal.module.css";
import {useDispatch} from "react-redux";
import {deleteCardPacksTC} from "../state/packs-reducer";
import ReactDOM from "react-dom";
import {CardsPacksType} from "../types/types";

type ModalPropsType = {
    addPack: boolean;
    onClose: () => void;
    // children: React.ReactNode;
};

const PortalAdd: React.FC<ModalPropsType> = ({addPack, onClose}) => {
   let portal = document.getElementById('portal')
    const dispatch = useDispatch<any>();
    // const dle = () => {
    //     dispatch(deleteCardPacksTC(addPack))
    // }
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
                    <button className={s.deleteButton}>Delete</button>
                </div>
            </div>

        </div>, portal

    ): null;
};

export default PortalAdd;