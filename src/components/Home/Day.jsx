import React, { useEffect, useState, useMemo } from "react";
import "./Day.css";
import Progress from "./Progress";
import Evel from "./Evel";
import { useSearchParams } from "react-router-dom";
import { getDayArray } from "../../utils/findMonth";
import Spinner from "./Spinner";
import ConfirmSwitch from "./ConfirmSwitch";
import Switch from "./Switch";
import { checkKeyExists, getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "../../utils/getLocal";
import ConfirmSwitchReset from "./ConfirmSwitchReset";

export default function Day() {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const allParams = Object.fromEntries([...searchParams]);
  const [status, setStatus] = useState(0)
  const [issetOpen, setIssetOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chosedGoal, setChosedGoal] = useState()
  const [toggle, setToggle] = useState(false);

  // Ensure `queryDay` is stable and consistent
  const queryDay = useMemo(() => {
    return Object.fromEntries(
      Object.entries(allParams).map(([key, value]) => [
        key,
        isNaN(Number(value)) ? 0 : Number(value),
      ])
    );
  }, [allParams]);
  useEffect(() => {
    let tkr = 0;
    const timer = setInterval(() => {
      const rawData = localStorage.getItem("streak");
      try {
        const mData = rawData ? JSON.parse(rawData) : null;
        if (mData && Array.isArray(mData) && mData.length > 0) {
          const dayArray = getDayArray(mData, queryDay.day, queryDay.month, queryDay.year);
          if (dayArray && dayArray.length > 0) {
            setData(dayArray || []);
          }
          setStatus(1)
        } else {
          setStatus(0)
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        setData([]);
      }
      if (tkr >= 3000) setStatus(1);
      tkr += 300;
    }, 300)
    if (status == 1) clearInterval(timer);
    return () => {
      clearInterval(timer)
    }
  }, [status, data]);

  useEffect(() => {
  }, [status])

  const handleCloseReset = () => {
    setIssetOpen(false);
  }

  const handleCloseModel = () => {
    setIsModalOpen(false)
  }

  const handlechose = (data) => {
    if (data) {
      setChosedGoal(data);
    }
    setIssetOpen(true);
  }

  const handleReset = ()=>{
    setIsResetOpen(true)
  }

  const Reset = ()=>{
    setIsResetOpen(false)
  }
  
  const ResetConfirm = ()=>{
    localStorage.removeItem("remain");
    setToggle(!toggle)
  }

  const handleSave = () => {
    let remain = JSON.parse((localStorage.getItem("remain"))) || [];
    const goal = getFromLocalStorage(
      "startAt",
      "duration",
      "elapsed",
      "goal",
      "stamp",
      "pause",
      "day"
    );
    if (!goal || !goal.startAt) return;
    let index = checkKeyExists({ goal: goal.goal, startAt: goal.startAt });
    if (index === false) {
      remain.push(goal);
    } else {
      remain[index] = goal;
    }
    localStorage.setItem("remain", JSON.stringify(remain));
  }

  const handleSwitch = () => {
    setIsModalOpen(true)
  }

  const handleConfirm = () => {
    if (chosedGoal) {
      setToLocalStorage(chosedGoal);
    } else {
      removeFromLocalStorage(
        "startAt",
        "endAt",
        "elapsed",
        "goal",
        "stamp",
        "pause",
        "day"
      );
    }
    setChosedGoal(null);
    setToggle(!toggle);
  };
  return (
    <div className="r1sday">
      <div className="switchday" onClick={handleSwitch}>
        <button className="switchbutton">
          Switch
        </button>
      </div>
      <div>
        <Progress key={toggle} />
        <div className="r1s1day">
          {status == 1 && (data.length > 0 ? (
            <Evel data={data} />
          ) : (
            <div className="r1s1dayer">No data available for the selected day.</div>
          ))}
          {status == 0 && <Spinner />}
        </div>
      </div>
      <>
        <Switch isOpen={isModalOpen} onConfirm={handlechose} onClose={handleCloseModel} key={toggle} toggle={handleReset}/>
        <ConfirmSwitch
          isOpen={issetOpen}
          onClose={handleCloseReset}
          handleSave={handleSave}
          handleConfirm={handleConfirm}
        />
        <ConfirmSwitchReset
          isOpen={isResetOpen}
          onClose={Reset}
          handleConfirm={ResetConfirm}
        />
      </>
    </div>
  );
}
