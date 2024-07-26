import React from 'react';
import PropTypes from 'prop-types';
import './CompoundTableStyle.css'

const statusColors = {
    Open: ['#D3D3D3', '#E0E0E0'],        // Light grey shades
    Closed: ['#90EE90', '#A1F0A1'],      // Light green shades
    Resolved: ['#90EE90', '#A1F0A1'],    // Light green shades
    'In Progress': ['#ADD8E6', '#BDE5F1'], // Light blue shades
    'In Review': ['#ADD8E6', '#BDE5F1'],   // Light blue shades
};

const CompoundTable = ({ data, statuses }) => {
    const filteredRows = data.filter(row => statuses.includes(row.Status));

    const getRowColor = (status, rowIndex) => {
        const shades = statusColors[status] || ['white', 'white'];
        return shades[rowIndex % 2]; // Alternate between shades for even and odd rows
    };

    const calculateDaysInWip = (created, updated) => {
        const createdDate = new Date(created);
        const updatedDate = new Date(updated);
        const differenceInTime = updatedDate - createdDate;
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        return differenceInDays.toFixed(2); // Returns the difference in days rounded to 2 decimal places
    };

    const displayHeaders = ["Issue key", "Assignee", "Created", "Updated", "Status"];
    if (statuses.includes('In Progress') || statuses.includes('In Review')) {
        displayHeaders.push('Days in WIP');
    }

    return (
        <div className="table-container">
            <h2>{statuses.join(', ')} Statuses</h2>
            <table className="table">
                <thead>
                <tr>
                    {displayHeaders.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {filteredRows.map((row, rowIndex) => {
                    const rowColor = getRowColor(row.Status, rowIndex);
                    const daysInWip = (row.Status === 'In Progress' || row.Status === 'In Review')
                        ? calculateDaysInWip(row.Created, row.Updated)
                        : null;
                    return (
                        <tr key={rowIndex} style={{ backgroundColor: rowColor }}>
                            {displayHeaders.map((header, cellIndex) => (
                                <td key={cellIndex}>
                                    {header === "Created" || header === "Updated" ? new Date(row[header]).toLocaleString() : row[header]}
                                    {header === "Days in WIP" && daysInWip}
                                </td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

CompoundTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        "Issue key": PropTypes.string.isRequired,
        "Issue id": PropTypes.string.isRequired,
        "Assignee": PropTypes.string.isRequired,
        "Status": PropTypes.string.isRequired,
        "Created": PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
        "Updated": PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
        "ResolutionTime": PropTypes.number.isRequired,
    })).isRequired,
    statuses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CompoundTable;
