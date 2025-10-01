import React, { useEffect, useState } from "react";
import "./FlipClock.css";
import FlipDigit from "./FlipDigit";

const FlipClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [ampm, setAmpm] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now);
      setAmpm(
        now
          .toLocaleString("en-US", { hour: "numeric", hour12: true })
          .slice(2, 5)
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();

    if (hours === 0) hours = 12;
    else if (hours > 12) hours -= 12;

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
    };
  };

  const { hours, minutes } = formatTime(time);

  return (
    <div className="flip-clock">
      <div className="line"></div>
      <div className="container">
        <div className="holder">
          <FlipDigit digit={hours} isHour={true} />
          <h2>{ampm}</h2>
        </div>
        <div className="holder">
          <FlipDigit digit={minutes} isHour={false} />
        </div>
      </div>
    </div>
  );
};

export default FlipClock;
