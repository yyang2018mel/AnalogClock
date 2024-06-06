import React, { useEffect, useState } from "react";
import { ClockContext } from "./Context";
import {
  Backward,
  ClockAdjustable,
  Forward,
  isClockAdjustable,
  TimeUnit,
} from "./ClockState";
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
      const unit: TimeUnit =
        prev.mode === ClockAdjustable.Hour
          ? "hour"
          : prev.mode === ClockAdjustable.Minute
          ? "minute"
          : "second";
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

function AnalogClockCrown({
  zIndex,
  enabled,
}: {
  zIndex: number;
  enabled: boolean;
}): React.JSX.Element {
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
        if (!enabled) return;
        if (!activated) {
          setClockState((prev) => ({ ...prev, mode: ClockAdjustable.Minute }));
        } else {
          setClockState((prev) => ({ ...prev, mode: "JustPaused" }));
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
