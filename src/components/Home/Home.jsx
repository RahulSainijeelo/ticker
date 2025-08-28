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
} from "../../hooks/homeLogic";
import Profile from "../auth/profile";
import { useUser } from "@clerk/clerk-react";
import Spinner from "./Spinner";

export default function Home() {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return <Spinner />;

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
    user: user.primaryEmailAddress?.emailAddress
  });
  return (
    <>

      <Profile date={date} />
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
