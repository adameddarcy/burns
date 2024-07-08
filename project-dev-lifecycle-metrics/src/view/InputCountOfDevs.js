import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNumDevs } from '../data/actions';
import './Cta.css';

const InputCountOfDevs = () => {
    const [numDevs, setNumDevsLocal] = useState(1);
    const dispatch = useDispatch();

    const handleNumDevsChange = (event) => {
        setNumDevsLocal(event.target.value);
        dispatch(setNumDevs(event.target.value));
    };

    return (
            <div className="cta-item">
                <label htmlFor="number-input">Override Number of Devs?</label>
                <input id="number-input" type="number" value={numDevs} onChange={handleNumDevsChange} min="1"/>
            </div>
    );
};

export default InputCountOfDevs;
