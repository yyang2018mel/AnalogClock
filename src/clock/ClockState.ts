export interface TimeState {
  hour: number;
  minute: number;
}

export type ClockMode = 
  "HourAdjustable" | 
  "MinuteAdjustable" | 
  "PausedNoAdjustable" | 
  "Running";

export interface ClockState extends TimeState {
  mode: ClockMode;
};

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