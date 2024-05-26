import Cookies from "js-cookie";

export interface TimeState {
  hour: number;
  minute: number;
}

export function Forward(time: TimeState, unit: "hour"|"minute"): TimeState {

  if (unit === "hour") {
    const newHour = time.hour + 1;
    return { hour: newHour % 12, minute: time.minute };
  }
  
  const newMinute = time.minute + 1;
  const newHour = newMinute === 60 ? (time.hour + 1) % 12 : time.hour;
  return { hour: newHour, minute: newMinute % 60 };
}

export function Backward(time: TimeState, unit: "hour"|"minute"): TimeState {
  if (unit === "hour") {
    const newHour = time.hour - 1;
    return { hour: newHour < 0 ? 11 : newHour, minute: time.minute };
  }

  const newMinute = time.minute === 0 ? 59 : time.minute - 1;
  const newHour = time.minute === 0
                  ? time.hour === 0
                    ? 11
                    : time.hour - 1
                  : time.hour;

  return { hour: newHour, minute: newMinute };
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
} {
  const hourHandDegree = (time.hour % 12) * 30;
  const minuteHandDegree = time.minute * 6;
  const adjustedHourHandDegree = hourHandDegree + (time.minute / 60) * 30;

  return {
    hourHandDegree: adjustedHourHandDegree,
    minuteHandDegree: minuteHandDegree,
  };
}