import { SET_CSV_DATA, SET_REDUCED_CSV_DATA, SET_NUM_DEVS, SET_CSV_DATA_RAW } from './actions';

const initialState = {
    headers: [],
    rows: [],
    reducedHeaders: [],
    reducedRows: [],
    numDevs: 1,
};

const csvReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CSV_DATA_RAW:
            return {
                ...state,
                data: action.payload.data
            };
        case SET_CSV_DATA:
            return {
                ...state,
                headers: action.payload.headers,
                rows: action.payload.rows,
            };
        case SET_REDUCED_CSV_DATA:
            return {
                ...state,
                reducedHeaders: action.payload.headers,
                reducedRows: action.payload.rows,
            };
        case SET_NUM_DEVS:
            return {
                ...state,
                numDevs: action.payload,
            };
        default:
            return state;
    }
};

export default csvReducer;