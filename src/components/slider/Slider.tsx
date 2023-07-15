import React, { useState } from "react";
import Slider from "react-slider";

const RangeSlider: React.FC = () => {
    const [value, setValue] = useState<number[]>([0, 100]);

    const handleChange = (newValue: number[]) => {
        setValue(newValue);
    };

    return (
        <div>
            <Slider
                value={value}
                min={0}
                max={100}
                step={1}
                onChange={handleChange}
                renderTrack={(props, state) => (
                    <div {...props} className={`slider-track ${state.index === 0 ? 'slider-track-active' : ''}`} />
                )}
                renderThumb={(props, state) => (
                    <div {...props} className={`slider-thumb ${state.index === 0 ? 'slider-thumb-active' : ''}`} />
                )}
            />
            <div>Range: {value[0]} - {value[1]}</div>
        </div>
    );
};

export default RangeSlider;