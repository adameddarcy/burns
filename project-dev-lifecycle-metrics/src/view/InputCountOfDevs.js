import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNumDevs } from '../data/actions';
import './Cta.css';
import { useSelector } from 'react-redux'

const InputCountOfDevs = () => {
    const [numDevs, setNumDevsLocal] = useState(1);
    const dispatch = useDispatch();

    const { headers } = useSelector((state) => state.csvData);

    const handleNumDevsChange = (event) => {
        setNumDevsLocal(event.target.value);
        dispatch(setNumDevs(event.target.value));
    };

    const disabled = headers.length > 1 ? 'cta-item-hidden' : 'cta-item';

    return (
            <div className={disabled}>
                <label htmlFor="number-input">Override Number of Devs?</label>
                <input id="number-input" type="number" value={numDevs} onChange={handleNumDevsChange} min="1"/>
            </div>
    );
};

export default InputCountOfDevs;
