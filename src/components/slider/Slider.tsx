import React, {ChangeEvent, useState} from 'react';
import MultiRangeSlider, {ChangeResult} from "multi-range-slider-react";
import s from './Slider.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getAllCardPacksTC, setMinMaxPacks} from "../../state/pack-search-reducer";
import {AppRootStateType} from "../../state/store";


const Slider = () => {
    const min = useSelector<AppRootStateType, number>(state => state.packSearchReducer.min)
    const max = useSelector<AppRootStateType, number>(state => state.packSearchReducer.max)
    const dispatch = useDispatch<any>()

    // const [minValue, setMinValue] = useState(0);
    // const [maxValue, setMaxValue] = useState(25);

    const handleInput = (e: any) => {
        dispatch(setMinMaxPacks(e.minValue, e.maxValue))
    };

    const oncLICKHandler = () => {
        dispatch(setMinMaxPacks(min, max))
        dispatch(getAllCardPacksTC())
    }

    let numbers = ['0','1','2','3','4','5','6','7','8','9','10']

    return (
        <div>
            <div className={s.slider}>
                <MultiRangeSlider
                    min={0}
                    max={25}
                    step={1}
                    ruler={false}
                    label={true}
                    preventWheel={true}
                    minValue={min}
                    maxValue={max}
                    barInnerColor={'blue'}
                    onInput={(e) => {
                        handleInput(e);
                    }}
                    // onChange={onChangeHandler}
                />
            </div>
            <button onClick={oncLICKHandler}>search</button>
            <h3>
                <div>minValue: {min}</div>
                <div>maxValue: {max}</div>
            </h3>

        </div>
    );
};

export default Slider;