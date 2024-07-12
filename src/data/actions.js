export const SET_NUM_DEVS = 'SET_NUM_DEVS';
export const SET_CSV_DATA_RAW = 'SET_CSV_DATA_RAW';
export const SET_READY = 'SET_READY';
export const SET_BURNDATA = 'SET_BURNDATA';
export const SET_FINISH = 'SET_FINISH';

export const setReady = (ready) => ({
    type: SET_READY,
    payload: ready,
});

export const setFinish = (finish) => ({
    type: SET_FINISH,
    payload: finish,
});

export const setCsvDataRaw = (csv) => ({
    type: SET_CSV_DATA_RAW,
    payload: {csv: csv},
});

export const setNumDevs = (count) => ({
    type: SET_NUM_DEVS,
    payload: count,
});

// export const setBurndata = (burndata) => ({
//     type: SET_BURNDATA,
//     payload: burndata,
// });
