import React from 'react';
import { useSelector } from 'react-redux'
import ResponsiveContainer from './components/ResponsiveContainer';
import CompoundTable from './components/CompoundTable';
import BurnupChart from './components/BurnupChart';
import BurndownChart from './components/BurndownChart';

const DataView = () => {
    const { headers, rows, data, numDevs } = useSelector((state) => state.csvData);
 
    return (
        <>
        <ResponsiveContainer>
            {headers.length > 0 && <BurnupChart props={{csvData: data, numDevs: numDevs}} />}
            {headers.length > 0 && <BurndownChart props={{csvData: data, numDevs: numDevs}} />}
        </ResponsiveContainer>
        <ResponsiveContainer>
            {headers.length > 0 && <CompoundTable 
            filterStatuses={['Open']}
            displayHeaders={["Created", "Status", "Updated", "Assignee", "Issue key"]} 
            allHeaders={headers} 
            rows={rows} />}
            {headers.length > 0 && <CompoundTable 
            filterStatuses={['In Progress', "In Review"]}
            displayHeaders={["Created", "Status", "Updated", "Assignee", "Issue key"]} 
            allHeaders={headers} 
            rows={rows} />}
            {headers.length > 0 && <CompoundTable 
            filterStatuses={['Resolved', "Closed"]}
            displayHeaders={["Created", "Status", "Updated", "Assignee", "Issue key"]} 
            allHeaders={headers} 
            rows={rows} />} 
        </ResponsiveContainer>
        </>
    );
};

export default DataView;
