import { useEffect, useState, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getMonthObject } from "../utils/findMonth";
import generateMonthCalendar from "../components/Home/Month";
import isExtraDay from "../utils/exDays";
import calPr from "../utils/calPr";

export function useCalendarLogic() {
  const navigate = useNavigate();
  const data = useOutletContext();
  const [monthData, setMonthData] = useState([]);
  const [monthObject, setMonthObject] = useState(null);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    let tkr = 0;
    const timer = setInterval(() => {
      const mData = JSON.parse(localStorage.getItem("streak"));
      if (mData && Array.isArray(mData) && mData.length > 0) {
        setMonthData(mData);
        setStatus(1);
      }
      if (tkr >= 3000) setStatus(1);
      tkr += 300;
    }, 300);
    if (status === 1) clearInterval(timer);
    return () => {
      clearInterval(timer);
    };
  }, [data, status]);

  useEffect(() => {
    if (monthData.length > 0) {
      const result = getMonthObject(monthData, data[1], data[0]);
      setMonthObject(result);
    }
  }, [monthData, data]);

  const dayClassMapping = useMemo(() => {
    if (!monthObject || !monthObject.days) return {};
    const mappings = {};
    Object.entries(monthObject.days).forEach(([day, dayData]) => {
      mappings[day] = calPr(dayData);
    });
    return mappings;
  }, [monthObject]);

  const handleClick = (date, month, year) => {
    navigate(`/view?day=${date}&month=${month}&year=${year}`);
  };

  const prClass = (date) => {
    return dayClassMapping[date] || "default-class";
  };

  const products = useMemo(
    () => generateMonthCalendar(data[0], data[1]),
    [data]
  );

  return {
    status,
    products,
    handleClick,
    prClass,
    isExtraDay,
    data,
  };
}
