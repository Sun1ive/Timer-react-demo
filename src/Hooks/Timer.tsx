import { useEffect, useState, useCallback } from 'react';
import { setTimeout, clearTimeout } from 'timers';

export interface ITimerProps {
  nextDate: number;
  intervalTime?: number;
}

export type Direction = 'forward' | 'backward';

export interface IState {
  direction: Direction;
  timeLeft: number;
}

let interval: NodeJS.Timer | undefined;

export const useTimer = ({
  nextDate: date,
  intervalTime = 1000
}: ITimerProps) => {
  const initial = date - Date.now();

  const [state, setState] = useState<IState>(() => {
    console.log({ initial });
    if (initial >= 0) {
      return {
        direction: 'backward',
        timeLeft: initial
      };
    } else {
      return {
        direction: 'forward',
        timeLeft: Math.abs(initial)
      };
    }
  });

  useEffect(() => {
    return () => {
      if (typeof interval !== 'undefined') {
        clearTimeout(interval);
      }
    };
  }, []);

  useEffect(() => {
    if (state.direction === 'forward') {
      interval = setTimeout(() => {
        console.log('forward', state);
        setState(prev => ({
          ...prev,
          timeLeft: Date.now() - date
        }));
      }, intervalTime);
    } else {
      interval = setTimeout(() => {
        setState(prev => {
          console.log('backward', prev);
          if (date - Date.now() <= 0) {
            return {
              timeLeft: Date.now() - date,
              direction: 'forward'
            };
          }

          return {
            ...prev,
            timeLeft: date - Date.now()
          };
        });
      }, intervalTime);
    }
  }, [state, date, intervalTime]);

  return state;
};
