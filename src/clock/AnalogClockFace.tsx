import React from "react";

function ClockFace({
  zIndex,
  clockSize,
  textColor,
  showMinute = false,
}: {
  clockSize: number;
  textColor: string;
  zIndex: number;
  showMinute: boolean;
}): React.JSX.Element {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutesBy5 = hours.map((hour) => hour * 5);
  const minutesBy1 = Array.from({ length: 60 }, (_, i) => i + 1);
  return (
    <div style={{ zIndex: zIndex }}>
      {hours.map((hour) => (
        <div
          key={hour}
          style={makeClockNumberStyle(
            hour,
            clockSize,
            clockSize / 20,
            "hour",
            textColor
          )}
        >
          {hour}
        </div>
      ))}
      {showMinute &&
        minutesBy1.map((minute) => (
          <div key={minute} style={makeMinuteMarkStyle(minute, clockSize)} />
        ))}
      {showMinute &&
        minutesBy5.map((minute, i) => (
          <div
            key={i}
            style={makeClockNumberStyle(
              minute,
              clockSize,
              clockSize / 50,
              "minute",
              textColor
            )}
          >
            {minute % 60}
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
  unit: "hour" | "minute",
  textColor: string
): React.CSSProperties => {
  const adjustedNumber = unit === "hour" ? number : number / 5;
  const angle = ((adjustedNumber - 3) * 30 * Math.PI) / 180;
  const radius = clockSize / (unit === "hour" ? 2.5 : 2.2);
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);

  return {
    color: textColor,
    fontSize: fontSize,
    fontWeight: unit === "hour" ? "bold" : "normal",
    position: "absolute",
    left: `calc(50% + ${x}px)`,
    top: `calc(50% + ${y}px)`,
    transform: "translate(-50%, -50%)",
  };
};

const makeMinuteMarkStyle = (
  minute: number,
  clockSize: number
): React.CSSProperties => {
  const angle = ((minute - 15) * 6 * Math.PI) / 180;
  const outerRadius = clockSize / 1.96;
  const markLength = outerRadius * 0.05; // Length of the mark (5% of the radius)
  const markWidth = 2; // Width of the mark
  const innerRadius = outerRadius - markLength; // Start the mark inward from the outer edge
  const xInner = innerRadius * Math.cos(angle);
  const yInner = innerRadius * Math.sin(angle);

  return {
    width: minute % 5 === 0 ? markWidth : markWidth / 2, // Thicker mark for each 5th minute
    height: markLength, // Length of the minute mark
    backgroundColor: "#000",
    position: "absolute",
    left: `calc(50% + ${xInner}px)`,
    top: `calc(50% + ${yInner}px)`,
    transform: `translate(-50%, -50%) rotate(${minute * 6}deg)`,
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
