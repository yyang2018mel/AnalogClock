import React, { useState } from "react";
import { ClockState } from "./ClockState";
import ClockHand from "./ClockHand";
import ClockFace from "./ClockFace";
import { ClockContext } from "./Context";
import Crown from "./Crown";
import ClockFrame from "./ClockFrame";

function AnalogClock(prop: { clockSize: number }): React.JSX.Element {
  const { clockSize } = prop;
  const [clockState, setClockState] = useState<ClockState>({
    hour: 0,
    minute: 30,
    mode: "PausedNoAdjustable",
  });

  return (
    <ClockContext.Provider value={{ clockState, setClockState }}>
      <div style={makeClockContainerStyle(clockSize)}>
        <Crown zIndex={0} />
        <ClockFrame zIndex={1} clockSize={clockSize}>
          <ClockHand zIndex={0} clockSize={clockSize} type="hour" />
          <ClockHand zIndex={1} clockSize={clockSize} type="minute" />
          <ClockFace zIndex={2} clockSize={clockSize} />
        </ClockFrame>
      </div>
    </ClockContext.Provider>
  );
}

const makeClockContainerStyle = (clockSize: number): React.CSSProperties => {
  return {
    width: clockSize,
    height: clockSize,
    position: "relative",
  };
};

export default AnalogClock;
