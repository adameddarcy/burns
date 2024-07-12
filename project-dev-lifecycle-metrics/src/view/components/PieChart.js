import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PieChart = ({ data }) => {
    // Process the data to get the count of each status
    const statusCounts = data.reduce((acc, issue) => {
        acc[issue.Status] = (acc[issue.Status] || 0) + 1;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(statusCounts),
        datasets: [
            {
                data: Object.values(statusCounts),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ],
            },
        ],
    };
    const options = {
        maintainAspectRatio: false,
    };

    return (
        <div style={{ width: '40vh', height: '20vh' }}>
            <h2>Issue Status Distribution</h2>
            <Pie data={chartData} options={options}/>
        </div>
    );
};

export default PieChart;
