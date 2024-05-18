import React from "react";

function ClockFace({
  zIndex,
  clockSize,
  showMinute = false,
}: {
  clockSize: number;
  zIndex: number;
  showMinute: boolean;
}): React.JSX.Element {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => (i + 1) * 5);
  return (
    <div style={{ zIndex: zIndex }}>
      {hours.map((hour) => (
        <div
          key={hour}
          style={makeClockNumberStyle(hour, clockSize, 10, 12, "hour")}
        >
          {hour}
        </div>
      ))}
      {showMinute &&
        minutes.map((minute, i) => (
          <div
            key={i}
            style={makeClockNumberStyle(minute, clockSize, 6, 20, "minute")}
          >
            {minute}
          </div>
        ))}
      <div style={makeClockCentreStyle(12)} />
    </div>
  );
}

const makeClockNumberStyle = (
  number: number,
  clockSize: number,
  fontSize: number,
  offsetRate: number,
  unit: "hour" | "minute"
): React.CSSProperties => {
  const adjustedNumber = unit === "hour" ? number : number / 5;
  const angle = ((adjustedNumber - 3) * 30 * Math.PI) / 180;
  const radius = clockSize / 2 - clockSize / offsetRate;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);

  return {
    color: "#000",
    fontSize: fontSize,
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
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
};

export default ClockFace;
