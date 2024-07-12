import React from 'react';
import './EmptyStateStyle.css';
import emptystateimage from './../../assets/emptystate.jpg';

const EmptyState = () => {
    return (
        <div className="empty-state-container">
            <img src={emptystateimage} alt="No data" className="empty-state-image" />
            <p className="empty-state-text">No data yet, start by uploading your data</p>
        </div>
    );
};

export default EmptyState;
