import React from "react";
import Messg from "./Messg";
import LeftArrow from "./leftArrow";
import RightArrow from "./RightArrow";

export default function HeaderSection({ ins, decreaseMonth, increaseMonth }) {
  return (
    <>
      {ins ? (
        <div className="r1s1scr">
          <Messg />
        </div>
      ) : (
        <>
          <div className="rst rst1" onClick={decreaseMonth}>
            <LeftArrow />
          </div>
          <div className="rst rst2" onClick={increaseMonth}>
            <RightArrow />
          </div>
        </>
      )}
      <div className="r2s">
        <img src="image.jpeg" alt="" />
      </div>
    </>
  );
}