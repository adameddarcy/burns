import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {calculateBurns} from "../logic/calculateBurns";
import {setBurndata, setFinish} from "../data/actions";


const DataView = () => {
    const { ready, csv, count } = useSelector((state) => state.csvData);

    const dispatch = useDispatch();

    dispatch(setFinish({ finish: 200 }))
    //
    // if (ready) {
    //     const { extendedDates, extendedResolvedCounts, predictedCompletionDate, resolvedCounts, dates, unresolvedCounts } = calculateBurns(csv.csv, count);
    //     dispatch(setFinish({ finish: 1 }))
    //     // dispatch(setBurndata(resolvedCounts))
    //     // dispatch(setBurndata({ burndata: {
    //     //     extendedDates: extendedDates,
    //     //     extendedResolvedCounts: extendedResolvedCounts,
    //     //     predictedCompletionDate: predictedCompletionDate,
    //     //     resolvedCounts: resolvedCounts,
    //     //     dates: dates,
    //     //     unresolvedCounts: unresolvedCounts
    //     //     }
    //     // }));
    //
    // }

    return <></>
};

export default DataView;
