import { useState, useEffect } from "react";

import './style.css'

interface TimerProps {

  initSeconds: number;
  callBack?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string
}

const Timer = ({ callBack, initSeconds, size = "md", className }: TimerProps) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    !!initSeconds && setSeconds(initSeconds) && setIsActive(true);
  }, []);

  useEffect(() => {
    let timerId= setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          setIsActive(false);
          callBack && callBack();
        }
      }, 1000);
      return () => clearInterval(timerId)

  }, [isActive, seconds, callBack]);

  return (
    <div className="timer-container">
      <div className={`timer-count ${size} ${className}`}>
        {seconds}
      </div>
    </div>
  );
};

export default Timer;
