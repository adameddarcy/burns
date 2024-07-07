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

const calculateBurnupData = (rows) => {
    rows.forEach(row => {
        row.Created = parseDate(row.Created);
        row.Updated = parseDate(row.Updated);
    });

    const startDate = new Date(Math.min(...rows.map(row => row.Created)));
    const endDate = new Date(Math.max(...rows.map(row => row.Updated)));
    const dates = [];

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
    }

    const totalIssues = rows.length;
    const resolvedCounts = dates.map(date => rows.filter(row => row.Updated <= date && row.Status === 'Resolved').length);

    return { dates, resolvedCounts, totalIssues };
};

const BurnupChart = () => {
    const csvData = useSelector((state) => state.csvData.data);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (csvData.length > 0) {
            const { dates, resolvedCounts, totalIssues } = calculateBurnupData(csvData);

            const data = {
                labels: dates.map(date => date.toISOString().split('T')[0]),
                datasets: [{
                    label: 'Resolved Issues',
                    data: resolvedCounts,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.1
                }]
            };

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
                            text: 'Number of Resolved Issues'
                        },
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Burnup Chart'
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const date = context.label;
                                const resolved = context.raw;
                                return `Date: ${date}\nResolved Issues: ${resolved}`;
                            }
                        }
                    }
                }
            };

            setChartData({ data, options });
        }
    }, [csvData]);

    return chartData ? <Line data={chartData.data} options={chartData.options} /> : null;
};

export default BurnupChart;