import Cookies from "js-cookie";

export interface TimeState {
  hour: number;
  minute: number;
  second: number;
}

export type TimeUnit = "hour" | "minute" | "second"

export function Forward(time: TimeState, unit: TimeUnit): TimeState {

  if (unit === "hour") {
    const newHour = time.hour + 1;
    return { hour: newHour % 12, minute: time.minute, second: time.second };
  } else if (unit === "minute") {
    const newMinute = time.minute + 1;
    const newHour = newMinute === 60 ? (time.hour + 1) % 12 : time.hour;
    return { hour: newHour, minute: newMinute % 60, second: time.second };
  } else {
    const newSecond = time.second + 1;
    const newMinute = newSecond === 60 ? (time.minute+1) % 60 : time.minute;
    const newHour = newMinute === 60 ? (time.hour + 1) % 12 : time.hour;
    return { hour: newHour, minute: newMinute, second: newSecond % 60 };
  }
}

export function Backward(time: TimeState, unit: TimeUnit): TimeState {
  if (unit === "hour") {
    const newHour = time.hour - 1;
    return { hour: newHour < 0 ? 11 : newHour, minute: time.minute, second: time.second};
  }
  else if (unit === "minute") {  
    const newMinute = time.minute === 0 ? 59 : time.minute - 1;
    const newHour = newMinute === 59
                    ? time.hour === 0
                      ? 11
                      : time.hour - 1
                    : time.hour;

    return { hour: newHour, minute: newMinute, second: time.second };
  }
  else {
    const newSecond = time.second === 0 ? 59 : time.second - 1;
    const newMinute = newSecond === 59
                        ? time.minute === 0
                          ? 59
                          : time.minute - 1
                        : time.minute;
    const newHour = newMinute === 59
                      ? time.hour === 0
                      ? 11
                      : time.hour - 1
                    : time.hour;
    return { hour: newHour, minute: newMinute, second: newSecond };
  }
}

export enum ClockAdjustable {
  Hour,
  Minute,
  Second,
}

export type ClockPausedMode = "JustPaused" | ClockAdjustable

export type ClockMode = "Running" | ClockPausedMode;

export interface ClockState extends TimeState {
  mode: ClockMode;
};

export const DefaultClockState: ClockState = {
  hour: 1,
  minute: 30,
  second: 0,
  mode: "JustPaused",
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
    clockState.mode === ClockAdjustable.Hour || 
    clockState.mode === ClockAdjustable.Minute || 
    clockState.mode === ClockAdjustable.Second
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