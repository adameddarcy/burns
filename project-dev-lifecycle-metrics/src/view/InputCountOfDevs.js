import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNumDevs } from '../data/actions';

const InputCountOfDevs = () => {
    const [numDevs, setNumDevsLocal] = useState(1);
    const dispatch = useDispatch();

    const handleNumDevsChange = (event) => {
        setNumDevsLocal(event.target.value);
        dispatch(setNumDevs(event.target.value));
    };

    return (
        <div>
            <label>
                Number of Developers:
                <input type="number" value={numDevs} onChange={handleNumDevsChange} min="1" />
            </label>
        </div>
    );
};

export default InputCountOfDevs;