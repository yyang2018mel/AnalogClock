import React, { useState } from "react";
import { ClockContext } from "./Context";
import { Backward, Forward, isClockAdjustable } from "./ClockState";

function Triangle({
  direction,
}: {
  direction: "up" | "down";
}): React.JSX.Element {
  const { setClockState } = React.useContext(ClockContext)!;
  const baseStyle: React.CSSProperties = {
    width: 0,
    height: 0,
    borderLeft: "5px solid transparent",
    borderRight: "5px solid transparent",
    position: "absolute",
    transform: "translateX(-50%)",
    top: direction === "up" ? "6%" : "61%",
    left: "50%",
    cursor: "grab",
  };

  const style: React.CSSProperties =
    direction === "up"
      ? { ...baseStyle, borderBottom: "10px solid #fff" }
      : { ...baseStyle, borderTop: "10px solid #fff" };

  return (
    <div
      style={style}
      onDoubleClick={(e) => {
        e.stopPropagation();
      }}
      onClick={() => {
        setClockState((prev) => {
          if (!isClockAdjustable(prev)) return prev;
          const unit = prev.mode === "HourAdjustable" ? "hour" : "minute";
          const newTime =
            direction === "up" ? Backward(prev, unit) : Forward(prev, unit);
          return { ...prev, ...newTime };
        });
      }}
    />
  );
}

function AnalogClockCrown({ zIndex }: { zIndex: number }): React.JSX.Element {
  const styleSheet: React.CSSProperties = {
    width: "6%",
    height: "10%",
    backgroundColor: "#ccc",
    position: "absolute",
    right: "-5%",
    top: "45%",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
    zIndex: zIndex,
  };

  const [activated, setActivated] = useState<boolean>(false);
  const { setClockState } = React.useContext(ClockContext)!;

  return (
    <div
      style={styleSheet}
      onDoubleClick={() => {
        if (!activated) {
          setClockState((prev) => ({ ...prev, mode: "MinuteAdjustable" }));
        } else {
          setClockState((prev) => ({ ...prev, mode: "PausedNoAdjustable" }));
        }
        setActivated(!activated);
      }}
    >
      {activated ? (
        <>
          <Triangle direction="up" />
          <Triangle direction="down" />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AnalogClockCrown;
