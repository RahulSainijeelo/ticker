import React from "react";
import "./Status.css"; // Import the custom CSS
import stats from "../../utils/stats";

export default function Status({ timeArray }) {
  // Handle case when timeArray is missing or empty
  if (!timeArray || timeArray.length === 0) {
    return (
      <div className="time-tracker r10sclr1">
        <p className="time">0.0 hrs</p>
        <p className="milestone">No progress yet!</p>
      </div>
    );
  }

  // Get stats when timeArray is valid
  const { className, milestoneMessage, elapsedTime } = stats(timeArray);

  return (
    <div className={`time-tracker ${className}`}>
      <p className="time">{elapsedTime.toFixed(1)} hrs</p>
      <p className="milestone">{milestoneMessage}</p>
    </div>
  );
}
