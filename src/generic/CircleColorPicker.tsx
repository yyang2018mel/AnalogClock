import { Typography } from "@mui/material";
import { useState } from "react";
import { CirclePicker } from "react-color";

function CircleColorPicker({
  title,
  initColor,
  onColorChange,
}: {
  title: string;
  initColor: string;
  onColorChange: (color: string) => void;
}) {
  const [circledColor, setCircledColor] = useState<string>(initColor);

  return (
    <>
      <Typography variant="caption">{title}</Typography>
      <CirclePicker
        color={circledColor}
        circleSize={15}
        circleSpacing={8}
        onChange={(color: { hex: string }, _: any) => {
          setCircledColor(color.hex);
          onColorChange(color.hex);
        }}
        colors={[
          "#f44336",
          "#e91e63",
          "#9c27b0",
          "#673ab7",
          "#3f51b5",
          "#2196f3",
          "#03a9f4",
          "#00bcd4",
          "#009688",
          "#4caf50",
          "#8bc34a",
          "#cddc39",
          "#ffeb3b",
          "#ffc107",
          "#ff9800",
          "#ff5722",
          "#795548",
          "#607d8b",
          "#000000",
        ]}
      />
    </>
  );
}

export default CircleColorPicker;
