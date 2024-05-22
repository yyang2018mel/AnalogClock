import React, { useEffect, useState } from "react";
import { ClockContext } from "./Context";
import { getClockHandDegreeFromTime, isClockAdjustable } from "./ClockState";
import styled, { css, keyframes } from "styled-components";

enum HandType {
  Hour,
  Minute,
}

// Define a function that generates a keyframes animation
const createFlashAnimation = (color: string) => keyframes`
  0% { background-color: transparent; }
  50% { background-color: ${color}; }
  100% { background-color: transparent; }
`;

// Create a styled div that uses the animation
const FlashableDiv = styled.div<{ isFlashing: boolean; color: string }>`
  ${(props) =>
    props.isFlashing
      ? css`
          animation: ${createFlashAnimation(props.color)} 0.5s infinite;
        `
      : css`
          animation: none;
        `};
`;

function AnalogClockHand({
  type,
  zIndex,
  clockSize,
  baseColor,
}: {
  zIndex: number;
  clockSize: number;
  type: HandType;
  baseColor: string;
}): React.JSX.Element {
  const { clockState, setClockState } = React.useContext(ClockContext)!;
  const [shouldFlash, setShouldFlash] = useState<boolean>(false);

  const handLength =
    (type === HandType.Hour ? clockSize / 3 : clockSize / 2.5) * 0.9;

  const handWidth = type === HandType.Hour ? 10 : 6;

  const handDegree =
    type === HandType.Hour
      ? getClockHandDegreeFromTime(clockState).hourHandDegree
      : type === HandType.Minute
      ? getClockHandDegreeFromTime(clockState).minuteHandDegree
      : 0;

  const onDoubleClick = () => {
    if (type === HandType.Hour && clockState.mode === "MinuteAdjustable") {
      setClockState((prev) => ({ ...prev, mode: "HourAdjustable" }));
    }

    if (type === HandType.Minute && clockState.mode === "HourAdjustable") {
      setClockState((prev) => ({ ...prev, mode: "MinuteAdjustable" }));
    }
  };

  useEffect(() => {
    if (!isClockAdjustable(clockState)) {
      setShouldFlash(false);
    } else if (
      type === HandType.Hour &&
      clockState.mode === "MinuteAdjustable"
    ) {
      setShouldFlash(false);
    } else if (
      type === HandType.Minute &&
      clockState.mode === "HourAdjustable"
    ) {
      setShouldFlash(false);
    } else {
      setShouldFlash(true);
    }
  }, [clockState, type]);

  return (
    <FlashableDiv
      isFlashing={shouldFlash}
      color={baseColor}
      onDoubleClick={onDoubleClick}
      style={{
        ...makeHandStyle(baseColor, handLength, handWidth),
        transform: `rotate(${handDegree}deg)`,
        zIndex: zIndex,
      }}
    ></FlashableDiv>
  );
}

const makeHandStyle = (
  color: string,
  handLength: number,
  handWidth: number
): React.CSSProperties => {
  return {
    width: handWidth,
    height: handLength,
    backgroundColor: color,
    position: "absolute",
    left: `calc(50% - ${handWidth / 2}px)`,
    top: `calc(50% - ${handLength}px)`,
    transformOrigin: "50% 100%",
    borderTopLeftRadius: handWidth / 2,
    borderTopRightRadius: handWidth / 2,
  };
};

export { HandType };
export default AnalogClockHand;
