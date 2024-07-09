import React from 'react';
import { useSelector } from 'react-redux'
import ResponsiveContainer from './components/ResponsiveContainer';
import CompoundTable from './components/CompoundTable';
import BurnupChart from './components/BurnupChart';
import BurndownChart from './components/BurndownChart';
import './Cta.css';
import EmptyState from "./components/EmptyState";


const DataView = ({props}) => {
    const { override } = props;
    const { headers, rows, data, numDevs } = useSelector((state) => state.csvData);

    let uniqueAssignees;

    if (headers.length > 1) {
        uniqueAssignees = new Set(data.map(item => item.Assignee));
        uniqueAssignees = uniqueAssignees.size - 1;
    }

    const devCount = override ? numDevs : uniqueAssignees;
 
    return (
        <>
            {headers.length > 0 ? <>
            <ResponsiveContainer>
                <div><BurnupChart props={{csvData: data, numDevs: devCount}}/></div>

                <div> <BurndownChart props={{csvData: data, numDevs: devCount}}/></div>
            </ResponsiveContainer>
            <ResponsiveContainer>
                <CompoundTable
                    filterStatuses={['Open']}
                    displayHeaders={["Created", "Status", "Updated", "Assignee", "Issue key"]}
                    allHeaders={headers}
                    rows={rows}/>
                <CompoundTable
                    filterStatuses={['In Progress', "In Review"]}
                    displayHeaders={["Created", "Status", "Updated", "Assignee", "Issue key"]}
                    allHeaders={headers}
                    rows={rows}/>
                <CompoundTable
                    filterStatuses={['Resolved', "Closed"]}
                    displayHeaders={["Created", "Status", "Updated", "Assignee", "Issue key"]}
                    allHeaders={headers}
                    rows={rows}/>
            </ResponsiveContainer>
                </> : <EmptyState/>
}
        </>
    );
};

export default DataView;
