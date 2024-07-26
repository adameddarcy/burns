import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const calculateCycleTimes = (data) => {
    return data.map(issue => {
        const createdDate = new Date(issue.Created);
        const updatedDate = new Date(issue.Updated);
        const cycleTime = (updatedDate - createdDate) / (1000 * 60 * 60 * 24); // Cycle time in days
        return { createdDate, cycleTime };
    });
};

const ControlChart = ({ data }) => {
    const cycleTimes = calculateCycleTimes(data);

    // Sort cycle times by createdDate
    cycleTimes.sort((a, b) => a.createdDate - b.createdDate);

    const labels = cycleTimes.map(item => item.createdDate.toISOString().split('T')[0]);
    const cycleTimeData = cycleTimes.map(item => item.cycleTime);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Cycle Time (days)',
                data: cycleTimeData,
                borderColor: '#36A2EB',
                fill: false,
            },
        ],
    };

    return (
        <div style={{ width: '40vh', height: '40vh' }}>
            <h2>Control Chart (Cycle Time)</h2>
            <Line data={chartData} />
        </div>
    );
};

export default ControlChart;
