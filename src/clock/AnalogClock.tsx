import React, { useState } from "react";

type ClockState = {
  hour: number;
  minute: number;
  adjustable: "hour" | "minute" | "none";
};

function getHandDegreeFromClockState(clockState: ClockState): {
  hourHandDegree: number;
  minuteHandDegree: number;
} {
  const hourHandDegree = (clockState.hour % 12) * 30;
  const minuteHandDegree = clockState.minute * 6;
  const adjustedHourHandDegree = hourHandDegree + (clockState.minute / 60) * 30;

  return {
    hourHandDegree: adjustedHourHandDegree,
    minuteHandDegree: minuteHandDegree,
  };
}

type ClockStateContext = {
  clockState: ClockState;
  setClockState: React.Dispatch<React.SetStateAction<ClockState>>;
};

const ClockContext = React.createContext<ClockStateContext | undefined>(
  undefined
);

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
          if (prev.adjustable === "none") return prev;
          else if (prev.adjustable === "hour") {
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
          if (prev.adjustable === "none") return prev;
          else if (prev.adjustable === "hour") {
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
          setClockState((prev) => ({ ...prev, adjustable: "minute" }));
        } else {
          setClockState((prev) => ({ ...prev, adjustable: "none" }));
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
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  const [clockState, setClockState] = useState<ClockState>({
    hour: 0,
    minute: 30,
    adjustable: "none",
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
          {hours.map((hour) => (
            <div key={hour} style={makeHourNumberStyle(hour, clockSize)}>
              {hour}
            </div>
          ))}
          <div
            style={{
              ...makeClockCentreStyle(12),
              zIndex: 1,
            }}
          />
          <div
            onDoubleClick={() => {
              setClockState((prev) => {
                if (prev.adjustable === "minute")
                  return { ...prev, adjustable: "hour" };
                return prev;
              });
            }}
            style={{
              ...makeHandStyle(
                80,
                6,
                clockState.adjustable === "hour" ? "green" : "#000"
              ),
              transform: `rotate(${
                getHandDegreeFromClockState(clockState).hourHandDegree
              }deg)`,
              zIndex: 0,
            }}
          />
          <div
            onDoubleClick={() => {
              setClockState((prev) => {
                if (prev.adjustable === "hour")
                  return { ...prev, adjustable: "minute" };
                return prev;
              });
            }}
            style={{
              ...makeHandStyle(
                100,
                5,
                clockState.adjustable === "minute" ? "green" : "#000"
              ),
              transform: `rotate(${
                getHandDegreeFromClockState(clockState).minuteHandDegree
              }deg)`,
              zIndex: 0,
            }}
          />
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

const makeHourNumberStyle = (
  hour: number,
  clockSize: number
): React.CSSProperties => {
  const angle = ((hour - 3) * 30 * Math.PI) / 180;
  const radius = clockSize / 2 - clockSize / 12;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);

  return {
    color: "#000",
    position: "absolute",
    left: `calc(50% + ${x}px)`,
    top: `calc(50% + ${y}px)`,
    transform: "translate(-50%, -50%)",
  };
};

const makeClockCentreStyle = (
  clockCenterSize: number = 5
): React.CSSProperties => {
  return {
    width: clockCenterSize,
    height: clockCenterSize,
    borderRadius: "50%",
    backgroundColor: "#000",
    position: "absolute",
  };
};

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

export default AnalogClock;
