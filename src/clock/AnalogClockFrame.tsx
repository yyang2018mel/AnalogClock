import React from "react";

function AnalogClockFrame({
  zIndex,
  clockSize,
  children,
}: {
  clockSize: number;
  zIndex: number;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div
      style={{
        ...makeClockFrameStyle(clockSize),
        zIndex: zIndex,
      }}
    >
      {children}
    </div>
  );
}

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

export default AnalogClockFrame;
