import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const parseDate = (dateString) => {
    // Convert the date string to a Date object, handle various formats if necessary
    return new Date(dateString);
};

const calculateBurndownData = (rows, numDevs) => {
    rows.forEach(row => {
        row.Created = parseDate(row.Created);
        row.Updated = parseDate(row.Updated);
    });

    const closedStatus = 'Closed';

    if (rows[0].Created && rows[0].Updated) {
        rows.forEach(item => {
            item.ResolutionTime = (item.Updated - item.Created) / (1000 * 60 * 60 * 24);
        });
        console.log(numDevs)
        const averageResolutionTime = rows.reduce((sum, item) => sum + item.ResolutionTime, 0) / rows.length / numDevs;
        console.log(averageResolutionTime)
        const startDate = new Date(Math.min(...rows.map(item => item.Created)));
        const currentDate = new Date();
        const dates = [];
        for (let d = new Date(startDate); d <= currentDate; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d));
        }

        const unresolvedCounts = dates.map(date => rows.filter(item => item.Created <= date && item.Updated > date).length);
        const resolvedCounts = dates.map(date => rows.filter(item => item.Updated <= date && item.Status === closedStatus).length);

        const totalIssues = rows.length;
        const remainingIssues = totalIssues - resolvedCounts[resolvedCounts.length - 1];
        const predictedCompletionTimeDays = remainingIssues * averageResolutionTime;
        const predictedCompletionDate = new Date(currentDate.getTime() + predictedCompletionTimeDays * (1000 * 60 * 60 * 24)) || new Date(currentDate.getTime() * (1000 * 60 * 60 * 24));

        const extendedDates = [...dates, predictedCompletionDate];
        const extendedResolvedCounts = [...resolvedCounts, totalIssues];

        // createBurndownChart(dates, unresolvedCounts);
        // createBurnupChart(extendedDates, extendedResolvedCounts, predictedCompletionDate);
        return { dates, unresolvedCounts, resolvedCounts, predictedCompletionDate, extendedDates, extendedResolvedCounts };
    } else {
        console.error('Required date columns ("Created" and "Updated") are missing.');
    }
};

const BurndownChart = ({props}) => {

    const {csvData, numDevs} = props;

    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (csvData.length > 0 && numDevs > 0) {
            const { dates, unresolvedCounts } = calculateBurndownData(csvData, numDevs);

            const formattedDates = dates.map(date => date.toISOString().split('T')[0]);
            const today = new Date().toISOString().split('T')[0];

            const data = {
                labels: formattedDates,
                datasets: [{
                    label: 'Unresolved Issues',
                    data: unresolvedCounts,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.1
                }]
            }

            const options = {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            tooltipFormat: 'MMM dd yy',
                            displayFormats: {
                                day: 'MMM dd yy'
                            }
                        },
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Number of Unresolved Issues'
                        },
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: `Burndown Chart - ${today}`
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const date = context.label;
                                const unresolved = context.raw;
                                return `Date: ${date}\nUnresolved Issues: ${unresolved}`;
                            }
                        }
                    }
                }
            }

            setChartData({ data, options });
        }
    }, [csvData, numDevs]);

    return chartData ? <Line data={chartData.data} options={chartData.options} /> : null;
};

export default BurndownChart;