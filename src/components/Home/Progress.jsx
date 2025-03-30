import "./Progress.css";
import React, { useState, useEffect, useReducer, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Pause from "./Pause";
import Play from "./Play";
import Check from "./check";
import Edit from "./Edit";
import TimeDurationModal from "./TimeDurationModal";
import ConfirmReset from "./ConfirmReset";
import moment from "moment";
import Upload from "./Upload";
import { getUser, loginAnonymous } from "../../utils/auth";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../../utils/getLocal";
import Spinner from "./Spinner";
import momentsr from "moment-timezone"
import ResetIcon from "./ResetIcon";
export default function Progress() {
  const navigate = useNavigate();
  const sound = new Audio("/sounds/alarm1.mp3");
  const [outerConditionMet, setOuterConditionMet] = useState(false);
  const lsele = Number(localStorage.getItem("startAt"));
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
  const pressedKeys = new Set();
  const forceReset = () => {
    setElapsedTime(0)
    setProgress(0)
  }
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
        const startTime = momentsr.tz('Asia/Kolkata').valueOf();
        if (lsels) {
          elapsed = Math.floor((momentsr.tz('Asia/Kolkata').valueOf() - lsels) / 1000);
        } else {
          elapsed = Math.floor((momentsr.tz('Asia/Kolkata').valueOf() - startTime) / 1000);
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
          momentsr.tz('Asia/Kolkata').valueOf() - Number(localStorage.getItem("pause"))
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
      sound.loop = true;
      sound.play().catch((error) => {
      });
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
      setStatus(0)
    }
    const nmbr = Number(localStorage.getItem("elapsed"))
    if (nmbr) {
      setElapsedTime(nmbr);
      setProgress(((nmbr * 1000) / duration) * 100)
      setIsEnded(elapsedTime == time)
    }
    //   
    //   console.log(elapsedTime);
    // } else {
    //   console.log("in end else");
    //   setElapsedTime(0);
    //   setProgress(0);
    // }
  }, [progress, elapsedTime, duration]);
  // document.addEventListener("visibilitychange", function() {
  //   if (document.visibilityState === "visible") {
  //       console.log("Hello");

  //     }
  // });
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
      if (lsels && hel && momentsr.tz('Asia/Kolkata').valueOf() - hel >= 1000) {
        localStorage.setItem("pause", momentsr.tz('Asia/Kolkata').valueOf());
      }
    }
    if (elapsedTime == 0) {
      if (!localStorage.getItem("startAt")) {
        localStorage.setItem("startAt", moment().format("HH:mm:ss"));
        localStorage.setItem("day",moment().format("YYYYMMDD"));
        localStorage.setItem("stamp", momentsr.tz('Asia/Kolkata').valueOf());
        localStorage.setItem("goal","No Goal")
        if (!lselee) localStorage.setItem("pause", momentsr.tz('Asia/Kolkata').valueOf());
      }
    }
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      pressedKeys.add(event.key.toLowerCase());
      if (pressedKeys.has("alt") && pressedKeys.has("s")) {
        event.preventDefault();
        togglePause();
      }

    };
    const handleKeyUp = (event) => {
      pressedKeys.delete(event.key.toLowerCase());
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPaused])

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
  }
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
      month: moment().month() + 1,
      year: moment().year(),
      day: moment().date(),
      achiev: [startAt, endAt, Number(elapsed) / (60 * 60), goal],
    };
    try {
      setStatus(1);
      const { user } = await loginAnonymous();
      if (!user) {
        setTimeout(() => {
          setStatus(0);
        }, 3000);
        return;
      }
      const result = await user.functions.setDay(arg);
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
      setStatus(0);
    }
  };
  return (
    <>
      <div className="r4s1pros">
        <div className="r1spro">
          <CircularProgressbar
            value={progress}
            styles={buildStyles({
              textColor: "#000",
              pathColor: "green",
              trailColor: "#0080004d",
            })}
          />
          <div className="r2spro">
            <div
              className={
                "r2spro12 " + (isEnded == true && pt ? "r1pro123123" : "")
              }
            >
              {formatTime(time - elapsedTime)}
            </div>
            {progress == 0 && pt && (
              <div onClick={handleButtonClick}>
                <Edit></Edit>
              </div>
            )}
          </div>
        </div>
        <div className="r1pro123">
          <div className="r1pro1231">{pt ? progress.toFixed(2) : 0.0}%</div>
          {!isPaused && pt ? (
            <div onClick={togglePause}>
              <Pause />
            </div>
          ) : (
            pt && (
              <div onClick={togglePause}>
                <Play />
              </div>
            )
          )}
          <div>
            {progress == 100 && pt && (
              <div className="r1pro1232">
                {status == 0 && <Upload func={updDbHdl} />}
                {status == 1 && <Spinner />}
                {status == 2 && <Check />}
              </div>
            )}
            {progress != 100 && pt && isPaused && (
              <div onClick={handleReset} className="r1pro1232">
                {status == 3 && <ResetIcon />}
              </div>
            )}
          </div>
          <div>
            <TimeDurationModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onTimeSelect={handleTimeSelect}
            />
          </div>
          <div>
            <ConfirmReset
              isOpen={isResetOpen}
              onClose={handleCloseReset}
              onReset={forceReset}
            />
          </div>
        </div>
      </div>
    </>
  );
}

// import "./Progress.css";
// import React, { useState, useEffect } from "react";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import Pause from "./Pause";
// import Play from "./Play";
// import Check from "./check";
// import Edit from "./Edit";
// import TimeDurationModal from "./TimeDurationModal";
// import moment from "moment";
// import { isToday } from "date-fns";
// import Upload from "./Upload";
// import { getUser, loginAnonymous } from "../../utils/auth";
// import {
//   getFromLocalStorage,
//   removeFromLocalStorage,
// } from "../../utils/getLocal";
// import Spinner from "./Spinner";

// export default function Progress() {
//   const navigate = useNavigate();
//   const sound = new Audio("/sounds/alarm1.mp3");
//   const [outerConditionMet, setOuterConditionMet] = useState(false);
//   const lsele = Number(localStorage.getItem("duration"));
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [duration, setDuration] = useState(lsele || 120 * 60 * 1000);
//   const [searchParams] = useSearchParams();
//   const time = duration / 1000;
//   const location = useLocation();
//   const lsels = Number(localStorage.getItem("elapsed"));
//   const [pt, setPt] = useState(false);
//   const [isPaused, setIsPaused] = useState(true);
//   const [elapsedTime, setElapsedTime] = useState(lsels || 0);
//   const [isEnded, setIsEnded] = useState(elapsedTime == time || false);
//   const [progress, setProgress] = useState(
//     ((elapsedTime * 1000) / duration) * 100 || 0
//   );
//   const [status, setStatus] = useState(0);
//   const updateInterval = 1000;
//   useEffect(() => {
//     const params = Object.fromEntries([...searchParams]);
//     const dateToCheck = moment({
//       year: Number(params.year),
//       month: Number(params.month) - 1,
//       day: Number(params.day),
//     });

//     const isToday = dateToCheck.isSame(moment(), "day");
//     setPt(isToday);
//   }, [searchParams, location]);
//   useEffect(() => {
//     const startTime = Date.now();
//     let elapsed;
//     if (elapsedTime < time && !isPaused) {
//       const interval = setInterval(() => {
//         const lsels = Number(localStorage.getItem("elapsed"));
//         elapsed = lsels + 1 || Date.now() - startTime;
//         const newProgress = ((elapsed * 1000) / duration) * 100;
//         localStorage.setItem("elapsed", elapsed);
//         setProgress(newProgress);
//         setElapsedTime(elapsed);
//         if (newProgress >= 100) {
//           clearInterval(interval);
//         }
//       }, [updateInterval]);
//       return () => clearInterval(interval);
//     } else {
//       localStorage.setItem("pause", Date.now());
//       elapsed += Date.now() - Number(localStorage.getItem("pause"));
//     }
//   }, [isPaused, duration]);

//   useEffect(() => {
//     if (outerConditionMet && isEnded) {
//       sound.loop = true;
//       sound.play().catch((error) => {
//         // console.log("Error playing sound: ", error);
//       });
//     }
//   }, [outerConditionMet, isEnded]);

//   const formatTime = (secs) => {
//     const totalSeconds = secs;
//     const minutes = Math.floor(secs / 60);
//     const seconds = totalSeconds % 60;
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   if (elapsedTime == 1) {
//     localStorage.setItem("startAt", moment().format("HH:mm:ss"));
//   } else if (time - elapsedTime == 1 && !isEnded) {
//     localStorage.setItem("endAt", moment().format("HH:mm:ss"));
//     setIsEnded(true);
//   }

//   const togglePause = () => {
//     setIsPaused(!isPaused);
//     setOuterConditionMet(true);
//   };

//   const handleButtonClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleTimeSelect = (durationInMinutes) => {
//     localStorage.setItem("duration", durationInMinutes * 60 * 1000);
//     setDuration(durationInMinutes * 60 * 1000);
//   };
//   const updDbHdl = async () => {
//     const { startAt, endAt, elapsed,goal } = getFromLocalStorage(
//       "startAt",
//       "endAt",
//       "elapsed",
//       "goal"
//     );

//     let arg = {
//       month: moment().month() + 1,
//       year: moment().year(),
//       day: moment().date(),
//       achiev: [startAt, endAt, Number(elapsed) / (60 * 60),goal],
//     };
//     try {
//       setStatus(1);
//       const { user } = await loginAnonymous();
//       if (!user) {
//         setTimeout(() => {
//           setStatus(0);
//         }, 3000);
//         return;
//       }

//       const result = await user.functions.setDay(arg);
//       if (result) {
//         removeFromLocalStorage("startAt", "endAt", "elapsed", "streak");
//         setStatus(2);
//         setTimeout(() => {
//           navigate(0);
//         }, 3000);
//       } else {
//         setStatus(0);
//       }
//     } catch (err) {
//       setStatus(0);
//     }
//   };

//   return (
//     <>
//       <div className="r4s1pros">
//         <div className="r1spro">
//           <CircularProgressbar
//             value={progress}
//             styles={buildStyles({
//               textColor: "#000",
//               pathColor: "#4caf50",
//               trailColor: "#d6d6d6",
//             })}
//           />
//           <div className="r2spro">
//             <div
//               className={
//                 "r2spro12 " + (isEnded == true && pt ? "r1pro123123" : "")
//               }
//             >
//               {formatTime(time - elapsedTime)}
//             </div>
//             {progress == 0 && pt && (
//               <div onClick={handleButtonClick}>
//                 <Edit></Edit>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="r1pro123">
//           <div className="r1pro1231">{pt ? progress.toFixed(2) : 0.0}%</div>
//           {!isPaused && pt ? (
//             <div onClick={togglePause}>
//               <Pause />
//             </div>
//           ) : (
//             pt && (
//               <div onClick={togglePause}>
//                 <Play />
//               </div>
//             )
//           )}
//           <div>
//             {progress == 100 && pt && (
//               <div className="r1pro1232">
//                 {status == 0 && <Upload func={updDbHdl} />}
//                 {status == 1 && <Spinner />}
//                 {status == 2 && <Check />}
//               </div>
//             )}
//           </div>
//           <div>
//             <TimeDurationModal
//               isOpen={isModalOpen}
//               onClose={handleCloseModal}
//               onTimeSelect={handleTimeSelect}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }














// if ((Math.floor((localStorage.getItem("tts")-momentsr.tz('Asia/Kolkata').valueOf())/1000))<=0) {
//   console.log("hello")
//   if (!localStorage.getItem("endAt")) {
//     localStorage.setItem("endAt", moment().format("HH:mm:ss"));
//     setIsEnded(true);
//     setIsPaused(true);
//     clearInterval(interval);
//   }
// }