import React from "react";
import { ClockState } from "./ClockState";

type ClockStateContext = {
    clockState: ClockState;
    setClockState: React.Dispatch<React.SetStateAction<ClockState>>;
  };
  
  export const ClockContext = React.createContext<ClockStateContext | undefined>(
    undefined
  );