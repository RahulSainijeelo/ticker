import { useState, useEffect, useRef } from "react";
import moment from "moment";
import momentsr from "moment-timezone";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { getFromLocalStorage, removeFromLocalStorage } from "../utils/getLocal";
import { loginAnonymous } from "../utils/auth";
import { setDay } from "../services/setDurationService";

export function useProgressLogic({ user }) {
  const navigate = useNavigate();
  const sound = useRef(new Audio("/sounds/alarm1.mp3"));
  const [outerConditionMet, setOuterConditionMet] = useState(false);
  const lselee = Number(localStorage.getItem("pause"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [duration, setDuration] = useState(120 * 60 * 1000);
  const [searchParams] = useSearchParams();
  const time = duration / 1000;
  const location = useLocation();
  const lsels = Number(localStorage.getItem("elapsed"));
  const [pt, setPt] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(3);
  const updateInterval = 1000;
  const [pautm, setPautm] = useState(true);
  const pressedKeys = useRef(new Set());

  const forceReset = () => {
    setElapsedTime(0);
    setProgress(0);
  };

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    const dateToCheck = moment({
      year: Number(params.year),
      month: Number(params.month) - 1,
      day: Number(params.day),
    });
    const isToday = dateToCheck.isSame(moment(), "day");
    setPt(isToday);
  }, [searchParams, location]);

  useEffect(() => {
    const lsels = localStorage.getItem("stamp");
    let elapsed, newProgress;
    if (!isPaused && elapsedTime >= 0 && elapsedTime < time) {
      const intervalCalb = () => {
        const startTime = momentsr.tz("Asia/Kolkata").valueOf();
        if (lsels) {
          elapsed = Math.floor(
            (momentsr.tz("Asia/Kolkata").valueOf() - lsels) / 1000
          );
        } else {
          elapsed = Math.floor(
            (momentsr.tz("Asia/Kolkata").valueOf() - startTime) / 1000
          );
        }
        newProgress = ((elapsed * 1000) / duration) * 100;
        localStorage.setItem("elapsed", elapsed);
        setProgress(newProgress);
        setElapsedTime(elapsed);
      };
      if (!isPaused && pautm === true && lselee) {
        const lselele = Number(localStorage.getItem("stamp"));
        const lselelee = Number(localStorage.getItem("elapsed"));
        const extra = Math.floor(
          momentsr.tz("Asia/Kolkata").valueOf() -
          Number(localStorage.getItem("pause"))
        );
        if (extra >= 1000) {
          localStorage.setItem("stamp", lselele + extra + 1000);
          localStorage.setItem("elapsed", lselelee - Math.floor(extra / 1000));
          setPautm(false);
        }
      }
      const interval = setInterval(intervalCalb, updateInterval);
      if (newProgress >= 100) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
  }, [isPaused, duration, pautm]);

  useEffect(() => {
    if (outerConditionMet && isEnded) {
      sound.current.loop = true;
      sound.current.play().catch(() => { });
    }
  }, [outerConditionMet, isEnded]);

  useEffect(() => {
    if (localStorage.getItem("duration")) {
      setDuration(Number(localStorage.getItem("duration")));
    }
    if (!localStorage.getItem("duration")) {
      localStorage.setItem("duration", duration);
    }
    if (localStorage.getItem("endAt")) {
      setStatus(0);
    }
    const nmbr = Number(localStorage.getItem("elapsed"));
    if (nmbr) {
      setElapsedTime(nmbr);
      setProgress(((nmbr * 1000) / duration) * 100);
      setIsEnded(elapsedTime == time);
    }
  }, [progress, elapsedTime, duration]);

  const formatTime = (secs) => {
    const totalSeconds = secs;
    const minutes = Math.floor(secs / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (time - elapsedTime == 0 && !isEnded) {
    if (!localStorage.getItem("endAt")) {
      localStorage.setItem("endAt", moment().format("HH:mm:ss"));
      setIsEnded(true);
      setIsPaused(true);
    }
  }

  const togglePause = () => {
    setIsPaused(!isPaused);
    setOuterConditionMet(true);
    if (isPaused == true) {
      setPautm(true);
    } else {
      const hel = localStorage.getItem("pause");
      if (lsels && hel && momentsr.tz("Asia/Kolkata").valueOf() - hel >= 1000) {
        localStorage.setItem("pause", momentsr.tz("Asia/Kolkata").valueOf());
      }
    }
    if (elapsedTime == 0) {
      if (!localStorage.getItem("startAt")) {
        localStorage.setItem("startAt", moment().format("HH:mm:ss"));
        localStorage.setItem("day", moment().format("YYYYMMDD"));
        localStorage.setItem("stamp", momentsr.tz("Asia/Kolkata").valueOf());
        if (!localStorage.getItem("goal"))
          localStorage.setItem("goal", "No Goal");
        if (!lselee)
          localStorage.setItem("pause", momentsr.tz("Asia/Kolkata").valueOf());
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      pressedKeys.current.add(event.key.toLowerCase());
      if (pressedKeys.current.has("alt") && pressedKeys.current.has("s")) {
        event.preventDefault();
        togglePause();
      }
    };
    const handleKeyUp = (event) => {
      pressedKeys.current.delete(event.key.toLowerCase());
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPaused]);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleReset = () => {
    setIsResetOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseReset = () => {
    setIsResetOpen(false);
  };

  const handleTimeSelect = (durationInMinutes) => {
    localStorage.setItem("duration", durationInMinutes * 60 * 1000);
    setDuration(durationInMinutes * 60 * 1000);
  };

  const updDbHdl = async () => {
    const { startAt, endAt, elapsed, goal } = getFromLocalStorage(
      "startAt",
      "endAt",
      "elapsed",
      "goal"
    );
    let arg = {
      user: user,
      month: moment().month() + 1,
      year: moment().year(),
      day: moment().date(),
      achiev: [startAt, endAt, Number(elapsed) / (60 * 60), goal],
    };
    try {
      setStatus(1);
      const result = await setDay(arg);
      console.log("inside upddbhdl", result)

      if (result) {
        removeFromLocalStorage(
          "startAt",
          "endAt",
          "elapsed",
          "streak",
          "goal",
          "stamp",
          "pause"
        );
        setStatus(2);
        setTimeout(() => {
          navigate(0);
        }, 3000);
      } else {
        setStatus(0);
      }
    } catch (err) {
      console.log(err)
      setStatus(0);
    }
  };

  return {
    pt,
    progress,
    isPaused,
    isEnded,
    status,
    time,
    elapsedTime,
    formatTime,
    handleButtonClick,
    handleCloseModal,
    isModalOpen,
    handleTimeSelect,
    togglePause,
    updDbHdl,
    handleReset,
    isResetOpen,
    handleCloseReset,
    forceReset,
  };
}
