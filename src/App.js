import React from 'react';

import './App.css';
import './view/Cta.css';
import './view/components/CompoundTableStyle.css';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import CsvUploader from './view/components/CsvUploader.js';
import BurnupChart from "./view/components/BurnupChart";
import BurndownChart from "./view/components/BurndownChart";
import EmptyState from "./view/components/EmptyState";

import {calculateBurns} from "./logic/calculateBurns";
import CompoundTable from "./view/components/CompoundTable";
import PieChart from "./view/components/PieChart";
import VelocityChart from "./view/components/VelocityChart";
import CfdChart from "./view/components/CfdChart";
import ControlChart from "./view/components/ControlChart";

import CatLogo from "./assets/catburns.png"


import ReactGA from 'react-ga';
const TRACKING_ID = "448822146"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function App() {

    const [ready, setReady] = React.useState(false);
    const [csv, setCsv] = React.useState([]);
    const [overrideAssignees, setOverrideAssignees] = React.useState(0);
    const [overrideVelocity, setOverrideVelocity] = React.useState(0);

    let uniqueAssignees;

    if (ready) {
        uniqueAssignees = new Set(csv.map(item => item.Assignee));
        uniqueAssignees = uniqueAssignees.size - 1;
    }

    const handleNumDevsChange = (event) => {
        setOverrideAssignees(event.target.value);
    };

    const handleVelocityChange = (event) => {
        setOverrideVelocity(event.target.value);
    };

    const calculations = ready ? calculateBurns(csv, overrideAssignees > 0 ? overrideAssignees : uniqueAssignees, overrideVelocity) : undefined;

    const responsiveCharts = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const responsiveTables = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 2
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <>
            <header class="site-header">
                <img src={CatLogo} alt="Site Logo" className="header-logo"/>
                <div className="logo">🚀Create Burnups and Burndowns in one click 🚀</div>
            </header>
            <div className={"chart-container"}>
            <div className={"chart"}>
                    <h2>Instructions</h2>
                    <ol>
                        <li>In Jira, create a filter against your Epic.</li>
                        <li>Export CSV.</li>
                        <li>Upload your CSV to generate your charts.</li>
                        <li>The number of developers active on the project will be calculated automatically from the
                            Assignee column. But you can override this with a manual average number of developers.
                        </li>
                        <li>Create as many charts as you would like.</li>
                    </ol>
                    <article>You can provide how many developers on average have been working on this project. If no
                        value is assigned we will calculate an average from the Jira data.
                    </article>
                    <br/>
                    <article>If you are starting a new project you can calculate your historic velocity from the
                        previous project(s). This should enable you
                        to get an idea of timelines even before work has begun! <br/> To achieve this, create a filter
                        of your previous project(s) then
                        copy the velocity calculated and apply that to your next project.
                    </article>
                </div>
                <div className={"chart"}>
                    <CsvUploader csv={csv} setCSV={setCsv} setReady={setReady}/>
                    <div className="highlight-override">
                        <label htmlFor="number-input">Override Number of Devs?</label>
                        <input id="number-input" type="number" value={overrideAssignees}
                               onChange={handleNumDevsChange} min="1"/>
                        {overrideAssignees !== 0 &&
                            <button className="clear-button" onClick={() => setOverrideAssignees(0)}>Clear Override Size
                            </button>
                        }
                    </div>
                    <div className="highlight-override">
                        <label htmlFor="number-input">Override Velocity?</label>
                        <input id="number-input" type="number" value={overrideVelocity}
                               onChange={handleVelocityChange} min="1"/>
                        {overrideVelocity !== 0 &&
                            <button className="clear-button" onClick={() => setOverrideVelocity(0)}>Clear Override
                                Velocity
                            </button>
                        }
                    </div>
                    {ready &&
                        <>
                            <div style={{paddingTop: '10px'}}>Your groups velocity per this project (Avg Resolution
                                Time)*
                                is: {Math.round((calculations.averageResolutionTime + Number.EPSILON) * 100) / 100} days.
                            </div>
                            <i className={"asterix"}>*This is calculated as: Average Resolution Time per Developer =
                                <table>
                                    <tr className={"math"}>
                                        <td className={"math"}>Total Resolution Time / Number of Developers</td>
                                    </tr>
                                    <tr>Number of Resolved Incidents</tr>
                                </table>
                                .</i>
                        </>
                    }
                </div>
            </div>
            {ready ?
                <>
                    <div className="chart-container">
                        <div className="chart">
                            <BurndownChart dates={calculations.dates} unresolvedCounts={calculations.unresolvedCounts}/>
                        </div>
                        <div className="chart">
                            <BurnupChart extendedDates={calculations.extendedDates}
                                         extendedResolvedCounts={calculations.extendedResolvedCounts}
                                         predictedCompletionDate={calculations.predictedCompletionDate}
                                         resolvedCounts={calculations.resolvedCounts}/>
                        </div>
                    </div>
                    <Carousel
                        responsive={responsiveCharts}
                        infinite={true}
                        partialVisbile={false}
                    >
                        <VelocityChart data={csv}/>
                        <ControlChart data={csv}/>
                        <CfdChart data={csv}/>
                        <PieChart data={csv}/>
                    </Carousel>
                    <div className={"table-row-container"}>
                        <CompoundTable data={csv} statuses={['In Progress', 'In Review']}/>
                        <CompoundTable data={csv} statuses={['Open']}/>
                        <CompoundTable data={csv} statuses={['Closed']}/>
                    </div>
                </>
                : <EmptyState/>}
            <footer className="site-footer">
                <div className="footer-content">
                    <p>&copy; 2024 Adam DArcy. All Rights Reserved.</p>
                    <div className="social-links">
                        <a href="https://github.com/adameddarcy/burns/" className="github" target="_blank"
                           rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub} /> GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/adamedarcy/" className="linkedin" target="_blank"
                           rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default App;
