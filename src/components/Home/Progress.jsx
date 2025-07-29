import "./Progress.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Pause from "./Pause";
import Play from "./Play";
import Check from "./check";
import Edit from "./Edit";
import TimeDurationModal from "./TimeDurationModal";
import ConfirmReset from "./ConfirmReset";
import Upload from "./Upload";
import Spinner from "./Spinner";
import ResetIcon from "./ResetIcon";
import { useProgressLogic } from "../../hooks/progressLogic";

export default function Progress() {
  const {
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
  } = useProgressLogic();
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
                "r2spro12 " + (isEnded === true && pt ? "r1pro123123" : "")
              }
            >
              {formatTime(time - elapsedTime)}
            </div>
            {progress === 0 && pt && (
              <div onClick={handleButtonClick}>
                <Edit />
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
            {progress === 100 && pt && (
              <div className="r1pro1232">
                {status === 0 && <Upload func={updDbHdl} />}
                {status === 1 && <Spinner />}
                {status === 2 && <Check />}
              </div>
            )}
            {progress !== 100 && pt && isPaused && (
              <div onClick={handleReset} className="r1pro1232">
                {status === 3 && <ResetIcon />}
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