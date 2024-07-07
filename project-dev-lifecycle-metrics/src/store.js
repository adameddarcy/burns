import { configureStore, combineReducers } from '@reduxjs/toolkit'
import csvReducer from './data/reducers.js';

const rootReducer = combineReducers({
    csvData: csvReducer,
});

const store = configureStore({
    reducer: rootReducer
});

export default store;
