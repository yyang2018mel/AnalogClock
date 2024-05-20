import React, { useState } from "react";
import { ClockState } from "./ClockState";
import { ClockContext } from "./Context";
import AnalogClock from "./AnalogClock";
import DigitalClock from "./DigtalClock";
import { ClockImageUrls } from "./BackgroundImages";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ScienceIcon from "@mui/icons-material/Science";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function ClockCombo(prop: { clockSize: number }): React.JSX.Element {
  const { clockSize } = prop;
  const [clockState, setClockState] = useState<ClockState>({
    hour: 0,
    minute: 30,
    mode: "PausedNoAdjustable",
  });

  const [clockUserMode, setClockUserMode] = useState<ClockUserMode>("Static");

  return (
    <ClockContext.Provider value={{ clockState, setClockState }}>
      <AnalogClock clockSize={clockSize} backgroundImageUrl="" />
      <div style={{ height: 10 }} />
      <DigitalClock />
      <div style={{ height: 10 }} />
      <BottomNavigation
        showLabels
        style={{ borderRadius: "10px" }}
        value={clockUserMode}
        onChange={(_, newValue) => setClockUserMode(newValue)}
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
