import React, { useEffect, useState } from "react";
import { ClockContext } from "./Context";
import { Backward, Forward, isClockAdjustable } from "./ClockState";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Triangle({
  direction,
}: {
  direction: "up" | "down";
}): React.JSX.Element {
  const { setClockState } = React.useContext(ClockContext)!;

  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const handleMouseDown = () => {
    setClockState((prev) => {
      if (!isClockAdjustable(prev)) return prev;
      const unit = prev.mode === "HourAdjustable" ? "hour" : "minute";
      const newTime =
        direction === "up" ? Backward(prev, unit) : Forward(prev, unit);
      return { ...prev, ...newTime };
    });
  };

  const Icon = direction === "up" ? KeyboardArrowUpIcon : KeyboardArrowDownIcon;

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <Icon
      style={{ cursor: "grab", height: "50%" }}
      fontSize="small"
      onDoubleClick={(e) => {
        e.stopPropagation();
      }}
      onMouseDown={(e) => {
        if (e.button !== 0) return; // only respond to left-click
        handleMouseDown();
        setIntervalId(setInterval(handleMouseDown, 200)); // Fire every 200ms
      }}
      onMouseUp={() => {
        if (intervalId) {
          clearInterval(intervalId);
          setIntervalId(null);
        }
      }}
      onMouseLeave={() => {
        if (intervalId) {
          clearInterval(intervalId);
          setIntervalId(null);
        }
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
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
    zIndex: zIndex,
  };

  const [activated, setActivated] = useState<boolean>(false);
  const { setClockState } = React.useContext(ClockContext)!;

  return (
    <div
      style={styleSheet}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
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
