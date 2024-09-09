import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeLow, faSlidersH, faMicrophone } from '@fortawesome/free-solid-svg-icons';

const AudioControls = () => {
  return (
    <div className="audio-controls">
      <div className="control-card">
        <FontAwesomeIcon icon={faMicrophone} size="2x" />
        <h3>Microphone</h3>
        <p>Select your microphone device.</p>
        <div className="device-selection">
          <select>
            <option>Microphone 1</option>
            <option>Microphone 2</option>
          </select>
        </div>
      </div>
      <div className="control-card">
      <FontAwesomeIcon icon={faVolumeLow} size="2x" />
        <h3>Volume</h3>
        <p>Adjust the volume level.</p>
        <div className="filter-toggle">
          <button className="toggle-button">Adjust Volume</button>
        </div>
      </div>
      <div className="control-card">
        <FontAwesomeIcon icon={faSlidersH} size="2x" />
        <h3>Filter</h3>
        <p>Toggle audio filters on or off.</p>
        <div className="filter-toggle">
          <button className="toggle-button">Toggle Filter</button>
        </div>
      </div>

      <style jsx>{`
        .audio-controls {
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: auto;
        }

        .control-card {
          width: 100%;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        .control-card h3 {
          margin: 10px 0;
        }

        .control-card p {
          margin-bottom: 15px;
          text-align: center;
        }

        .device-selection, .filter-toggle {
          width: 100%;
          text-align: center;
        }

        select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          background-color: #fff;
          font-size: 16px;
        }

        .toggle-button {
          width: 100%;
          padding: 12px;
          border: none;
          background-color: #0070f3;
          color: white;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .toggle-button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default AudioControls;
