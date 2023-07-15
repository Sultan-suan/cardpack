import React, {useState} from 'react';
import s from './Settings.module.css'
import RangeSlider from "../slider/Slider";

const Settings = () => {
    const [isActive, setIsActive] = useState(false)
    const handleChange = () => {

    }
    return (
        <div className={s.container}>
            <div>
                <h2>Show packs cards</h2>
                <div>
                    <button className={s.button}>My</button>
                    <button className={s.button}>All</button>
                </div>
            </div>
            <div>
                <h2>Number of cards</h2>
                <div>
                    Slider
                    <RangeSlider/>
                </div>
            </div>

        </div>
    );
};

export default Settings;