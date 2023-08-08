import React, {useState} from 'react';
import MultiRangeSlider from "multi-range-slider-react";
import s from './Slider.module.css'


const Slider = () => {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(10);
    const handleInput = (e: any) => {
        setMinValue(e.minValue);
        setMaxValue(e.maxValue);
    };
    let numbers = ['0','1','2','3','4','5','6','7','8','9','10']
    return (
        <div>
            <div className={s.slider}>
                <MultiRangeSlider
                    labels={numbers}
                    min={0}
                    max={10}
                    step={1}
                    ruler={true}
                    label={true}
                    preventWheel={true}
                    minValue={minValue}
                    maxValue={maxValue}
                    barInnerColor={'blue'}
                    onInput={(e) => {
                        handleInput(e);
                    }}
                />
            </div>
        </div>
    );
};

export default Slider;