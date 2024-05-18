import React from "react";

function ClockContainer({
  clockSize,
  children,
}: {
  clockSize: number;
  children: React.ReactNode;
}): React.JSX.Element {
  return <div style={makeClockContainerStyle(clockSize)}>{children}</div>;
}

const makeClockContainerStyle = (clockSize: number): React.CSSProperties => {
  return {
    width: clockSize,
    height: clockSize,
    position: "relative",
  };
};

export default ClockContainer;
