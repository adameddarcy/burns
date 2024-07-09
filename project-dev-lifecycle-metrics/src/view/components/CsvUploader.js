import React from 'react';
import { useDispatch } from 'react-redux';
import { setCsvData, setReducedCsvData, setCsvDataRaw } from '../../data/actions';
import {useSelector} from "react-redux";
import Papa from 'papaparse';
import './../Cta.css';

const CsvUploader = () => {

    const { headers } = useSelector((state) => state.csvData);

    const dispatch = useDispatch();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const text = e.target.result;

            // Use PapaParse to parse CSV data
            Papa.parse(text, {
                header: true,
                skipEmptyLines: true,
                complete: function(results) {
                    const data = results.data;

                    dispatch(setCsvDataRaw({ data: data }));

                    const headers = results.meta.fields;
                    const rows = data.map(row => headers.map(header => row[header] || null));

                    // Dispatch original CSV data
                    dispatch(setCsvData({ headers, rows }));

                    // Reduce CSV data to required headers
                    const requiredHeaders = ['Created', 'Status', 'Updated', 'Assignee', 'Issue key'];
                    const reducedHeaderIndexes = requiredHeaders.map(header => headers.indexOf(header)).filter(index => index !== -1);
                    const reducedHeaders = reducedHeaderIndexes.map(index => headers[index]);
                    const reducedRows = rows.map(row => reducedHeaderIndexes.map(index => row[index]));

                    // Dispatch reduced CSV data
                    dispatch(setReducedCsvData({ headers: reducedHeaders, rows: reducedRows }));
                }
            });
        };

        reader.readAsText(file);
    };

    const disabled = headers.length > 1 ? 'cta-item-hidden' : 'cta-item';

    return (
            <div className={disabled}>
                <label htmlFor="file-upload">Upload File</label>
                <input type="file" id="file-upload" className={"display-field"} accept=".csv" onChange={handleFileUpload}/>
            </div>
    )
}

export default CsvUploader;
