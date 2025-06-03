import React from "react";

export default function CalendarSection({ date, day }) {
  return (
    <div className="r3s">
      <div className="container">
        <div className="triangle">
          <div className="r3sd">
            <div className="year">{date.year()}</div>
            <hr />
            <div className="text">{date.format("MMM")}</div>
          </div>
        </div>
        <div className="circle">{day}</div>
      </div>
    </div>
  );
}