import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./ConfirmSwitch.css"

import "./TimeDurationModal.css";
import {
  removeFromLocalStorage,
} from "../../utils/getLocal";
const ConfirmReset = ({ isOpen, onClose,onReset}) => {
  const handleClose = () => {
    onClose();
  };

  const handleOk = () => {
    removeFromLocalStorage(
      "startAt",
      "endAt",
      "elapsed",
      "goal",
      "stamp",
      "pause"
    );
    onReset()
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="switchpro" onClick={handleClose}>
            <div className="switchproa" onClick={(e) => e.stopPropagation()}>
                <p className="switchpro-text">Are you sure you want to proceed?</p>
    
                <div className="switchpro-buttons">
                    <button className="switchpro-btn confirm" onClick={handleOk}>Yes, Continue</button>
                    <button className="switchpro-btn cancel" onClick={handleClose}>No, Go Back</button>
                </div>
            </div>
        </div>,
    document.body
  );
};

export default ConfirmReset;
