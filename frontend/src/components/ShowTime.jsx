import React from "react";

const ShowTime = ({ time }) => {
  let displayTime;
  const seconds = time % 60;
  if (time < 60) {
    displayTime = `${seconds.toFixed(2)}s`;
  } else if (time < 3600) {
    const minutes = Math.floor(time / 60);
    displayTime = `${minutes}min ${seconds.toFixed(2)}s`;
  } else {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    displayTime = `${hours}hr ${minutes}min ${seconds.toFixed(2)}s`;
  }

  return <div>{displayTime}</div>;
};

export default ShowTime;
