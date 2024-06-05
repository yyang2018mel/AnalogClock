import Cookies from "js-cookie";

export interface TimeState {
  hour: number;
  minute: number;
  second: number;
}

export function Forward(time: TimeState, unit: "hour"|"minute"): TimeState {

  if (unit === "hour") {
    const newHour = time.hour + 1;
    return { hour: newHour % 12, minute: time.minute, second: time.second };
  }
  
  const newMinute = time.minute + 1;
  const newHour = newMinute === 60 ? (time.hour + 1) % 12 : time.hour;
  return { hour: newHour, minute: newMinute % 60, second: time.second };
}

export function Backward(time: TimeState, unit: "hour"|"minute"): TimeState {
  if (unit === "hour") {
    const newHour = time.hour - 1;
    return { hour: newHour < 0 ? 11 : newHour, minute: time.minute, second: time.second};
  }

  const newMinute = time.minute === 0 ? 59 : time.minute - 1;
  const newHour = time.minute === 0
                  ? time.hour === 0
                    ? 11
                    : time.hour - 1
                  : time.hour;

  return { hour: newHour, minute: newMinute, second: time.second };
}

export type ClockMode = 
  "HourAdjustable" | 
  "MinuteAdjustable" | 
  "PausedNoAdjustable" | 
  "Running";

export interface ClockState extends TimeState {
  mode: ClockMode;
};

export const DefaultClockState: ClockState = {
  hour: 1,
  minute: 30,
  second: 0,
  mode: "PausedNoAdjustable",
}

export const getInitialClockState = () => {
  const fromCookie = Cookies.get("clockStateCookie");

  if (fromCookie) {
    return JSON.parse(fromCookie);
  }

  return DefaultClockState;
}

export function isClockAdjustable(clockState: ClockState): boolean {
  return (
    clockState.mode === "HourAdjustable" || clockState.mode === "MinuteAdjustable"
  );
}

export function getClockHandDegreeFromTime(time: TimeState): {
  hourHandDegree: number;
  minuteHandDegree: number;
  secondHandDegree: number;
} {
  const second = time.second;
  const minute = time.minute + time.second/60;
  const hour = (time.hour % 12) + minute/60;
  const secondHandDegree = second * 6;
  const minuteHandDegree = minute * 6;
  const hourHandDegree = hour * 30;
  
  return {
    hourHandDegree: hourHandDegree,
    minuteHandDegree: minuteHandDegree,
    secondHandDegree: secondHandDegree,
  };
}