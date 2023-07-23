import React from 'react';

export const Selector = ({options, value, onChange} : any) => {
    return (
        <select value={value}
        onChange={event => onChange(event.target.value)}>
            <option disabled={true} value=""/>
            {options.map((option: any) => <option value={option.value} key={option.key}>{option.body}</option>)}
        </select>
    );
};

