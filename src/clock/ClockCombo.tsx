import React, { useCallback, useEffect, useRef, useState } from "react";
import { ClockState, getInitialClockState } from "./ClockState";
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
import { ClockConfig, getInitialClockConfig } from "./ClockConfig";
import ClockConfigurationDialog from "./ClockConfigurationDialog";
import Cookies from "js-cookie";
import { ClockUserMode, getInitialClockUserMode } from "./ClockUserMode";

const MClockConfigurationDialog = React.memo(ClockConfigurationDialog);

function ClockCombo(): React.JSX.Element {
  const [clockState, setClockState] =
    useState<ClockState>(getInitialClockState);

  const [clockConfig, setClockConfig] = useState<ClockConfig>(
    getInitialClockConfig
  );

  const [clockUserMode, setClockUserMode] = useState<ClockUserMode>(
    getInitialClockUserMode
  );

  const clockUserModeBeforeConfig = useRef<ClockUserMode>(clockUserMode);

  useEffect(() => {
    Cookies.set("clockConfigCookie", JSON.stringify(clockConfig), {
      expires: 1,
    });

    if (clockUserMode !== "Setup") {
      Cookies.set("clockUserModeCookie", clockUserMode, { expires: 1 });
    }

    Cookies.set("clockStateCookie", JSON.stringify(clockState), { expires: 1 });
  }, [clockState, clockConfig, clockUserMode]);

  useEffect(() => {
    if (clockUserMode === "Live") {
      const timer = setInterval(() => {
        setClockState((prev) => {
          const d = new Date();
          return {
            ...prev,
            hour: d.getHours(),
            minute: d.getMinutes(),
            second: d.getSeconds(),
          };
        });
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }
  }, [clockUserMode]);

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
