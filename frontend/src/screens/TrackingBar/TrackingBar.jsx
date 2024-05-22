import React from 'react';
import './TrackingBar.css';

const TrackingBar = ({ steps }) => {
  return (
    <div className="tracking-container">
      {steps.map((step, index) => (
        <div className={`tracking-step ${step.isActive ? 'active' : ''}`} key={index}>
          <div className="tracking-circle"></div>
          {index !== steps.length - 1 && <div className="tracking-bar"></div>}
          <div className="tracking-label">{step.label}</div>
          <div className="tracking-timing">{step.timing}</div>
        </div>
      ))}
    </div>
  );
};

export default TrackingBar;
