import React, { useEffect, useState } from "react";
import "./Home.css";
import moment from "moment";
import LeftArrow from "./leftArrow";
import RightArrow from "./RightArrow";
import { Outlet, useSearchParams, useLocation } from "react-router-dom";
import { getUser, loginAnonymous } from "../../utils/auth";
import Messg from "./Messg";
import { getDayArray } from "../../utils/findMonth";
import Spinner from "./Spinner";
import Status from "./Status";
import { removeNonMatchingObjects } from "../../utils/getLocal";

export default function Home() {
  const { pathname: ky245 } = useLocation();
  const [searchParams] = useSearchParams();
  const [allParams, setAllParams] = useState({});
  const [date, setDate] = useState(moment());
  const [ins, setIns] = useState(true);
  const [day, setDay] = useState(null);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(0)


  const today = moment();

  const updateDate = (newDate) => {
    if (newDate.isSame(today, "month") && newDate.isSame(today, "year")) {
      setDate(today);
    } else {
      setDate(moment(newDate).startOf("month"));
    }
  };

  const increaseMonth = () => {
    let newDate = moment(date).add(1, "month");
    updateDate(newDate);
  };

  const decreaseMonth = () => {
    let newDate = moment(date).subtract(1, "month");
    updateDate(newDate);
  };
  removeNonMatchingObjects({ day: moment().format("YYYYMMDD") })

  useEffect(() => {
    const fetchData = async () => {
      await loginAnonymous()
        .then(async () => {
          const user = await getUser();
          const result = await user.functions.getMonth();
          localStorage.setItem("streak", JSON.stringify(result));
        })
        .catch((e) => {
          console.log("error while fetching");
        });
    };
    const fndtdy = localStorage.getItem("date");
    if (!fndtdy) {
      const hello = async () => {
        const sec = await fetchData().then(() => {
          localStorage.setItem("date", moment().format("L"))
        }).catch(() => {
          console.log("error while date fetching")
        })
      };
      hello();
    } else {
      if (fndtdy !== moment().format("L")) {
        const hello = async () => {
          const sec = await fetchData();
          if (sec) {
            localStorage.setItem("date", moment().format("L"))
          };
        };
        hello();
      }

      if (!localStorage.getItem("goal")) localStorage.setItem("goal", "No Goal");
      if (localStorage.getItem("streak") == null) fetchData();
      return;
    }
    console.log(moment().format("YYYYMMDD"))
  }, []);

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
  }, [allParams, date]);


  useEffect(() => {
    let queryDay = {
      day: today.date(),
      month: today.month() + 1,
      year: today.year()
    }
    let tkr = 0;
    const timer = setInterval(() => {
      const rawData = localStorage.getItem("streak");
      try {
        const mData = rawData ? JSON.parse(rawData) : null;
        if (mData && Array.isArray(mData) && mData.length > 0) {
          const dayArray = getDayArray(mData, queryDay.day, queryDay.month, queryDay.year);
          if (dayArray && dayArray.length > 0) {
            setData(dayArray || []);
          }
          setStatus(1)
        } else {
          setStatus(0)
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        setData([]);
      }
      if (tkr >= 3000) setStatus(1);
      tkr += 300;
    }, 300)
    if (status == 1) clearInterval(timer);
    return () => {
      clearInterval(timer)
    }
  }, [status, data]);

  return (
    <>
      <div className="r">
        <div className="r1s">
          {ins && (
            <div className="r1s1scr">
              <Messg></Messg>
            </div>
          )}
          {!ins && (
            <>
              <div className="rst rst1" onClick={decreaseMonth}>
                <LeftArrow></LeftArrow>
              </div>
              <div className="rst rst2" onClick={increaseMonth}>
                <RightArrow></RightArrow>
              </div>
            </>
          )}
          <div className="r2s">
            <img src="image.jpeg" alt="" />
          </div>
          <div className="r3s">
            <div className="container">
              <div className="triangle">
                <div className="r3sd">
                  <div className="year">{date.year()}</div>
                  <hr />
                  <div className="text">{date.format("MMM")}</div>
                </div>
              </div>
              <div className="circle">{day}</div>
            </div>
          </div>
          <div className="r4s">
            <Outlet context={[date.year(), date.month() + 1]} />
          </div>
        </div>
        <div style={{ position: "absolute", right: "40px", top: "60px" }}>
          {status == 1 && (data.length > 0 ? (
            <Status timeArray={data} />
          ) : (
            <Status />
          ))}
          {status == 0 && <Spinner />}
        </div>
      </div>
    </>
  );
}
