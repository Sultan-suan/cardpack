import React from 'react';
import ReactDOM from "react-dom";
import s from './Portal.module.css'
import {useDispatch} from "react-redux";
import {deleteCardPacksTC} from "../state/packs-reducer";

type ModalPropsType = {
    id: string;
    onClose: () => void;
    // children: React.ReactNode;
};

const PortalDelete: React.FC<ModalPropsType> = ({id, onClose}) => {
    let portal = document.getElementById('portal')
    const dispatch = useDispatch<any>();
    const dle = () => {
        dispatch(deleteCardPacksTC(id))
        onClose()
    }
    return id && portal ? ReactDOM.createPortal(
        <div className={s.modal}>
            <div className={s.modalContent}>
                <div>
                    <h2>Delete Pack</h2>
                </div>
                <div>
                    <div>Do you really want to remove <strong>Pack-Name&</strong></div>
                    <div>All cards will excluded from this course</div>
                </div>
                <div className={s.buttonWrapper}>
                    <button className={s.cancelButton}  onClick={onClose}>Cancel</button>
                    <button className={s.deleteButton} onClick={dle}>Delete</button>
                </div>
            </div>

        </div>, portal
    ) : null
};

export default PortalDelete;