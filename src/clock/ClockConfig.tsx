export type ClockConfig = {
  clockSize: number;
  hourHandColor: string;
  minuteHandColor: string;
  backgroundImgIndex: number | null;
};

export const DefaultClockConfig: ClockConfig = {
  clockSize: 250,
  hourHandColor: "orange",
  minuteHandColor: "red",
  backgroundImgIndex: null,
};
