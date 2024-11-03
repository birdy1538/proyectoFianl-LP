import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseIcon from '@mui/icons-material/Pause';
import './CountdownClock.css';

const Clock = ({ time }) => {
  const formatTime = (time) => {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="displayedTime">
      <h1>{formatTime(time)}</h1>
    </div>
  );
};

const CountdownClock = ({ initialMinutes = 0 }) => {
  const [count, setCount] = useState(initialMinutes * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (running && count > 0) {
      timer = setInterval(() => {
        setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
      }, 1000);
    }

    if (count === 0) {
      setRunning(false); // Stop the timer when it reaches 0
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [running, count]);

  const handleStart = () => {
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setCount(initialMinutes * 60);
    setRunning(false);
  };

  return (
    <Box
      sx={{
        borderRadius: '16px',
        backgroundColor: '#3d2802',
        padding: 3,
        color: '#f19f04',
        textAlign: 'center',
        width: '100%', 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
        position: 'relative', 
      }}
    >
      <Clock time={count} />
      <div className="button-row">
        <Button variant="contained" color="#c48304" onClick={handleStart}>
          <PlayCircleFilledWhiteIcon />
        </Button>
        <Button variant="contained" color="#c48304" onClick={handleStop}>
          <PauseIcon />
        </Button>
      </div>
      <div className="button-reset">
        <Button variant="contained" color="#c48304" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </Box>
  );
};

export default CountdownClock;