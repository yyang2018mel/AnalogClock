import { Card, CardMedia, Checkbox, Grid } from "@mui/material";
import React from "react";

function PictureSelectionGrid({
  candidateImages,
  selectionType,
}: {
  selectionType: "single" | "multiple";
  candidateImages: string[];
}) {
  const [selected, setSelected] = React.useState<Record<number, boolean>>({});

  const handleSelect = (index: number) => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      [index]: !prevSelected[index],
    }));
  };

  return (
    <Grid container spacing={3}>
      {candidateImages.map((url, index) => (
        <Grid item xs={4} key={index}>
          <Card onClick={() => handleSelect(index)}>
            <CardMedia
              component="img"
              alt={`Image ${index}`}
              height="140"
              image={url}
            />
            <Checkbox
              checked={!!selected[index]}
              onChange={() => handleSelect(index)}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default PictureSelectionGrid;
