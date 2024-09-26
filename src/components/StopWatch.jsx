import { useState, useEffect } from "react";


const Stopwatch = () => {
  const [time, setTime] = useState(0); // Store time in milliseconds
  const [isRunning, setIsRunning] = useState(false); // Track if the stopwatch is running
  const [containerPosition, setContainerPosition] = useState(""); // Track the container animation state

  useEffect(() => {
    let intervalID;
    if (isRunning) {
      intervalID = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment time by 10ms for smoothness
      }, 10); // Update every 10ms
    }

    return () => clearInterval(intervalID);
  }, [isRunning]);

  function formatTime() {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));

    return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}.${Math.floor(milliseconds / 10)}`;
  }

  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  const startStopwatch = () => {
    setIsRunning(true);
    setContainerPosition("move-top"); // Move the container to the top
  };

  const stopStopwatch = () => {
    setIsRunning(false);
    setContainerPosition("move-bottom"); // Move the container to the middle
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setTime(0); // Reset time to 0
    setContainerPosition("move-middle"); // Move the container to the bottom
  };

  return (
    <div className={`stopwatch-container ${containerPosition}`}>
      <div className="stopwatch-box">
        <h1 className="stopwatch-time">{formatTime()}</h1>
        <div className="button-group">
          <button className="btn start-btn" onClick={startStopwatch}>Start</button>
          <button className="btn stop-btn" onClick={stopStopwatch}>Stop</button>
          <button className="btn reset-btn" onClick={resetStopwatch}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
