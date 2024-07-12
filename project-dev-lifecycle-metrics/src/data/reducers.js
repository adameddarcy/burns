import {SET_NUM_DEVS, SET_CSV_DATA_RAW, SET_READY, SET_BURNDATA, SET_FINISH} from './actions';

const initialState = {
    ready: false,
    csv: {},
    count: 1,
    finish: 0
    // burndata: []
    // burndata: {
    //     extendedDates: [], extendedResolvedCounts: [], predictedCompletionDate: null, resolvedCounts: [], dates: [], unresolvedCounts: []
    // }
};

const csvReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_READY:
            return {
                ...state,
                ready: action.payload.ready
            };
        case SET_CSV_DATA_RAW:
            return {
                ...state.csv,
                csv: action.payload.csv
            };
        case SET_NUM_DEVS:
            return {
                ...state,
                count: action.payload.count,
            };
        case SET_FINISH:
            return {
                ...state,
                finish: action.payload.finish,
            }
        // case SET_BURNDATA:
        //     return {
        //         ...state,
        //         burndata: action.payload.burndata
        //         // burndata: {
        //         //     ...state.burndata, // spread existing burndata properties
        //         //     ...action.payload.burndata, // spread new burndata properties to update state
        //         // }
        //     };
        default:
            return state;
    }
};

export default csvReducer;
