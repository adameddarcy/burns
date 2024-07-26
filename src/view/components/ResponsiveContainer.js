import React from 'react';
import './ResponsiveContainerStyle.css';

const ResponsiveContainer = ({ children }) => {
  return (
    <div className="responsive-container-charts">
      {children}
    </div>
  );
};

export default ResponsiveContainer;
