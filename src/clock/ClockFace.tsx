import React from "react";

function ClockFace({
  clockSize,
  zIndex,
}: {
  clockSize: number;
  zIndex: number;
}): React.JSX.Element {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  return (
    <div style={{ zIndex: zIndex }}>
      {hours.map((hour) => (
        <div key={hour} style={makeHourNumberStyle(hour, clockSize)}>
          {hour}
        </div>
      ))}
      <div style={makeClockCentreStyle(12)} />
    </div>
  );
}

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
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
};

export default ClockFace;
