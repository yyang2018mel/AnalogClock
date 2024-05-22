import React, { useRef } from "react";
import { ClockImageUrls } from "./BackgroundImages";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Slider,
} from "@mui/material";
import PictureSelectionGrid from "../generic/PictureSelector";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircleColorPicker from "../generic/CircleColorPicker";
import { ClockConfig } from "./ClockConfig";

function ClockConfigurationDialog({
  initConfig,
  shouldOpen,
  stageClockConfig,
  commitClockConfig,
  onClose,
}: {
  initConfig: ClockConfig;
  shouldOpen: boolean;
  stageClockConfig: React.Dispatch<React.SetStateAction<ClockConfig>>;
  commitClockConfig: (c: ClockConfig) => void;
  onClose: () => void;
}): React.JSX.Element {
  const workingConfigRef = useRef<ClockConfig>(initConfig);

  const onDialogApply = () => {
    commitClockConfig(workingConfigRef.current);
    onClose();
  };

  const onDialogCloseWithoutApply = () => {
    // rollback
    stageClockConfig(initConfig);
    onClose();
  };

  return (
    <Dialog
      keepMounted
      open={shouldOpen}
      scroll="paper"
      onClose={onDialogCloseWithoutApply}
      PaperComponent={({ children }) => (
        <Paper
          style={{
            width: "30%",
            minHeight: "50%",
            maxHeight: "90%",
            marginLeft: "auto",
          }}
        >
          {children}
        </Paper>
      )}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <DialogTitle>Configuration</DialogTitle>
        <DialogActions>
          <Button size="small" onClick={onDialogApply}>
            Apply
          </Button>
        </DialogActions>
      </Box>
      <DialogContent>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Background Image
          </AccordionSummary>
          <AccordionDetails>
            <PictureSelectionGrid
              initSelectedIndex={initConfig.backgroundImgIndex}
              candidateImages={ClockImageUrls}
              onPictureSelection={(idx) => {
                workingConfigRef.current = {
                  ...workingConfigRef.current,
                  backgroundImgIndex: idx,
                };
                stageClockConfig((prev) => ({
                  ...prev,
                  backgroundImgIndex: idx,
                }));
              }}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Sizing
          </AccordionSummary>
          <AccordionDetails>
            <div>Clock Size</div>
            <Slider
              valueLabelDisplay="auto"
              defaultValue={initConfig.clockSize}
              min={200}
              max={500}
              onChange={(e, newVal) => {
                workingConfigRef.current = {
                  ...workingConfigRef.current,
                  clockSize: newVal as number,
                };
                stageClockConfig((prev) => ({
                  ...prev,
                  clockSize: newVal as number,
                }));
              }}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Coloring
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <CircleColorPicker
                  title="Hour Hand"
                  initColor={workingConfigRef.current.hourHandColor}
                  onColorChange={(color) => {
                    workingConfigRef.current = {
                      ...workingConfigRef.current,
                      hourHandColor: color,
                    };
                    stageClockConfig((prev) => ({
                      ...prev,
                      hourHandColor: color,
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <CircleColorPicker
                  title="Minute Hand"
                  initColor={workingConfigRef.current.minuteHandColor}
                  onColorChange={(color) => {
                    workingConfigRef.current = {
                      ...workingConfigRef.current,
                      minuteHandColor: color,
                    };
                    stageClockConfig((prev) => ({
                      ...prev,
                      minuteHandColor: color,
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <CircleColorPicker
                  title="Text"
                  initColor={workingConfigRef.current.textColor}
                  onColorChange={(color) => {
                    workingConfigRef.current = {
                      ...workingConfigRef.current,
                      textColor: color,
                    };
                    stageClockConfig((prev) => ({
                      ...prev,
                      textColor: color,
                    }));
                  }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}

export default ClockConfigurationDialog;
