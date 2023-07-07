import React from 'react';
import ReactDOM from 'react-dom'
import s from "./Portal.module.css";

type ModalPropsType = {
    isOpen: boolean;
    onClose: () => void;
    // children: React.ReactNode;
};

const PortalEdit: React.FC<ModalPropsType> = ({isOpen, onClose}) => {
    let portal = document.getElementById('portal')
    return isOpen && portal ? ReactDOM.createPortal(
        <div className={s.modal}>
            <div className={s.modalContent}>
                <h1>Edit</h1>
                <button onClick={onClose}>Close</button>
            </div>
        </div>, portal
    ) : null
};

export default PortalEdit;