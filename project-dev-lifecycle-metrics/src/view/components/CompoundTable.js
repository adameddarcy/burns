import React from 'react';
import PropTypes from 'prop-types';
import './CompoundTableStyle.css';

const statusColors = {
    Open: ['#D3D3D3', '#E0E0E0'],        // Light grey shades
    Closed: ['#90EE90', '#A1F0A1'],      // Light green shades
    Resolved: ['#90EE90', '#A1F0A1'],    // Light green shades
    'In Progress': ['#ADD8E6', '#BDE5F1'], // Light blue shades
    'In Review': ['#ADD8E6', '#BDE5F1'],   // Light blue shades
};

const CompoundTable = ({ displayHeaders, allHeaders, rows, filterStatuses }) => {
    const headerIndexes = displayHeaders.map(header => allHeaders.indexOf(header)).filter(index => index !== -1);

    const filteredRows = rows.filter(row => filterStatuses.includes(row[allHeaders.indexOf('Status')]));

    const getRowColor = (status, rowIndex) => {
        const shades = statusColors[status] || ['white', 'white'];
        return shades[rowIndex % 2]; // Alternate between shades for even and odd rows
    };

    return (
        <div className="compound-table-container">
            <h2>{filterStatuses.join(', ')} Statuses</h2>
            <table className="compound-table">
                <thead>
                    <tr>
                        {displayHeaders.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRows.map((row, rowIndex) => {
                        const status = row[allHeaders.indexOf('Status')];
                        const rowColor = getRowColor(status, rowIndex);
                        return (
                            <tr key={rowIndex} style={{ backgroundColor: rowColor }}>
                                {headerIndexes.map((index, cellIndex) => (
                                    <td key={cellIndex}>{row[index]}</td>
                                ))}
                                <td>{status}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

CompoundTable.propTypes = {
    displayHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
    allHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    filterStatuses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CompoundTable;