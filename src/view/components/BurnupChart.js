import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler } from 'chart.js';
import { calculateMovingAverage } from '../../logic/calculateMovingAverage';
import exportAsImage from '../../data/download';
import './DownloadButton.css';

import ReactGA from "react-ga";

const useAnalyticsEventTracker = (category="Upload Category") => {
    const eventTracker = (action = "upload action", label = "upload label") => {
        ReactGA.event({category, action, label});
    }
    return eventTracker;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler);

const BurnupChart = ({ extendedDates, extendedResolvedCounts, predictedCompletionDate, resolvedCounts }) => {
    const gaEventTracker = useAnalyticsEventTracker('Download Burnup');
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (extendedDates) {
            // Calculate moving average
            const windowSize = 7;
            const movingAverage = calculateMovingAverage(resolvedCounts, windowSize);
            const formattedDates = extendedDates.map(date => date.toISOString().split('T')[0]);
            const today = new Date().toISOString().split('T')[0];

            const data = {
                labels: formattedDates,
                datasets: [{
                    label: 'Predicted Completion Date',
                    data: Array(formattedDates.length).fill(null).map((_, index) => index === formattedDates.indexOf(predictedCompletionDate.toISOString().split('T')[0]) ? extendedResolvedCounts[formattedDates.indexOf(predictedCompletionDate.toISOString().split('T')[0])] : null),
                    borderColor: 'rgba(255, 165, 0, 1)',
                    backgroundColor: 'rgba(255, 165, 0, 0.2)',
                    fill: false,
                    pointRadius: 5,
                    pointBackgroundColor: 'rgba(255, 165, 0, 1)',
                    pointBorderColor: 'rgba(255, 165, 0, 1)',
                    showLine: false
                },
                    {
                    label: 'Resolved Issues',
                    data: extendedResolvedCounts,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.1
                }, {
                    label: '7-Day Moving Average',
                    data: movingAverage,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: false,
                    tension: 0.1,
                    borderDash: [10, 5] // Add dashed line for the moving average
                }]
            }

            const options = {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'week',
                            tooltipFormat: 'MMM dd yyyy',
                            displayFormats: {
                                day: 'MMM dd yyyy'
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
                        text: `Burn-up Chart - ${today}`
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const date = context.label;
                                const resolved = context.raw;
                                return `Date: ${date}\nResolved Issues: ${resolved}`;
                            }
                        }
                    },
                    annotation: {
                        annotations: [{
                            type: 'line',
                            mode: 'vertical',
                            scaleID: 'x',
                            value: predictedCompletionDate.toISOString().split('T')[0],
                            borderColor: 'red',
                            borderWidth: 2,
                            label: {
                                content: 'Predicted Completion Date',
                                enabled: true,
                                position: 'top'
                            }
                        }]
                    }
                }
            };

            setChartData({ data, options });
        }
    }, [extendedDates, extendedResolvedCounts, predictedCompletionDate, resolvedCounts]);

    return chartData ?
        <>
            <button className="download-button" type="button" onClick={() => {exportAsImage(document.getElementById('downloadBurndown'), `Burnup Chart - ${new Date().toISOString().split('T')[0]}`); gaEventTracker('Download Burnup')}}>Download Burnup</button>
            <Line id="downloadBurndown" data={chartData.data} options={chartData.options} />
        </>
        : null;
};

export default BurnupChart;
