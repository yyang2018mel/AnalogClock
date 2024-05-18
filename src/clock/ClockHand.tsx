import React from "react";
import { ClockContext } from "./Context";
import { getClockHandDegreeFromTime } from "./ClockState";

function ClockHand({
  type,
  zIndex,
  clockSize,
}: {
  zIndex: number;
  clockSize: number;
  type: "hour" | "minute";
}): React.JSX.Element {
  const { clockState, setClockState } = React.useContext(ClockContext)!;

  const handLength = (type === "hour" ? clockSize / 3 : clockSize / 2.5) * 0.85;

  const handWidth = type === "hour" ? 8 : 6;

  const handColor =
    type === "hour" && clockState.mode === "HourAdjustable"
      ? "green"
      : type === "minute" && clockState.mode === "MinuteAdjustable"
      ? "green"
      : "#000";

  const handDegree =
    type === "hour"
      ? getClockHandDegreeFromTime(clockState).hourHandDegree
      : type === "minute"
      ? getClockHandDegreeFromTime(clockState).minuteHandDegree
      : 0;

  const onDoubleClick = () => {
    setClockState((prev) => {
      if (type === "hour" && prev.mode === "MinuteAdjustable") {
        return { ...prev, mode: "HourAdjustable" };
      }

      if (type === "minute" && prev.mode === "HourAdjustable") {
        return { ...prev, mode: "MinuteAdjustable" };
      }

      return prev;
    });
  };

  return (
    <div
      onDoubleClick={onDoubleClick}
      style={{
        ...makeHandStyle(handLength, handWidth, handColor),
        transform: `rotate(${handDegree}deg)`,
        zIndex: zIndex,
      }}
    />
  );
}

const makeHandStyle = (
  handLength: number,
  handWidth: number,
  color: string = "#000"
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

export default ClockHand;
