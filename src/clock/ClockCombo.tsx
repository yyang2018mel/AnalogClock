import React, { useState } from "react";
import { ClockState } from "./ClockState";
import { ClockContext } from "./Context";
import AnalogClock from "./AnalogClock";
import DigitalClock from "./DigtalClock";
import { ClockImageUrls } from "./BackgroundImages";

function ClockCombo(prop: { clockSize: number }): React.JSX.Element {
  const { clockSize } = prop;
  const [clockState, setClockState] = useState<ClockState>({
    hour: 0,
    minute: 30,
    mode: "PausedNoAdjustable",
  });

  return (
    <ClockContext.Provider value={{ clockState, setClockState }}>
      <AnalogClock
        clockSize={clockSize}
        backgroundImageUrl={ClockImageUrls[0]}
      />
      <div style={{ height: 20 }} />
      <DigitalClock />
    </ClockContext.Provider>
  );
}

export default ClockCombo;
