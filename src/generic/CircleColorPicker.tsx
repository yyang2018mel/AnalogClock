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
      />
    </>
  );
}

export default CircleColorPicker;
