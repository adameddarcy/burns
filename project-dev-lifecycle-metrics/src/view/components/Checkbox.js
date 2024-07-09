import React from 'react';
import { useSelector } from 'react-redux'
import './../Cta.css'

const Checkbox = ({props}) => {
    const {override, setOverride} = props;

    const { headers } = useSelector((state) => state.csvData);

    const disabled = headers.length > 1 ? 'cta-item-hidden' : 'cta-item';

    return (
        <div className={disabled}>
            <input type="checkbox" id="override-checkbox" checked={override}
                   onChange={e => setOverride(e.target.checked)}/>
            <label htmlFor="override-checkbox" style={{color: '#282c34'}}>Use Override</label>
        </div>
    );
};

export default Checkbox;
