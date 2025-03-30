import React, { useState, useRef, useEffect, useMemo } from "react";
import "./Evel.css";
import { clr } from "../../utils/clr";
import CheckMark from "./checkMark";

export default function Evel({ data }) {
  const [cls, setCls] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const elapsedTime = useMemo(() => {
    if (!Array.isArray(data)) return 0;
    return data.reduce((sum, subArray) => {
      if (Array.isArray(subArray) && subArray.length > 2) {
        const duration = subArray[2];
        return sum + (typeof duration === "number" ? duration : 0);
      }
      return sum;
    }, 0);
  }, [data]);

  useEffect(() => {
    const newCls = clr(elapsedTime);
    if (newCls !== cls) {
      setCls(newCls);
    }
  }, [elapsedTime, cls]);

  useEffect(() => {
    if (contentRef.current && isOpen) {
      const newHeight = contentRef.current.scrollHeight;
      if (newHeight !== contentHeight) {
        setContentHeight(newHeight);
      }
    }
  }, [data, isOpen, contentHeight]);

  return (
    <div className={`r1sevel ${isOpen ? "open" : ""} ${cls}`}>
      <div className="custom-summary" onClick={handleToggle}>
        <span>So far {elapsedTime.toFixed(2)} Hrs</span>
      </div>

      <div
        className="custom-content"
        style={{
          height: isOpen ? contentHeight : 0,
          transition: "height 0.6s ease-in-out",
        }}
        ref={contentRef}
      >
        {data.map((item, index) => {
          if (Array.isArray(item) && item.length >= 3) {
            const [startTime, endTime, duration, goal] = item;
            return (
              <div key={index}>
                <div className="scr-text-wrapper">
                <p className="evl-text">
                {startTime}/{endTime}_{duration.toFixed(2)} hrs{" "}
                {goal ? ("~" + goal) : ""} <CheckMark/>
                </p>
                </div>
              </div>
            );
          }
          return <p key={index}>Invalid data</p>;
        })}
      </div>
    </div>
  );
}
