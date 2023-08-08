import React, {ChangeEvent, useState} from 'react';
import s from "./Portal.module.css";
import {useDispatch} from "react-redux";
import {addNewCardPackTC} from "../state/packs-reducer";
import ReactDOM from "react-dom";


type ModalPropsType = {
    onOpen: boolean | string;
    onClose: () => void;
    buttonTitle: string
    onAction: () => void
    title: string
    isDeleteModal: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    inputValue?: string
};

const CommonModal: React.FC<ModalPropsType> = ({
                                                   onOpen,
                                                   onClose,
                                                   buttonTitle,
                                                   onAction,
                                                   title,
                                                   onChange,
                                                   inputValue,
                                                   isDeleteModal
                                               }) => {
    const [packName, setPackName] = useState('')
    let portal = document.getElementById('portal')
    const dispatch = useDispatch<any>();


    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
    }

    return onOpen && portal ? ReactDOM.createPortal(
        <div className={s.modal}>
            <div className={s.modalContent}>
                <div>
                    <h2>{title}</h2>
                </div>
                {isDeleteModal
                    ? <div>
                        <div>Do you really want to remove <strong>Pack-Name&</strong></div>
                        <div>All cards will excluded from this course</div>
                    </div>
                    : <div>
                        <label htmlFor="pack-name">Name Pack</label>
                        <input type="text" id={'pack-name'} value={inputValue} onChange={onChange}/>
                    </div>
                }
                <div className={s.buttonWrapper}>
                    <button className={s.cancelButton} onClick={onClose}>Cancel</button>
                    <button onClick={onAction} className={isDeleteModal ? s.deleteButton : s.saveButton}>{buttonTitle}</button>
                </div>
            </div>
        </div>, portal
    ) : null;
};

export default CommonModal;