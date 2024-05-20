import { Card, CardMedia, Checkbox, Grid } from "@mui/material";
import React from "react";

function PictureSelectionGrid({
  candidateImages,
  onPictureSelection,
}: {
  candidateImages: string[];
  onPictureSelection: (url: string) => void;
}) {
  const [selected, setSelected] = React.useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelected(index === selected ? null : index);
    onPictureSelection(candidateImages[index]);
  };

  return (
    <Grid container spacing={3}>
      {candidateImages.map((url, index) => (
        <Grid item xs={4} key={index}>
          <Card
            onClick={() => handleSelect(index)}
            style={
              selected === index
                ? { borderStyle: "solid", borderWidth: 2, borderColor: "blue" }
                : {}
            }
          >
            <CardMedia
              component="img"
              alt={`Image ${index}`}
              height="140"
              image={url}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default PictureSelectionGrid;
