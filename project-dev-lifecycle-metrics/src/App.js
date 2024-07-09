import React from 'react';

import { Provider } from 'react-redux'
import store from './store'

import './App.css';
import './view/Cta.css';

import CsvUploader from './view/components/CsvUploader.js';
import DataView from './view/DataView.js';
import InputCountOfDevs from './view/InputCountOfDevs.js';
import DevCount from "./view/DevCount";
import ResponsiveContainer from "./view/components/ResponsiveContainer";
import Checkbox from "./view/components/Checkbox";

function App() {

    const [override, setOverride] = React.useState(false);

  return (
      <Provider store={store}>
          <ResponsiveContainer>
              <div className={"instructions"}>
                      <h2>Instructions</h2>
                      <ol>
                          <li>In Jira, create a filter against your Epic.</li>
                          <li>Export CSV.</li>
                          <li>Upload your CSV to generate your charts.</li>
                          <li>The number of developers active on the project will be calculated automatically from the
                              Assignee column. But you can override this with a manual average number of developers.
                          </li>
                          <li>Refresh to create a new chart and repeat.</li>
                      </ol>
                      <article>You can provide how many developers on average have been working on this project. If no
                          value is assigned we will calculate an average from the Jira data.
                      </article>
              </div>
              <div className={"right-item"}>
                  <CsvUploader/>
                  <div className={"highlight-override"}>
                      <InputCountOfDevs/>
                      <Checkbox props={{override: override, setOverride: setOverride}} />
                  </div>
                  <DevCount props={{override: override}}/>
              </div>
          </ResponsiveContainer>
          <DataView props={{override: override}}/>
      </Provider>
  );
}

export default App;
