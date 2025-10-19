import Progress from "./Progress";
import Evel from "./Evel";
import Spinner from "./Spinner";
import ConfirmSwitch from "./ConfirmSwitch";
import Switch from "./Switch";
import ConfirmSwitchReset from "./ConfirmSwitchReset";
import { useDayLogic } from "../../hooks/day";
import "./Day.css";

export default function Day() {
  const {
    data,
    status,
    issetOpen,
    isResetOpen,
    isModalOpen,
    chosedGoal,
    toggle,
    handleSwitch,
    handlechose,
    handleCloseModel,
    handleCloseReset,
    handleSave,
    handleConfirm,
    handleReset,
    Reset,
    ResetConfirm,
  } = useDayLogic();
  console.log("this is the day data",data)
  return (
    <div className="r1sday">
      <div className="switchday" onClick={handleSwitch}>
        <button className="switchbutton">Switch</button>
      </div>
      <div>
        <Progress key={toggle} />
        <div className="r1s1day">
          {status === 1 && (data.length > 0 ? (
            <Evel data={data} />
          ) : (
            <div className="r1s1dayer">No data available for the selected day.</div>
          ))}
          {status === 0 && <Spinner />}
        </div>
      </div>
      <>
        <Switch
          isOpen={isModalOpen}
          onConfirm={handlechose}
          onClose={handleCloseModel}
          key={toggle}
          toggle={handleReset}
        />
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
