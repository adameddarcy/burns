import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import { calculateBurns } from "../../logic/calculateBurns";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler } from 'chart.js';
import {calculateMovingAverage} from "../../logic/calculateMovingAverage";
import exportAsImage from "../../data/download";
import './DownloadButton.css';
import ReactGA from "react-ga";

const useAnalyticsEventTracker = (category="Upload Category") => {
    const eventTracker = (action = "upload action", label = "upload label") => {
        ReactGA.event({category, action, label});
    }
    return eventTracker;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler);

const BurndownChart = ({ dates, unresolvedCounts }) => {
    const gaEventTracker = useAnalyticsEventTracker('Download Burndown');

    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (dates) {

            // Calculate moving average
            const windowSize = 7;
            const movingAverage = calculateMovingAverage(unresolvedCounts, windowSize);

            let datesSafe = []
            dates.forEach(i => !isNaN(i) ? datesSafe.push(i) : null)

            const formattedDates = datesSafe.map(date => date.toISOString().split('T')[0]);
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
    }, [dates, unresolvedCounts]);

    return chartData ?
        <>
            <>
                <button className={"download-button"} type="button" onClick={() => {exportAsImage(document.getElementById('downloadBurndown'), `Burndown Chart - ${new Date().toISOString().split('T')[0]}`); gaEventTracker('Download Burndown')}}>Download Burndown</button>
            </>
            <Line id={"downloadBurndown"} data={chartData.data} options={chartData.options} />
        </>
        : null;
};

export default BurndownChart;
