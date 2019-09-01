import { useEffect, useState } from 'react';
import { clearInterval, setInterval } from 'timers';

export interface ITimerProps {
  nextDate: number;
  intervalTime?: number;
}

export type Direction = 'forward' | 'backward';

export interface IState {
  direction: Direction;
}

let interval: NodeJS.Timer | undefined;

export const useCountdown = ({
  nextDate: date,
  intervalTime = 1000
}: ITimerProps) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const initial = date - Date.now();

    if (initial >= 0) {
      return initial;
    } else {
      return 0;
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(current => {
        const diff = date - Date.now();

        if (current <= 0 || diff <= 0) {
          clearInterval(interval);

          return 0;
        }

        return diff;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [date, intervalTime]);

  useEffect(() => {
    console.log(timeLeft);

    if (timeLeft === 0) {
      console.log('DONE');

      interval = setInterval(() => {
        setTimeLeft(() => {
          return Date.now() - date;
        });
      }, intervalTime);
    }
  }, [timeLeft, intervalTime, date]);

  useEffect(() => {
    return () => {
      if (interval) {
        console.log('123');
        clearInterval(interval);
      }
    };
  }, []);

  return timeLeft;
};
