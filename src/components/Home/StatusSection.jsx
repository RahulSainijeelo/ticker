import React from "react";
import Status from "./Status";
import Spinner from "./Spinner";

export default function StatusSection({ status, data }) {
  return (
    <div style={{ position: "absolute", right: "40px", top: "60px" }}>
      {status === 1 && (data.length > 0 ? <Status timeArray={data} /> : <Status />)}
      {status === 0 && <Spinner />}
    </div>
  );
}