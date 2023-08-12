import React, {useState} from 'react';
import s from './Settings.module.css'
import Slider from "../slider/Slider";
import {useDispatch, useSelector} from "react-redux";
import {setPageCountNumber, setShowAllPacks} from "../../state/pack-search-reducer";
import {Selector} from "../Selector/Selector";
import {AppRootStateType} from "../../state/store";
import {options} from "../../helpers/helpers";

export type SettingsPropsType = {
    userId: string
}

const Settings = (props: SettingsPropsType) => {
    const [isMyActive, setIsMyActive] = useState(false)
    const [isAllActive, setIsAllActive] = useState(false)
    const pageCount = useSelector<AppRootStateType, any>((state) => state.packSearchReducer.pageCount)
    const dispatch = useDispatch<any>()


    const handleAllChange = () => {
        setIsAllActive(true)
        setIsMyActive(false)
        dispatch(setShowAllPacks(''))
    }

    const handleMyChange = () => {
        setIsAllActive(false)
        setIsMyActive(true)
        dispatch(setShowAllPacks(props.userId))
    }

    const changePage = (value: number) => {
        dispatch(setPageCountNumber(value))
    }

    return (
        <div className={s.container}>
            <div>
                <h2>Show packs cards</h2>
                <div>
                    <button onClick={handleMyChange} className={isMyActive ? s.active : s.button}>My</button>
                    <button onClick={handleAllChange} className={isAllActive ? s.active : s.button}>All</button>
                </div>
            </div>
            <div>
                <h2>Number of cards</h2>
                <div>
                    <Slider/>
                </div>
            </div>
            <div className={s.selector}>
                <h6>Show</h6>
                <Selector value={pageCount} options={options} onChange={changePage}/>
            </div>
        </div>
    );
};

export default Settings;