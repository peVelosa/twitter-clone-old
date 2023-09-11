import React from "react";

const SpecificTime = ({ date }: { date: Date }) => {
  function getTime() {
    const hour = new Date(date).getHours();
    const minute = new Date(date).getMinutes();
    const day = new Date(date).getDay();
    const month = new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format();
    const year = new Date(date).getFullYear();

    return { hour, minute, month, day, year };
  }

  const { day, hour, minute, month, year } = getTime();

  return (
    <>
      {hour}:{minute} · {month} {day}, {year}
    </>
  );
};

export default SpecificTime;
