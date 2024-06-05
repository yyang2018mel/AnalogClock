import React from "react";
import AnalogClockHand, { HandType } from "./AnalogClockHand";
import ClockFace from "./AnalogClockFace";
import { ClockContext } from "./Context";
import AnalogClockCrown from "./AnalogClockCrown";
import AnalogClockFrame from "./AnalogClockFrame";
import AnalogClockContainer from "./AnalogClockContainer";
import { isClockAdjustable } from "./ClockState";
import { ClockConfig } from "./ClockConfig";
import { ClockImageUrls } from "./BackgroundImages";

function AnalogClock({
  clockConfig,
  clockUserMode,
}: {
  clockConfig: ClockConfig;
  clockUserMode: "Setup" | "Live" | "Static";
}): React.JSX.Element {
  const {
    clockSize,
    backgroundImgIndex,
    hourHandColor,
    minuteHandColor,
    secondHandColor,
    textColor,
  } = clockConfig;
  const { clockState } = React.useContext(ClockContext)!;
  const backgroundImageUrl =
    backgroundImgIndex !== null ? ClockImageUrls[backgroundImgIndex] : "";
  return (
    <AnalogClockContainer clockSize={clockSize}>
      <AnalogClockCrown zIndex={0} enabled={clockUserMode === "Static"} />
      <AnalogClockFrame
        zIndex={1}
        clockSize={clockSize}
        backgroundImageUrl={backgroundImageUrl}
      >
        <AnalogClockHand
          zIndex={10}
          clockSize={clockSize}
          type={HandType.Hour}
          baseColor={hourHandColor}
        />
        <AnalogClockHand
          zIndex={20}
          clockSize={clockSize}
          type={HandType.Minute}
          baseColor={minuteHandColor}
        />
        {secondHandColor && (
          <AnalogClockHand
            zIndex={30}
            clockSize={clockSize}
            type={HandType.Second}
            baseColor={secondHandColor as string}
          />
        )}
        <ClockFace
          zIndex={30}
          clockSize={clockSize}
          textColor={textColor}
          showMinute={isClockAdjustable(clockState)}
        />
      </AnalogClockFrame>
    </AnalogClockContainer>
  );
}

export default AnalogClock;
