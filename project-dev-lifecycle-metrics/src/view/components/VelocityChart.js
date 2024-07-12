import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const calculateSprint = (issueDate, startDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const daysBetween = Math.floor((issueDate - startDate) / oneDay);
    return Math.floor(daysBetween / 5) + 1;
};

const VelocityChart = ({ data }) => {
    // Extract creation dates and convert them to Date objects
    const issueDates = data.map(issue => new Date(issue.Created));

    // Find the start date of the first sprint
    const startDate = new Date(Math.min(...issueDates));

    // Calculate the sprint for each issue
    const sprintCounts = data.reduce((acc, issue) => {
        const issueDate = new Date(issue.Created);
        const sprint = calculateSprint(issueDate, startDate);
        acc[sprint] = (acc[sprint] || 0) + 1;
        return acc;
    }, {});

    // Prepare the data for the chart
    const sprints = Object.keys(sprintCounts).map(Number);
    const velocityData = sprints.map(sprint => sprintCounts[sprint]);

    const chartData = {
        labels: sprints.map(sprint => `Sprint ${sprint}`),
        datasets: [
            {
                label: 'Velocity (Story Points) - Assumes 5 day sprints',
                data: velocityData,
                backgroundColor: '#36A2EB',
            },
        ],
    };

    return (
        <div style={{ width: '40vh', height: '20vh' }}>
            <h2>Velocity Chart</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default VelocityChart;
