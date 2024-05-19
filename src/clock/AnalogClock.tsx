import React from "react";
import AnalogClockHand, { HandType } from "./AnalogClockHand";
import ClockFace from "./AnalogClockFace";
import { ClockContext } from "./Context";
import AnalogClockCrown from "./AnalogClockCrown";
import AnalogClockFrame from "./AnalogClockFrame";
import AnalogClockContainer from "./AnalogClockContainer";
import { isClockAdjustable } from "./ClockState";

function AnalogClock({
  clockSize,
  backgroundImageUrl,
}: {
  clockSize: number;
  backgroundImageUrl: string;
}): React.JSX.Element {
  const { clockState } = React.useContext(ClockContext)!;
  return (
    <AnalogClockContainer clockSize={clockSize}>
      <AnalogClockCrown zIndex={0} />
      <AnalogClockFrame
        zIndex={1}
        clockSize={clockSize}
        backgroundImageUrl={backgroundImageUrl}
      >
        <AnalogClockHand
          zIndex={10}
          clockSize={clockSize}
          type={HandType.Hour}
          baseColor="orange"
        />
        <AnalogClockHand
          zIndex={20}
          clockSize={clockSize}
          type={HandType.Minute}
          baseColor="red"
        />
        <ClockFace
          zIndex={30}
          clockSize={clockSize}
          showMinute={isClockAdjustable(clockState)}
        />
      </AnalogClockFrame>
    </AnalogClockContainer>
  );
}

export default AnalogClock;
