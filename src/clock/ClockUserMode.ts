import Cookies from "js-cookie";

export type ClockUserMode = "Setup" | "Live" | "Static" | "Exercise";
export const getInitialClockUserMode = () => {
  const fromCookie = Cookies.get("clockUserModeCookie");

  if (fromCookie) {
    return fromCookie as ClockUserMode;
  }

  return "Static";
};