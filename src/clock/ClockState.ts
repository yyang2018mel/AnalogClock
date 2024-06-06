import Cookies from "js-cookie";
import { HandType  } from "./AnalogClockHand";
import { TimeState } from "./TimeState";

export interface Adjustable {
  adjustableHand: HandType
}

export type ClockPaused = "JustPaused" | Adjustable

export type ClockMode = "Running" | ClockPaused;

export function isClockAdjustable(value: ClockMode): value is Adjustable {
  return (value as Adjustable).adjustableHand !== undefined;
}

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