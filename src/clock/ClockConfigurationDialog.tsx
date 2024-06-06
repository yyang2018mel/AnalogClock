import React, { useRef, useState } from "react";
import { ClockImageUrls } from "../resource/BackgroundImages";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from "@mui/material";
import PictureSelectionGrid from "../generic/PictureSelector";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircleColorPicker from "../generic/CircleColorPicker";
import { ClockConfig } from "./ClockConfig";

type ConfigDialogState = {
  configuringBackgroundImage: boolean;
  configuringSize: boolean;
  configuringColor: boolean;
  configuringGranularity: boolean;
};

function MinuteOrSecondChooser({
  initValue,
  onChange,
}: {
  initValue: "Second" | "Minute";
  onChange: (value: "Second" | "Minute") => void;
}): React.JSX.Element {
  const [value, setValue] = useState(initValue);

  return (
    <FormControl>
      <RadioGroup
        row
        value={value}
        onChange={(e) => {
          setValue(e.target.value as "Second" | "Minute");
          onChange(e.target.value as "Second" | "Minute");
        }}
      >
        <FormControlLabel value="Minute" control={<Radio />} label="Minute" />
        <FormControlLabel value="Second" control={<Radio />} label="Second" />
      </RadioGroup>
    </FormControl>
  );
}

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

  const [dialogState, setDialogState] = useState<ConfigDialogState>({
    configuringBackgroundImage: false,
    configuringColor: false,
    configuringSize: false,
    configuringGranularity: false,
  });

  const [allowSecondHandColorConfig, setAllowSecondHandColorConfig] =
    useState<boolean>(Boolean(initConfig.secondHandColor));

  const onDialogApply = () => {
    commitClockConfig(workingConfigRef.current);
    onClose();
  };

  const onDialogCloseWithoutApply = () => {
    // rollback
    stageClockConfig(initConfig);
    setAllowSecondHandColorConfig(Boolean(initConfig.secondHandColor));
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      // sx={{ width: "25vw" }}
      PaperProps={{
        sx: { width: "25vw" }, // Also apply the width to the Paper component inside the Drawer
      }}
      open={shouldOpen}
      onClose={onDialogCloseWithoutApply}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <DialogTitle>Configuration</DialogTitle>
        <DialogActions>
          <Button size="small" onClick={onDialogApply}>
            <Typography>Apply</Typography>
          </Button>
        </DialogActions>
      </Box>
      <DialogContent>
        <Accordion
          expanded={dialogState.configuringBackgroundImage}
          onChange={(e, ex) =>
            setDialogState((prev) => ({
              ...prev,
              configuringBackgroundImage: ex,
            }))
          }
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="caption">Background Image</Typography>
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
        <Accordion
          expanded={dialogState && dialogState.configuringSize}
          onChange={(e, ex) =>
            setDialogState((prev) => ({ ...prev, configuringSize: ex }))
          }
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="caption">Sizing</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="caption">Clock Size</Typography>
            <Slider
              valueLabelDisplay="auto"
              defaultValue={initConfig.clockSize}
              min={300}
              max={700}
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
        <Accordion
          expanded={dialogState.configuringGranularity}
          onChange={(e, ex) =>
            setDialogState((prev) => ({ ...prev, configuringGranularity: ex }))
          }
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="caption">Minimum</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MinuteOrSecondChooser
              initValue={initConfig.secondHandColor ? "Second" : "Minute"}
              onChange={(val) => {
                setAllowSecondHandColorConfig(val === "Second");
                if (val === "Minute") {
                  stageClockConfig((prev) => ({
                    ...prev,
                    secondHandColor: null,
                  }));
                } else {
                  workingConfigRef.current = {
                    ...workingConfigRef.current,
                    secondHandColor:
                      workingConfigRef.current.secondHandColor ?? "black",
                  };
                  stageClockConfig((prev) => ({
                    ...prev,
                    secondHandColor:
                      workingConfigRef.current.secondHandColor ?? "black",
                  }));
                }
              }}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={dialogState.configuringColor}
          onChange={(e, ex) =>
            setDialogState((prev) => ({ ...prev, configuringColor: ex }))
          }
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="caption">Coloring</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid
              container
              spacing={3}
              direction={"column"}
              justifyContent={"space-between"}
              alignItems="left"
            >
              <Grid item>
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
              <Grid item>
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
              {allowSecondHandColorConfig && (
                <Grid item>
                  <CircleColorPicker
                    title="Second Hand"
                    initColor={
                      workingConfigRef.current.secondHandColor as string
                    }
                    onColorChange={(color) => {
                      workingConfigRef.current = {
                        ...workingConfigRef.current,
                        secondHandColor: color,
                      };
                      stageClockConfig((prev) => ({
                        ...prev,
                        secondHandColor: color,
                      }));
                    }}
                  />
                </Grid>
              )}
              <Grid item>
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
    </Drawer>
  );
}

export default ClockConfigurationDialog;
