import React, { useEffect, useRef, useState } from "react";
import { ClockState } from "./ClockState";
import { ClockContext } from "./Context";
import AnalogClock from "./AnalogClock";
import DigitalClock from "./DigtalClock";
import { ClockImageUrls } from "./BackgroundImages";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ScienceIcon from "@mui/icons-material/Science";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PictureSelectionGrid from "../generic/PictureSelector";

function ClockCombo(prop: { clockSize: number }): React.JSX.Element {
  const { clockSize } = prop;
  const [clockState, setClockState] = useState<ClockState>({
    hour: 0,
    minute: 30,
    mode: "PausedNoAdjustable",
  });

  const [clockUserMode, setClockUserMode] = useState<ClockUserMode>("Static");
  const prevClockUserMode = useRef<ClockUserMode>(clockUserMode);

  return (
    <ClockContext.Provider value={{ clockState, setClockState }}>
      <AnalogClock clockSize={clockSize} backgroundImageUrl="" />
      <div style={{ height: 10 }} />
      <DigitalClock />
      <div style={{ height: 10 }} />

      <Dialog
        open={clockUserMode === "Setup"}
        onClose={() => setClockUserMode(prevClockUserMode.current)}
      >
        <DialogTitle fontSize={12}>Configuration</DialogTitle>
        {/* <PictureSelectionGrid
          selectionType="single"
          candidateImages={ClockImageUrls}
        /> */}
        <DialogActions>
          <Button size="small">Apply</Button>
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
