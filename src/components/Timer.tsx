import React, { useEffect, useState } from 'react';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    
    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timerId);
  }, [timeLeft, onTimeUp]);
  
  // Calculate percentage for progress bar
  const percentage = (timeLeft / duration) * 100;
  
  // Determine color based on time left
  let progressColor = 'bg-green-500';
  if (timeLeft <= 5) {
    progressColor = 'bg-red-500';
  } else if (timeLeft <= 10) {
    progressColor = 'bg-yellow-500';
  }

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">Time Remaining</span>
        <span className={`text-sm font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : ''}`}>
          {timeLeft} seconds
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className={`h-2.5 rounded-full transition-all duration-1000 ease-linear ${progressColor}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;