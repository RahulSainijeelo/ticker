import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./TimeDurationModal.css";

const TimeDurationModal = ({ isOpen, onClose, onTimeSelect }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const handleClose = () => {
    onClose();
  };

  const handleOk = () => {
    const totalTimeInMinutes = hours * 60 + minutes;
    if (totalTimeInMinutes > 0) {
      onTimeSelect(totalTimeInMinutes);
      onClose();
    }
  };

  const isDisabled = hours === 0 && minutes === 0;

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="gamemodal" onClick={handleClose}>
      <div className="gamemodal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="gamemodal-title">Set Play Duration</h3>

        <div className="gamemodal-time">
          <div className="gamemodal-time-row">
            <label className="gamemodal-time-label">Hours:</label>
            <input
              className="gamemodal-time-input"
              type="number"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              min="0"
              max="23"
            />
          </div>
          <div className="gamemodal-time-row">
            <label className="gamemodal-time-label">Minutes:</label>
            <input
              className="gamemodal-time-input"
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              min="0"
              max="59"
            />
          </div>
        </div>

        <div className="gamemodal-buttons">
          <button
            className={`gamemodal-btn confirm ${isDisabled ? "disabled" : ""}`}
            onClick={handleOk}
            disabled={isDisabled}
          >
            Start
          </button>
          <button className="gamemodal-btn cancel" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TimeDurationModal;
