import { useCallback, useEffect, useState } from "react";
import "./FlipClock.css";
import FlipDigit from "./FlipDigit";
import Settings from "./Settings";

interface ClockSettings {
  is24Hour: boolean;
  showSeconds: boolean;
  brightness: number;
  showSeam: boolean;
}

const FlipClock = () => {
  const [time, setTime] = useState(new Date());
  const [prevTime, setPrevTime] = useState(new Date());
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<ClockSettings>({
    is24Hour: false,
    showSeconds: false,
    brightness: 1.0,
    showSeam: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevTime(time);
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const formatTime = useCallback(
    (date: Date) => {
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      let ampm = "";

      if (!settings.is24Hour) {
        ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        if (hours === 0) hours = 12;
      }

      return {
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
        ampm,
      };
    },
    [settings.is24Hour]
  );

  const formatPrevTime = useCallback(
    (date: Date) => {
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      if (!settings.is24Hour) {
        hours = hours % 12;
        if (hours === 0) hours = 12;
      }

      return {
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      };
    },
    [settings.is24Hour]
  );

  const currentTime = formatTime(time);
  const previousTime = formatPrevTime(prevTime);

  const handleClockClick = () => {
    if (showSettings) {
      setShowSettings(false);
    } else {
      // Haptic feedback on mobile
      if ("vibrate" in navigator) {
        navigator.vibrate(50);
      }
      setSettings((prev) => ({ ...prev, showSeconds: !prev.showSeconds }));
    }
  };

  return (
    <div
      className="flip-clock"
      onClick={handleClockClick}
      style={{ opacity: settings.brightness }}
    >
      <div className="time-container">
        {!settings.is24Hour && (
          <div className="ampm-indicator">{currentTime.ampm}</div>
        )}

        <div className="digits-container">
          <FlipDigit
            currentValue={currentTime.hours[0]}
            previousValue={previousTime.hours[0]}
            showSeam={settings.showSeam}
          />
          <FlipDigit
            currentValue={currentTime.hours[1]}
            previousValue={previousTime.hours[1]}
            showSeam={settings.showSeam}
          />

          <FlipDigit
            currentValue={currentTime.minutes[0]}
            previousValue={previousTime.minutes[0]}
            showSeam={settings.showSeam}
          />
          <FlipDigit
            currentValue={currentTime.minutes[1]}
            previousValue={previousTime.minutes[1]}
            showSeam={settings.showSeam}
          />

          {settings.showSeconds && (
            <>
              <FlipDigit
                currentValue={currentTime.seconds[0]}
                previousValue={previousTime.seconds[0]}
                showSeam={settings.showSeam}
              />
              <FlipDigit
                currentValue={currentTime.seconds[1]}
                previousValue={previousTime.seconds[1]}
                showSeam={settings.showSeam}
              />
            </>
          )}
        </div>
      </div>

      <Settings
        isOpen={showSettings}
        onToggle={() => setShowSettings(!showSettings)}
        settings={settings}
        onSettingsChange={setSettings}
      />
    </div>
  );
};

export default FlipClock;
