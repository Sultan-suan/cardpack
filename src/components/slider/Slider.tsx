import React from 'react';
import MultiRangeSlider from "multi-range-slider-react";
import s from './Slider.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setMinMaxPacks} from "../../state/pack-search-reducer";
import {AppRootStateType} from "../../state/store";
import {getCardPacksTC} from "../../state/packs-reducer";


const Slider = () => {
    const min = useSelector<AppRootStateType, number>(state => state.packSearchReducer.min)
    const max = useSelector<AppRootStateType, number>(state => state.packSearchReducer.max)
    const dispatch = useDispatch<any>()

    const handleInput = (e: any) => {
        dispatch(setMinMaxPacks(e.minValue, e.maxValue))
    };

    const oncLICKHandler = () => {
        dispatch(setMinMaxPacks(min, max))
    }

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