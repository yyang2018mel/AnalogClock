import React, { useCallback, useRef, useState } from "react";
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
  Paper,
  Slider,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ScienceIcon from "@mui/icons-material/Science";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PictureSelectionGrid from "../generic/PictureSelector";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type ClockConfig = {
  clockSize: number;
  hourHandColor: [string, string];
  minuteHandColor: [string, string];
  backgroundImgIndex: number | null;
};

const DefaultClockConfig: ClockConfig = {
  clockSize: 250,
  hourHandColor: ["orange", "yellow"],
  minuteHandColor: ["red", "pink"],
  backgroundImgIndex: null,
};

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
  // const [isApplied, setIsApplied] = useState<boolean>(false);
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
            maxHeight: "100%",
            marginLeft: "auto",
          }}
        >
          {children}
        </Paper>
      )}
    >
      <DialogTitle>Configuration</DialogTitle>
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
      </DialogContent>

      <DialogActions>
        <Button size="small" onClick={onDialogApply}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const MClockConfigurationDialog = React.memo(ClockConfigurationDialog);

function ClockCombo(): React.JSX.Element {
  const [clockState, setClockState] = useState<ClockState>({
    hour: 0,
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

  return (
    <>
      <ClockContext.Provider value={{ clockState, setClockState }}>
        <AnalogClock
          clockSize={clockConfig.clockSize}
          backgroundImageUrl={
            clockConfig.backgroundImgIndex !== null
              ? ClockImageUrls[clockConfig.backgroundImgIndex]
              : ""
          }
        />
        <div style={{ height: 10 }} />
        <DigitalClock />
        <div style={{ height: 10 }} />
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
    </>
  );
}

type ClockUserMode = "Setup" | "Live" | "Static";

export default ClockCombo;
