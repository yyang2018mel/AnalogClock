import React, { useState } from "react";
import { ClockState, getClockHandDegreeFromTime } from "./ClockState";
import ClockHand from "./ClockHand";
import ClockFace from "./ClockFace";
import { ClockContext } from "./Context";

function UpTriangle(): React.JSX.Element {
  const { setClockState } = React.useContext(ClockContext)!;

  return (
    <div
      style={{
        width: 0,
        height: 0,
        borderLeft: "5px solid transparent",
        borderRight: "5px solid transparent",
        borderBottom: "10px solid #fff",
        position: "absolute",
        top: "6%",
        left: "50%",
        transform: "translateX(-50%)",
        cursor: "grab",
      }}
      onClick={(e) => {
        setClockState((prev) => {
          if (prev.mode === "PausedNoAdjustable") return prev;
          else if (prev.mode === "HourAdjustable") {
            const newHour = prev.hour === 0 ? 11 : prev.hour - 1;
            return { ...prev, hour: newHour };
          } else {
            const newMinute = prev.minute === 0 ? 59 : prev.minute - 1;
            const newHour =
              prev.minute === 0
                ? prev.hour === 0
                  ? 11
                  : prev.hour - 1
                : prev.hour;
            return { ...prev, hour: newHour, minute: newMinute };
          }
        });
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
      }}
    />
  );
}

function DownTriangle(): React.JSX.Element {
  const { setClockState } = React.useContext(ClockContext)!;
  return (
    <div
      style={{
        width: 0,
        height: 0,
        borderLeft: "5px solid transparent",
        borderRight: "5px solid transparent",
        borderTop: "10px solid #fff",
        position: "absolute",
        top: "61%",
        left: "50%",
        transform: "translateX(-50%)",
        cursor: "grab",
      }}
      onClick={(e) => {
        setClockState((prev) => {
          if (prev.mode === "PausedNoAdjustable") return prev;
          else if (prev.mode === "HourAdjustable") {
            const newHour = prev.hour + 1;
            return { ...prev, hour: newHour % 12 };
          } else {
            const newMinute = prev.minute + 1;
            const newHour =
              prev.minute === 59 ? (prev.hour + 1) % 12 : prev.hour;
            return { ...prev, hour: newHour, minute: newMinute % 60 };
          }
        });
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
      }}
    />
  );
}

function Crown({ style }: { style?: React.CSSProperties }): React.JSX.Element {
  const styleSheet: React.CSSProperties = {
    width: "6%",
    height: "10%",
    backgroundColor: "#ccc",
    position: "absolute",
    right: "-5%",
    top: "45%",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
    ...style,
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
          <UpTriangle />
          <DownTriangle />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

function AnalogClock(prop: { clockSize: number }): React.JSX.Element {
  const { clockSize } = prop;
  const [clockState, setClockState] = useState<ClockState>({
    hour: 0,
    minute: 30,
    mode: "PausedNoAdjustable",
  });

  return (
    <ClockContext.Provider value={{ clockState, setClockState }}>
      <div style={makeClockContainerStyle(300)}>
        <div
          style={{
            ...makeClockFrameStyle(300),
            position: "absolute",
            zIndex: 1,
          }}
        >
          <ClockHand zIndex={0} clockSize={clockSize} type="hour" />
          <ClockHand zIndex={1} clockSize={clockSize} type="minute" />
          <ClockFace zIndex={2} clockSize={clockSize} />
        </div>
        <Crown style={{ zIndex: 0 }} />
      </div>
    </ClockContext.Provider>
  );
}

const makeClockContainerStyle = (clockSize: number): React.CSSProperties => {
  return {
    width: clockSize,
    height: clockSize,
    position: "relative",
  };
};

const makeClockFrameStyle = (clockSize: number): React.CSSProperties => {
  return {
    width: clockSize,
    height: clockSize,
    borderRadius: clockSize / 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 4,
    position: "relative",
  };
};

export default AnalogClock;
