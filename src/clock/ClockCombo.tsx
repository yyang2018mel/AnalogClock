import React, { useState } from "react";
import { ClockState } from "./ClockState";
import ClockHand, { HandType } from "./ClockHand";
import ClockFace from "./ClockFace";
import { ClockContext } from "./Context";
import ClockCrown from "./ClockCrown";
import ClockFrame from "./ClockFrame";
import ClockContainer from "./ClockContainer";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

function ClockCombo(prop: { clockSize: number }): React.JSX.Element {
  const { clockSize } = prop;

  const [clockState, setClockState] = useState<ClockState>({
    hour: 0,
    minute: 30,
    mode: "PausedNoAdjustable",
  });

  return (
    <ClockContext.Provider value={{ clockState, setClockState }}>
      <ClockContainer clockSize={clockSize}>
        <ClockCrown zIndex={0} />
        <ClockFrame zIndex={1} clockSize={clockSize}>
          <ClockHand
            zIndex={10}
            clockSize={clockSize}
            type={HandType.Hour}
            baseColor="orange"
          />
          <ClockHand
            zIndex={20}
            clockSize={clockSize}
            type={HandType.Minute}
            baseColor="red"
          />
          <ClockFace
            zIndex={30}
            clockSize={clockSize}
            showMinute={
              clockState.mode === "MinuteAdjustable" ||
              clockState.mode === "HourAdjustable"
            }
          />
        </ClockFrame>
      </ClockContainer>
      <div style={{ height: "10vh" }}></div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimeField
          ampm={false}
          inputProps={{
            style: {
              textAlign: "center",
              color: "white",
            },
          }}
          value={dayjs().hour(clockState.hour).minute(clockState.minute)}
          onChange={(newTimeMaybe: Dayjs | null) => {
            if (newTimeMaybe) {
              setClockState({
                hour: newTimeMaybe.hour(),
                minute: newTimeMaybe.minute(),
                mode: clockState.mode,
              });
            }
          }}
        />
      </LocalizationProvider>
    </ClockContext.Provider>
  );
}

export default ClockCombo;
