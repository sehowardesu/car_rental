import React, { useState, useEffect } from 'react';

function Timer({ duration, onEnd }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration); // reset timer if duration changes

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onEnd) onEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, onEnd]);

  return (
    <div style={{ fontWeight: 'bold' }}>
      Time left: {timeLeft}s
    </div>
  );
}

export default Timer;
