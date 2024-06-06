import { HandType } from "./AnalogClockHand";

export interface TimeState {
  hour: number;
  minute: number;
  second: number;
}

export function Forward(time: TimeState, unit: HandType): TimeState {

  if (unit === HandType.Hour) {
    const newHour = time.hour + 1;
    return { hour: newHour % 12, minute: time.minute, second: time.second };
  } else if (unit === HandType.Minute) {
    const newMinute = time.minute + 1;
    const newHour = newMinute === 60 ? (time.hour + 1) % 12 : time.hour;
    return { hour: newHour, minute: newMinute % 60, second: time.second };
  } else {
    const newSecond = time.second + 1;
    const newMinute = newSecond === 60 ? (time.minute + 1) % 60 : time.minute;
    const newHour = newMinute === 60 ? (time.hour + 1) % 12 : time.hour;
    return { hour: newHour, minute: newMinute, second: newSecond % 60 };
  }
}

export function Backward(time: TimeState, unit: HandType): TimeState {
  if (unit === HandType.Hour) {
    const newHour = time.hour - 1;
    return { hour: newHour < 0 ? 11 : newHour, minute: time.minute, second: time.second };
  }
  else if (unit === HandType.Minute) {
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
