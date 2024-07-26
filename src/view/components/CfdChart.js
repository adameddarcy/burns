import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const calculateDateBuckets = (data, startDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const buckets = {};

    data.forEach(issue => {
        const createdDate = new Date(issue.Created);
        const daysSinceStart = Math.floor((createdDate - startDate) / oneDay);
        const bucketDate = new Date(startDate.getTime() + daysSinceStart * oneDay).toISOString().split('T')[0];

        if (!buckets[bucketDate]) {
            buckets[bucketDate] = { Open: 0, InProgress: 0, Done: 0 };
        }

        switch (issue.Status) {
            case 'Open':
                buckets[bucketDate].Open += 1;
                break;
            case 'In Progress':
                buckets[bucketDate].InProgress += 1;
                break;
            case 'Done':
                buckets[bucketDate].Done += 1;
                break;
            default:
                break;
        }
    });

    return buckets;
};

const CumulativeFlowDiagram = ({ data }) => {
    // Find the start date of the first issue
    const startDate = new Date(Math.min(...data.map(issue => new Date(issue.Created))));

    // Calculate buckets
    const buckets = calculateDateBuckets(data, startDate);

    // Prepare the data for the chart
    const labels = Object.keys(buckets).sort();
    const openData = labels.map(date => buckets[date].Open);
    const inProgressData = labels.map(date => buckets[date].InProgress);
    const doneData = labels.map(date => buckets[date].Done);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Open',
                data: openData,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
            },
            {
                label: 'In Progress',
                data: inProgressData,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
            },
            {
                label: 'Done',
                data: doneData,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    return (
        <div style={{ width: '40vh', height: '20vh' }}>
            <h2>Cumulative Flow Diagram</h2>
            <Line data={chartData} />
        </div>
    );
};

export default CumulativeFlowDiagram;
