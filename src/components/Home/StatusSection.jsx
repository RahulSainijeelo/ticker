import React from "react";
import Status from "./Status";
import Spinner from "./Spinner";

export default function StatusSection({ status, data }) {
  return (
    <div className="status-selection-time-t">
      {status === 1 && (data.length > 0 ? <Status timeArray={data} /> : <Status />)}
      {status === 0 && <Spinner />}
    </div>
  );
}