import React, { useCallback, useRef, useState } from "react";
import { ClockState } from "./ClockState";
import { ClockContext } from "./Context";
import AnalogClock from "./AnalogClock";
import DigitalClock from "./DigtalClock";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Switch,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ScienceIcon from "@mui/icons-material/Science";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { ClockConfig, DefaultClockConfig } from "./ClockConfig";
import ClockConfigurationDialog from "./ClockConfigurationDialog";

type ClockUserMode = "Setup" | "Live" | "Static";
const MClockConfigurationDialog = React.memo(ClockConfigurationDialog);

function ClockCombo(): React.JSX.Element {
  const [clockState, setClockState] = useState<ClockState>({
    hour: 1,
    minute: 30,
    mode: "PausedNoAdjustable",
  });

  const [clockUserMode, setClockUserMode] = useState<ClockUserMode>("Static");
  const clockUserModeBeforeConfig = useRef<ClockUserMode>(clockUserMode);

  const [clockConfig, setClockConfig] =
    useState<ClockConfig>(DefaultClockConfig);

  const commitedClockConfig = useRef<ClockConfig>(clockConfig);

  const commitClockConfig = useCallback((c: ClockConfig) => {
    commitedClockConfig.current = c;
  }, []);

  const closeDialog = useCallback(() => {
    setClockUserMode(clockUserModeBeforeConfig.current);
  }, []);

  const [showDigital, setShowDigital] = useState<boolean>(false);

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
      width={"100vw"}
      style={{ backgroundColor: "#282c34" }}
    >
      <ClockContext.Provider value={{ clockState, setClockState }}>
        <AnalogClock clockConfig={clockConfig} clockUserMode={clockUserMode} />
        <div style={{ height: 10 }} />
        {showDigital && <DigitalClock />}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Switch
            checked={showDigital}
            onChange={(e) => {
              setShowDigital(e.target.checked);
            }}
          />
          <Typography variant="button">{`${
            showDigital ? "Hide" : "Show"
          } Digital Clock`}</Typography>
        </Box>
      </ClockContext.Provider>

      <MClockConfigurationDialog
        initConfig={commitedClockConfig.current}
        shouldOpen={clockUserMode === "Setup"}
        stageClockConfig={setClockConfig}
        commitClockConfig={commitClockConfig}
        onClose={closeDialog}
      />

      <BottomNavigation
        showLabels
        style={{ borderRadius: "10px" }}
        value={clockUserMode}
        onChange={(_, newValue) =>
          setClockUserMode((prev) => {
            clockUserModeBeforeConfig.current = prev;
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
    </Box>
  );
}

export default ClockCombo;
