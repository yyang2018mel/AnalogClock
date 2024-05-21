import React, { useEffect, useRef, useState } from "react";
import { ClockState } from "./ClockState";
import { ClockContext } from "./Context";
import AnalogClock from "./AnalogClock";
import DigitalClock from "./DigtalClock";
import { ClockImageUrls } from "./BackgroundImages";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ScienceIcon from "@mui/icons-material/Science";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PictureSelectionGrid from "../generic/PictureSelector";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ClockCombo(): React.JSX.Element {
  const [clockState, setClockState] = useState<ClockState>({
    hour: 0,
    minute: 30,
    mode: "PausedNoAdjustable",
  });

  const [clockUserMode, setClockUserMode] = useState<ClockUserMode>("Static");
  const prevClockUserMode = useRef<ClockUserMode>(clockUserMode);

  const [backgroundImgIndex, setBackgroundImgIndex] = useState<number | null>(
    null
  );
  const backgroundImageIndexRef = useRef<number | null>(backgroundImgIndex);

  const [clockSize, setClockSize] = useState<number>(200);
  const clockSizeRef = useRef<number>(clockSize);

  return (
    <ClockContext.Provider value={{ clockState, setClockState }}>
      <AnalogClock
        clockSize={clockSize}
        backgroundImageUrl={
          backgroundImgIndex !== null ? ClockImageUrls[backgroundImgIndex] : ""
        }
      />
      <div style={{ height: 10 }} />
      <DigitalClock />
      <div style={{ height: 10 }} />

      <Dialog
        open={clockUserMode === "Setup"}
        scroll="paper"
        onClose={() => setClockUserMode(prevClockUserMode.current)}
      >
        <DialogTitle>Configuration</DialogTitle>
        <DialogContent>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Background Image
            </AccordionSummary>
            <AccordionDetails>
              <PictureSelectionGrid
                initSelectedIndex={backgroundImageIndexRef.current}
                candidateImages={ClockImageUrls}
                onPictureSelection={(idx) =>
                  (backgroundImageIndexRef.current = idx)
                }
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
                defaultValue={clockSize}
                min={100}
                max={350}
                onChange={(e, newVal) =>
                  (clockSizeRef.current = newVal as number)
                }
              />
            </AccordionDetails>
          </Accordion>
        </DialogContent>

        <DialogActions>
          <Button
            size="small"
            onClick={() => {
              setBackgroundImgIndex(backgroundImageIndexRef.current);
              setClockUserMode(prevClockUserMode.current);
              setClockSize(clockSizeRef.current);
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      <BottomNavigation
        showLabels
        style={{ borderRadius: "10px" }}
        value={clockUserMode}
        onChange={(_, newValue) =>
          setClockUserMode((prev) => {
            prevClockUserMode.current = prev;
            return newValue;
          })
        }
      >
        <BottomNavigationAction
          label="Setup"
          value="Setup"
          icon={<SettingsIcon />}
        />
        <BottomNavigationAction
          label="Live"
          value="Live"
          icon={<AccessTimeIcon />}
        />
        <BottomNavigationAction
          label="Static"
          value="Static"
          icon={<ScienceIcon />}
        />
      </BottomNavigation>
    </ClockContext.Provider>
  );
}

type ClockUserMode = "Setup" | "Live" | "Static";

export default ClockCombo;
