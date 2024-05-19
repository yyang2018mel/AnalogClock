import React from "react";

function AnalogClockFrame({
  zIndex,
  clockSize,
  backgroundImageUrl,
  children,
}: {
  clockSize: number;
  zIndex: number;
  backgroundImageUrl: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      style={{
        ...makeClockFrameStyle(clockSize),
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
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
