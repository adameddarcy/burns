import React, { useState } from 'react';
import Papa from 'papaparse';
import './../Cta.css';
import ReactGA from "react-ga";

const useAnalyticsEventTracker = (category="Upload Category") => {
    const eventTracker = (action = "upload action", label = "upload label") => {
        ReactGA.event({category, action, label});
    }
    return eventTracker;
}

const CsvUploader = ({ csv, setCSV, setReady }) => {
    const gaEventTracker = useAnalyticsEventTracker('Upload');
    const [fileName, setFileName] = useState('');

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFileName(file.name);
        const reader = new FileReader();

        reader.onload = (e) => {
            const text = e.target.result;

            gaEventTracker('Upload');

            // Use PapaParse to parse CSV data
            Papa.parse(text, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    const data = results.data;

                    setCSV(() => data);
                    setReady(true);
                },
            });
        };

        reader.readAsText(file);
    };

    return (
        <div className="csv-uploader-container">
            <label htmlFor="file-upload" className="upload-label">
                Upload File
            </label>
            <input type="file" id="file-upload" className="display-field" accept=".csv" onChange={handleFileUpload} />
            {fileName && <p className="file-name">{fileName}</p>}
        </div>
    );
};

export default CsvUploader;
