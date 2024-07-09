import React from 'react';
import {useSelector} from "react-redux";
import './Cta.css';

const DevCount = ({props}) => {

    const { override } = props;

    const { headers, data, numDevs } = useSelector((state) => state.csvData);

    let uniqueAssignees;

    if (headers.length > 1) {
        uniqueAssignees = new Set(data.map(item => item.Assignee));
        uniqueAssignees = uniqueAssignees.size - 1;
    }

    const devCount = override ? numDevs : uniqueAssignees;

    return (
        <div>
            <div className={"cta-item"}>
                <div className="cta-item display-field">
                    <span id="number-display">NUMBER of DEVS: {devCount}</span>
                </div>
            </div>
        </div>
    );
};

export default DevCount;
