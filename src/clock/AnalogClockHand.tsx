import React from "react";
import { ClockContext } from "./Context";
import { getClockHandDegreeFromTime } from "./ClockState";

enum HandType {
  Hour,
  Minute,
}

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

  const handLength =
    (type === HandType.Hour ? clockSize / 3 : clockSize / 2.5) * 0.85;

  const handWidth = type === HandType.Hour ? 8 : 6;

  const handColor =
    type === HandType.Hour && clockState.mode === "HourAdjustable"
      ? "green"
      : type === HandType.Minute && clockState.mode === "MinuteAdjustable"
      ? "green"
      : baseColor;

  const handDegree =
    type === HandType.Hour
      ? getClockHandDegreeFromTime(clockState).hourHandDegree
      : type === HandType.Minute
      ? getClockHandDegreeFromTime(clockState).minuteHandDegree
      : 0;

  const onDoubleClick = () => {
    setClockState((prev) => {
      if (type === HandType.Hour && prev.mode === "MinuteAdjustable") {
        return { ...prev, mode: "HourAdjustable" };
      }

      if (type === HandType.Minute && prev.mode === "HourAdjustable") {
        return { ...prev, mode: "MinuteAdjustable" };
      }

      return prev;
    });
  };

  return (
    <div
      onDoubleClick={onDoubleClick}
      style={{
        ...makeHandStyle(handColor, handLength, handWidth),
        transform: `rotate(${handDegree}deg)`,
        zIndex: zIndex,
      }}
    />
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
