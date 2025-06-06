import moment from "moment";
import { getUser, loginAnonymous } from "../utils/auth";
import { getDayArray } from "../utils/findMonth";
import { useEffect, useState } from "react";
import { removeNonMatchingObjects } from "../utils/getLocal";
import { useSearchParams, useLocation } from "react-router-dom";
import jsPDF from "jspdf";

export function useHomeLogic({
  handleStreakAndGoal,
  pollStreakData,
  increaseMonth,
  decreaseMonth,
}) {
  const { pathname: ky245 } = useLocation();
  const [searchParams] = useSearchParams();
  const [allParams, setAllParams] = useState({});
  const [date, setDate] = useState(moment());
  const [ins, setIns] = useState(true);
  const [day, setDay] = useState(null);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(0);

  const today = moment();

  removeNonMatchingObjects({ day: moment().format("YYYYMMDD") });

  useEffect(() => {
    handleStreakAndGoal();
  }, [handleStreakAndGoal]);

  useEffect(() => {
    setAllParams(Object.fromEntries([...searchParams]));
  }, [searchParams]);

  useEffect(() => {
    ky245 !== "/" ? setIns(true) : setIns(false);
  }, [ky245]);

  useEffect(() => {
    const hello = date.isSame(today, "day") ? today.date() : date.date();
    const newDay = allParams.day ? Number(allParams.day) : hello;
    setDay(newDay);
  }, [allParams, date, today]);

  useEffect(() => {
    const timer = pollStreakData(today, setData, setStatus, status, data);
    return () => {
      clearInterval(timer);
    };
  }, [today, setData, setStatus, status, data, pollStreakData]);

  return {
    ky245,
    allParams,
    date,
    setDate,
    ins,
    setIns,
    day,
    setDay,
    data,
    setData,
    status,
    setStatus,
    today,
    increaseMonth,
    decreaseMonth,
  };
}

// Fetch streak data from MongoDB Realm and store in localStorage
export const fetchStreakData = async () => {
  try {
    await loginAnonymous();
    const user = await getUser();
    const result = await user.functions.getMonth();
    localStorage.setItem("streak", JSON.stringify(result));
    return true;
  } catch (error) {
    console.log("error while fetching");
    return false;
  }
};

// Ensure goal exists in localStorage
export const ensureGoal = () => {
  if (!localStorage.getItem("goal")) {
    localStorage.setItem("goal", "No Goal");
  }
};

// Ensure streak data is up-to-date and handle date logic
export const handleStreakAndGoal = async () => {
  const todayStr = moment().format("L");
  const storedDate = localStorage.getItem("date");

  if (!storedDate) {
    const ok = await fetchStreakData();
    if (ok) localStorage.setItem("date", todayStr);
    ensureGoal();
    return;
  }

  if (storedDate !== todayStr) {
    const ok = await fetchStreakData();
    if (ok) localStorage.setItem("date", todayStr);
  }

  ensureGoal();

  if (localStorage.getItem("streak") == null) {
    await fetchStreakData();
  }
};

export const pollStreakData = (today, setData, setStatus, status, data) => {
  let queryDay = {
    day: today.date(),
    month: today.month() + 1,
    year: today.year(),
  };
  let tkr = 0;
  const timer = setInterval(() => {
    const rawData = localStorage.getItem("streak");
    try {
      const mData = rawData ? JSON.parse(rawData) : null;
      if (mData && Array.isArray(mData) && mData.length > 0) {
        const dayArray = getDayArray(
          mData,
          queryDay.day,
          queryDay.month,
          queryDay.year
        );
        if (dayArray && dayArray.length > 0) {
          setData(dayArray || []);
        }
        setStatus(1);
      } else {
        setStatus(0);
      }
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      setData([]);
    }
    if (tkr >= 3000) setStatus(1);
    tkr += 300;
  }, 300);
  if (status === 1) clearInterval(timer);
  return timer;
};

export const updateDate = (newDate, today, setDate) => {
  if (newDate.isSame(today, "month") && newDate.isSame(today, "year")) {
    setDate(today);
  } else {
    setDate(moment(newDate).startOf("month"));
  }
};

export const increaseMonth = (date, today, setDate) => {
  let newDate = moment(date).add(1, "month");
  updateDate(newDate, today, setDate);
};

export const decreaseMonth = (date, today, setDate) => {
  let newDate = moment(date).subtract(1, "month");
  updateDate(newDate, today, setDate);
};

export const handleGeneratePDF = (date) => {
  const streakData = JSON.parse(localStorage.getItem("streak") || "[]");
  const month = date.month() + 1;
  const year = date.year();

  // Find the streak entry for the current month and year
  const monthEntry = streakData.find(
    (entry) => entry.month === month && entry.year === year
  );

  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text(`Monthly Report`, 10, 15);
  doc.setFontSize(14);
  doc.text(`${date.format("MMMM YYYY")}`, 10, 25);

  let y = 35;
  let totalMinutes = 0;

  doc.setFontSize(12);

  if (monthEntry && monthEntry.days) {
    Object.entries(monthEntry.days).forEach(([day, sessions]) => {
      y += 5; // Add margin before each day
      doc.setFont(undefined, "bold");
      doc.text(`Day ${day}:`, 10, y);
      y += 7;
      doc.setFont(undefined, "normal");
      sessions.forEach((session, idx) => {
        // session: [start, end, hours, goal?]
        const [start, end, hours, goal] = session;
        const mins = Math.round((hours || 0) * 60);
        totalMinutes += mins;
        let line = `  ${start || "--"} - ${end || "--"} | ${Math.floor(
          mins / 60
        )}h ${mins % 60}m`;
        if (goal) line += ` | Goal: ${goal}`;
        doc.text(line, 14, y);
        y += 7;
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });
      // Draw a line after each day
      doc.setDrawColor(200, 200, 200);
      doc.line(10, y, 200, y);
      y += 4;
    });

    // Summary
    y += 8;
    doc.setFontSize(13);
    doc.setFont(undefined, "bold");
    doc.text("Summary", 10, y);
    y += 7;
    doc.setFont(undefined, "normal");
    doc.setFontSize(12);
    doc.text(
      `Total Completed Time: ${Math.floor(totalMinutes / 60)} hours ${
        totalMinutes % 60
      } minutes`,
      14,
      y
    );
  } else {
    doc.text("No data available for this month.", 10, y);
  }

  doc.save(`Monthly_Report_${date.format("YYYY_MM")}.pdf`);
};
