import React, {ChangeEvent, useState} from 'react';
import ReactDOM from 'react-dom'
import s from "./Portal.module.css";
import {addNewCardPackTC, changeCardPackTitleTC} from "../state/packs-reducer";
import {useDispatch} from "react-redux";

type ModalPropsType = {
    EditPackId: string;
    onClose: () => void;

    // children: React.ReactNode;
};

const PortalEdit: React.FC<ModalPropsType> = ({EditPackId, onClose, }) => {
    const [newPackName, setNewPackName] = useState('')
    let portal = document.getElementById('portal')
    const dispatch = useDispatch<any>();

    const edit = () => {
        dispatch(changeCardPackTitleTC(EditPackId, newPackName))
        onClose()
    }

    const onChangeName = (e:  ChangeEvent<HTMLInputElement>) => {
        setNewPackName(e.currentTarget.value)
    }
    return EditPackId && portal ? ReactDOM.createPortal(
        <div className={s.modal}>
            <div className={s.modalContent}>
                <div>
                    <h2>Add new pack</h2>
                </div>
                <div>
                    <label htmlFor="pack-name">Name Pack</label>
                    <input type="text" id={'pack-name'} onChange={onChangeName} value={newPackName}/>
                </div>
                <div className={s.buttonWrapper}>
                    <button className={s.cancelButton} onClick={onClose}>Cancel</button>
                    <button onClick={edit} className={s.addButton}>Edit</button>
                </div>
            </div>

        </div>, portal
    ) : null
};

export default PortalEdit;