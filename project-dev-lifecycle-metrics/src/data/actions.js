export const SET_CSV_DATA = 'SET_CSV_DATA';
export const SET_REDUCED_CSV_DATA = 'SET_REDUCED_CSV_DATA';
export const SET_NUM_DEVS = 'SET_NUM_DEVS';
export const SET_CSV_DATA_RAW = 'SET_CSV_DATA_RAW';

export const setCsvDataRaw = (data) => ({
    type: SET_CSV_DATA_RAW,
    payload: data,
});

export const setCsvData = (data) => ({
    type: SET_CSV_DATA,
    payload: data,
});

export const setReducedCsvData = (data) => ({
    type: SET_REDUCED_CSV_DATA,
    payload: data,
});

export const setNumDevs = (numDevs) => ({
    type: SET_NUM_DEVS,
    payload: numDevs,
});