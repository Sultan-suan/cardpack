import React, {useState} from 'react';
import s from './Settings.module.css'
import MultiRangeSlider from "../slider/Slider";

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
                    <MultiRangeSlider
                        min={0}
                        max={100}
                        onChange={({ min, max }: { min: number; max: number }) =>
                            console.log(`min = ${min}, max = ${max}`)
                        }
                    />
                </div>
            </div>

        </div>
    );
};

export default Settings;