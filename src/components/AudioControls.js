import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilter } from '../redux/actions/audioActions'; // Action to toggle filter

const AudioControls = () => {
  const dispatch = useDispatch();
  const { filterEnabled } = useSelector((state) => state.audio); // Get the filter state from Redux
  const [inputDevices, setInputDevices] = useState([]);
  const [outputDevices, setOutputDevices] = useState([]);
  const [selectedInput, setSelectedInput] = useState('');
  const [selectedOutput, setSelectedOutput] = useState('');

  // Fetch audio input/output devices
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        const inputs = devices.filter(device => device.kind === 'audioinput');
        const outputs = devices.filter(device => device.kind === 'audiooutput');
        setInputDevices(inputs);
        setOutputDevices(outputs);
      });
  }, []);

  // Handle input/output change
  const handleInputChange = (e) => {
    setSelectedInput(e.target.value);
    // Handle setting the input device
  };

  const handleOutputChange = (e) => {
    setSelectedOutput(e.target.value);
    // Handle setting the output device
  };

  // Toggle the audio filter (gain and frequency filter)
  const handleFilterToggle = () => {
    dispatch(toggleFilter());
  };

  return (
    <div className="audio-controls">
      <div className="device-selection">
        <div className="input-device">
          <label htmlFor="inputSelect">Select Input Device:</label>
          <select id="inputSelect" value={selectedInput} onChange={handleInputChange}>
            {inputDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Input ${device.deviceId}`}
              </option>
            ))}
          </select>
        </div>

        <div className="output-device">
          <label htmlFor="outputSelect">Select Output Device:</label>
          <select id="outputSelect" value={selectedOutput} onChange={handleOutputChange}>
            {outputDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Output ${device.deviceId}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-toggle">
        <button className={`toggle-button ${filterEnabled ? 'enabled' : 'disabled'}`} onClick={handleFilterToggle}>
          {filterEnabled ? 'Disable Filter' : 'Enable Filter'}
        </button>
      </div>

      <style jsx>{`
        .audio-controls {
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .device-selection {
          margin-bottom: 20px;
        }

        select {
          margin-left: 10px;
          padding: 5px;
        }

        .filter-toggle {
          margin-top: 20px;
        }

        .toggle-button {
          padding: 10px 20px;
          border: none;
          background-color: #0070f3;
          color: white;
          border-radius: 5px;
          transition: background-color 0.3s ease;
          cursor: pointer;
        }

        .toggle-button.enabled {
          background-color: #28a745; /* Green when enabled */
        }

        .toggle-button.disabled {
          background-color: #dc3545; /* Red when disabled */
        }

        .toggle-button:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default AudioControls;
