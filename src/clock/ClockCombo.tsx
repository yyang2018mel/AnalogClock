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
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ScienceIcon from "@mui/icons-material/Science";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PictureSelectionGrid from "../generic/PictureSelector";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ClockCombo(prop: { clockSize: number }): React.JSX.Element {
  const { clockSize } = prop;
  const [clockState, setClockState] = useState<ClockState>({
    hour: 0,
    minute: 30,
    mode: "PausedNoAdjustable",
  });

  const [clockUserMode, setClockUserMode] = useState<ClockUserMode>("Static");
  const prevClockUserMode = useRef<ClockUserMode>(clockUserMode);

  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>("");
  const backgroundImageUrlRef = useRef<string>(backgroundImageUrl);

  return (
    <ClockContext.Provider value={{ clockState, setClockState }}>
      <AnalogClock
        clockSize={clockSize}
        backgroundImageUrl={backgroundImageUrl}
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
                candidateImages={ClockImageUrls}
                onPictureSelection={(url) =>
                  (backgroundImageUrlRef.current = url)
                }
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Clock Hand
            </AccordionSummary>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Text
            </AccordionSummary>
          </Accordion>
        </DialogContent>

        <DialogActions>
          <Button
            size="small"
            onClick={() => {
              setBackgroundImageUrl(backgroundImageUrlRef.current);
              setClockUserMode(prevClockUserMode.current);
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
