import { Card, CardMedia, Grid } from "@mui/material";
import React from "react";

function PictureSelectionGrid({
  initSelectedIndex,
  candidateImages,
  onPictureSelection,
}: {
  initSelectedIndex: number | null;
  candidateImages: string[];
  onPictureSelection: (idx: number | null) => void;
}) {
  const [selected, setSelected] = React.useState<number | null>(
    initSelectedIndex
  );

  const handleSelect = (index: number) => {
    setSelected(index === selected ? null : index);
    onPictureSelection(index === selected ? null : index);
  };

  return (
    <Grid container spacing={3} style={{ maxHeight: "90%" }}>
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
