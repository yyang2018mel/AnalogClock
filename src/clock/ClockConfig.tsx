import Cookies from "js-cookie";

export type ClockConfig = {
  clockSize: number;
  hourHandColor: string;
  minuteHandColor: string;
  secondHandColor: string | null;
  textColor: string;
  backgroundImgIndex: number | null;
};

export const DefaultClockConfig: ClockConfig = {
  clockSize: 550,
  hourHandColor: "orange",
  minuteHandColor: "red",
  secondHandColor: null,
  textColor: "black",
  backgroundImgIndex: null,
};

export const getInitialClockConfig = () => {
  const fromCookie = Cookies.get("clockConfigCookie");

  if (fromCookie) {
    return JSON.parse(fromCookie);
  }

  return DefaultClockConfig;
};
