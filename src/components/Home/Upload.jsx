import React from 'react';

export default function Upload({func}){
  return(
  <svg onClick={func} viewBox="0 0 24 24" id="upload" height="32px">
    <path
      fill="green"
      d="m15.707 5.293-3-3a1 1 0 0 0-1.414 0l-3 3a1 1 0 0 0 1.414 1.414L11 5.414V17a1 1 0 0 0 2 0V5.414l1.293 1.293a1 1 0 0 0 1.414-1.414Z"
    />
    <path
      fill="skyblue"
      d="M18 9h-5v8a1 1 0 0 1-2 0V9H6a3.003 3.003 0 0 0-3 3v7a3.003 3.003 0 0 0 3 3h12a3.003 3.003 0 0 0 3-3v-7a3.003 3.003 0 0 0-3-3Z"
    />
  </svg>
  )
};
