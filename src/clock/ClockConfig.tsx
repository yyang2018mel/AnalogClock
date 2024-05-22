export type ClockConfig = {
  clockSize: number;
  hourHandColor: string;
  minuteHandColor: string;
  textColor: string;
  backgroundImgIndex: number | null;
};

export const DefaultClockConfig: ClockConfig = {
  clockSize: 250,
  hourHandColor: "orange",
  minuteHandColor: "red",
  textColor: "black",
  backgroundImgIndex: null,
};
