import React, { useEffect, useState } from "react";
import "./FlipClock.css";
import FlipDigit from "./FlipDigit";

const FlipClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [ampm, setAmpm] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
      if (e.key === "Escape" && document.fullscreenElement) {
        exitFullscreen();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
  };

  const exitFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
  };

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();

    if (hours === 0) hours = 12;
    else if (hours > 12) hours -= 12;

    return {
      hours: hours.toString(),
      minutes: minutes.toString().padStart(2, "0"),
    };
  };

  const { hours, minutes } = formatTime(time);

  return (
    <div className="flip-clock" onClick={toggleFullscreen}>
      {!isFullscreen && (
        <div className="fullscreen-hint">
          Click anywhere or press 'F' for fullscreen
        </div>
      )}
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
