import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./TimeDurationModal.css";

const Switch = ({ isOpen, onClose, onConfirm, toggle }) => {
    const [goals, setGoals] = useState([]);
    const handleClose = () => {
        onClose();
    };
    const handleClick = (goal) => {
        onClose();
        onConfirm(goal);
    };
    const handleReset = () => {
        onClose();
        toggle();
    }

    const formatTime = (seconds) => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };


    useEffect(() => {
        const goals = JSON.parse(localStorage.getItem("remain"));
        setGoals(goals);
    }, [])
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="switchpro" onClick={handleClose}>
            <div className="switchproa" onClick={(e) => e.stopPropagation()}>
                <div className="goal-list">
                    {goals?.length > 0 &&
                        goals.map((goal, index) => (
                            <div key={index} className="switchproab" onClick={() => handleClick(goal)}>
                                <span>{goal.goal + " ~ "}</span>
                                <span>{goal.startAt + " / "}</span>
                                <span>{formatTime(goal.elapsed)}</span>
                            </div>

                        ))}
                </div>

                <div className="tdmdlswitch" onClick={() => handleClick()}>
                    <div className="tdmdlswitchplus">+</div>
                    <div>Create New</div>
                </div>

                <div className="switchproab" onClick={() => handleReset()} style={{ width: "100px", alignSelf: "center", marginTop: "10px", marginLeft: "30%" }}>
                    <div>RESET</div>
                </div>
            </div>
        </div>,
        document.body
    );

};

export default Switch;
