import React, { useEffect, useState } from "react";
import { ClockContext } from "./Context";
import {
  ClockState,
  getClockHandDegreeFromTime,
  isClockAdjustable,
} from "./ClockState";
import styled, { css, keyframes } from "styled-components";

export enum HandType {
  Hour,
  Minute,
  Second,
}

// Define a function that generates a keyframes animation
const createFlashAnimation = (color: string) => keyframes`
  0% { background-color: transparent; }
  50% { background-color: ${color}; }
  100% { background-color: transparent; }
`;

// Create a styled div that uses the animation
const FlashableDiv = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isflashing", // prevent isflashing to be passed onto the DOM, which causes a console error
})<{ isflashing: boolean; color: string }>`
  ${(props) =>
    props.isflashing
      ? css`
          animation: ${createFlashAnimation(props.color)} 0.5s infinite;
        `
      : css`
          animation: none;
        `};
`;

export function AnalogClockHandView({
  type,
  zIndex,
  handColor,
  clockSize,
  clockState,
  shouldFlash = false,
  onDoubleClick,
}: {
  type: HandType;
  zIndex: number;
  handColor: string;
  clockSize: number;
  clockState: ClockState;
  shouldFlash: boolean;
  onDoubleClick?: () => void;
}): React.JSX.Element {
  const handLength =
    (type === HandType.Hour
      ? clockSize / 3
      : type === HandType.Minute
      ? clockSize / 2.5
      : clockSize / 2.4) * 0.9;

  const handWidth = type === HandType.Hour ? 12 : 8;

  const handOpacity: number = type === HandType.Second ? 0.6 : 1.0;

  const handDegree =
    type === HandType.Hour
      ? getClockHandDegreeFromTime(clockState).hourHandDegree
      : type === HandType.Minute
      ? getClockHandDegreeFromTime(clockState).minuteHandDegree
      : type === HandType.Second
      ? getClockHandDegreeFromTime(clockState).secondHandDegree
      : 0;

  return (
    <FlashableDiv
      isflashing={shouldFlash}
      color={handColor}
      onDoubleClick={onDoubleClick}
      style={{
        ...makeHandStyle(handColor, handLength, handWidth, handOpacity),
        transform: `rotate(${handDegree}deg)`,
        zIndex: zIndex,
      }}
    ></FlashableDiv>
  );
}

function AnalogClockHand({
  type,
  zIndex,
  clockSize,
  handColor,
}: {
  zIndex: number;
  clockSize: number;
  type: HandType;
  handColor: string;
}): React.JSX.Element {
  const { clockState, setClockState } = React.useContext(ClockContext)!;
  const [shouldFlash, setShouldFlash] = useState<boolean>(false);
  const onDoubleClick = () => {
    if (!isClockAdjustable(clockState.mode)) return;
    if (clockState.mode.adjustableHand !== type) {
      setClockState((prev) => ({
        ...prev,
        mode: { adjustableHand: type },
      }));
    }
  };

  useEffect(() => {
    const shouldFlash =
      isClockAdjustable(clockState.mode) &&
      clockState.mode.adjustableHand === type;
    setShouldFlash(shouldFlash);
  }, [clockState, type]);

  return (
    <AnalogClockHandView
      type={type}
      zIndex={zIndex}
      handColor={handColor}
      clockSize={clockSize}
      clockState={clockState}
      shouldFlash={shouldFlash}
      onDoubleClick={onDoubleClick}
    />
  );
}

const makeHandStyle = (
  color: string,
  handLength: number,
  handWidth: number,
  opacity: number = 1.0
): React.CSSProperties => {
  return {
    width: handWidth,
    height: handLength,
    backgroundColor: color,
    opacity: opacity,
    position: "absolute",
    left: `calc(50% - ${handWidth / 2}px)`,
    top: `calc(50% - ${handLength}px)`,
    transformOrigin: "50% 100%",
    borderTopLeftRadius: handWidth / 2,
    borderTopRightRadius: handWidth / 2,
  };
};

export default AnalogClockHand;
