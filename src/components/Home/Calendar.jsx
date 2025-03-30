import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getMonthObject } from "../../utils/findMonth";
import generateMonthCalendar from "./Month";
import isExtraDay from "../../utils/exDays";
import calPr from "../../utils/calPr";
import "./Calendar.css";
import Spinner from "./Spinner";

export default function Calendar() {
  const navigate = useNavigate();
  const data = useOutletContext();
  const [monthData, setMonthData] = useState([]);
  const [monthObject, setMonthObject] = useState(null);
  const [status, setStatus] = useState(0)

  useEffect(() => {
    let tkr = 0;
    const timer = setInterval(() => {
      const mData = JSON.parse(localStorage.getItem("streak"));
    if (mData && Array.isArray(mData) && mData.length > 0) {
      setMonthData(mData)
      setStatus(1)
    } else {
      console.log("No valid data in localStorage");
    }
     if(tkr>=3000) setStatus(1);
     tkr+=300;
    }, 300);
    if(status==1) clearInterval(timer);
    return()=>{
     clearInterval(timer)
    }
  }, [data,status]);

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

  // Handle clicking on a day
  const handleClick = (date, month, year, data) => {
    navigate(`/view?day=${date}&month=${month}&year=${year}`);
  };

  const prClass = (date) => {
    return dayClassMapping[date] || "default-class";
  };
  const products = generateMonthCalendar(data[0], data[1]);

  if (status==0) {
    return <Spinner></Spinner>
  }

  // if (!monthObject) {
  //   return <div>No data available for this month.</div>;
  // }

  return (
    <div className="r4s1">
      <table>
        <thead>
          <tr>
            <th>MON</th>
            <th>TUE</th>
            <th>WED</th>
            <th>THU</th>
            <th>FRI</th>
            <th>SAT</th>
            <th>SUN</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              {product.map((o, idx) => (
                <td
                  onClick={() =>
                    handleClick(o, data[1], data[0])
                  }
                  className={
                    isExtraDay(o, index, products.length - 1) +
                    " " +
                    ((isExtraDay(o, index, products.length - 1) === "r1s1f" &&
                      prClass(o)) ||
                      "") +
                    ((!isExtraDay(o, index, products.length - 1) &&
                      prClass(o)) ||
                      "")
                  }
                  key={idx}
                >
                  {o}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
