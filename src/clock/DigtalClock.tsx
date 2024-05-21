import React from "react";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { ClockContext } from "./Context";
import { isClockAdjustable } from "./ClockState";

function DigitalClock(): React.JSX.Element {
  const { clockState, setClockState } = React.useContext(ClockContext)!;
  const isAdjustable = isClockAdjustable(clockState);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimeField
        size="small"
        ampm={false}
        readOnly={!isAdjustable}
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
  );
}

export default DigitalClock;
