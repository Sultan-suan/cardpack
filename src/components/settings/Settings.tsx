import React, {useState} from 'react';
import s from './Settings.module.css'
import MultiRangeSlider from "../slider/Slider";
import Slider from "../slider/Slider";

const Settings = () => {
    const [isMyActive, setIsMyActive] = useState(false)
    const [isAllActive, setIsAllActive] = useState(false)
    const handleAllChange = () => {
        setIsAllActive(true)
        setIsMyActive(false)
    }
    const handleMyChange = () => {
        setIsAllActive(false)
        setIsMyActive(true)
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

        </div>
    );
};

export default Settings;