import React, { useState } from "react";
import { ClockState } from "./ClockState";
import ClockHand, { HandType } from "./ClockHand";
import ClockFace from "./ClockFace";
import { ClockContext } from "./Context";
import ClockCrown from "./ClockCrown";
import ClockFrame from "./ClockFrame";
import ClockContainer from "./ClockContainer";

function AnalogClock(prop: { clockSize: number }): React.JSX.Element {
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
          <ClockHand zIndex={10} clockSize={clockSize} type={HandType.Hour} />
          <ClockHand zIndex={20} clockSize={clockSize} type={HandType.Minute} />
          <ClockFace zIndex={30} clockSize={clockSize} />
        </ClockFrame>
      </ClockContainer>
    </ClockContext.Provider>
  );
}

export default AnalogClock;
