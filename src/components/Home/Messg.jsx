import React, { useEffect, useRef, useState } from "react";
import "./Messg.css";
import Edit from "./Edit";
import Check from "./check";
import { getFromLocalStorage } from "../../utils/getLocal";
import Back from "./Back";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";

export default function Messg() {
  const pRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const ngi = useNavigate();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const [tempInput, setTempInput] = useState("");
  const [edit, setEdit] = useState(false);
  const [pt, setPt] = useState(false);
  const params =
    Number(Object.fromEntries([...searchParams]).day) == moment().date();
  const toggleEdit = () => {
    edit == true ? setEdit(false) : setEdit(true);
    setTempInput(message);
  };
  const handleInput = (event) => {
    setTempInput(event.target.value);
  };

  const handleGol = () => {
    let goal = localStorage.getItem("goal") || "No Goal";
    let res = tempInput === "" ? goal : tempInput;
    localStorage.setItem("goal", res);
    setMessage(res);
    toggleEdit();
  };

  useEffect(() => {
    const element = pRef.current;
    if (element && element.scrollWidth > element.clientWidth) {
      setIsOverflowing(true);
    } else {
      setIsOverflowing(false);
    }

    let { goal, elapsed } = getFromLocalStorage("goal", "elapsed");
    setMessage(goal || "No Goal");
    setTempInput(goal || "No Goal");
    let progress = elapsed || 0;
    progress == 0 ? setPt(true) : setPt(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "Enter": {
          handleGol();
          break;
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [tempInput])

  const Msg = () => {
    return (
      <div className="scrtext">
        <div
          ref={pRef}
          className={`scr-text scr-text2 ${isOverflowing ? "overflow" : ""}`}
        >
          {message}
        </div>
      </div>
    );
  };
  const Edt = () => {
    return (
      <div className="scredt">
        <input
          id="helllll"
          autoFocus
          value={tempInput}
          onChange={handleInput}
          type="text"
        />
      </div>
    );
  };

  const hndBack = () => {
    ngi("/");
  };
  return (
    <div className="screen">
      {edit ? <Edt /> : <Msg />}
      {params && (
        <div className="scredit">
          {edit == false ? (
            <div onClick={toggleEdit}>
              <Edit></Edit>
            </div>
          ) : (
            <div onClick={handleGol}>
              <Check></Check>
            </div>
          )}
        </div>
      )}
      <div className="backscreen" onClick={hndBack}>
        <Back></Back>
      </div>
    </div>
  );
}
