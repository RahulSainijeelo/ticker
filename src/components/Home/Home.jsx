import { Outlet } from "react-router-dom";
import HeaderSection from "./HeaderSection";
import CalendarSection from "./CalendarSection";
import StatusSection from "./StatusSection";
import "./Home.css";

import {
  handleStreakAndGoal,
  pollStreakData,
  increaseMonth,
  decreaseMonth,
  useHomeLogic,
  handleGeneratePDF,
} from "../../hooks/homeLogic";

export default function Home() {
  const {
    date,
    setDate,
    ins,
    day,
    data,
    status,
    today,
  } = useHomeLogic({
    handleStreakAndGoal,
    pollStreakData,
    increaseMonth,
    decreaseMonth,
  });

  // PDF generation handler


  return (
    <>
      <button
        type="button"
        className="report-button"
        onClick={() => handleGeneratePDF(date)}
      >
        Report
      </button>
      <div className="r">
        <div className="r1s">
          <HeaderSection
            ins={ins}
            decreaseMonth={() => decreaseMonth(date, today, setDate)}
            increaseMonth={() => increaseMonth(date, today, setDate)}
          />
          <CalendarSection date={date} day={day} />
          <div className="r4s">
            <Outlet context={[date.year(), date.month() + 1]} />
          </div>
        </div>
        <StatusSection status={status} data={data} />
      </div>
    </>
  );
}
