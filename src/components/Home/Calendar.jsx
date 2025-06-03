import React from "react";
import "./Calendar.css";
import Spinner from "./Spinner";
import { useCalendarLogic } from "../../hooks/calendar";

export default function Calendar() {
  const {
    status,
    products,
    handleClick,
    prClass,
    isExtraDay,
    data,
  } = useCalendarLogic();

  if (status === 0) {
    return <Spinner />;
  }

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
                  onClick={() => handleClick(o, data[1], data[0])}
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
