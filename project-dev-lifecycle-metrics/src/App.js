import React from 'react';

import { Provider } from 'react-redux'
import store from './store'

import './App.css';

import CsvUploader from './view/components/CsvUploader.js';
import DataView from './view/DataView.js';
import InputCountOfDevs from './view/InputCountOfDevs.js';

function App() {

  return (
    <Provider store={store}>
      <CsvUploader/>
      <InputCountOfDevs/>
      <DataView/>
    </Provider>
  );
}

export default App;