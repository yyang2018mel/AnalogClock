import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Confirmation from "../../generic/Confirmation";
import ExerciseSetup from "./ExerciseSetup";

enum ExercisePageMode {
  Setup,
  Exercise,
  Evaluate,
}

const getModeDisplay = (mode: ExercisePageMode): string =>
  ExercisePageMode[mode];

function Exercise({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}): React.JSX.Element {
  const pages = [
    ExercisePageMode.Setup,
    ExercisePageMode.Exercise,
    ExercisePageMode.Evaluate,
  ];

  const [mode, setMode] = useState<ExercisePageMode>(pages[0]);

  useEffect(() => {
    setMode(pages[0]);
  }, [open]);

  const [isExiting, setIsExiting] = useState<boolean>(false);

  const getNextMode = () => {
    const nextIndex = pages.indexOf(mode) + 1;
    return nextIndex === pages.length ? null : pages[nextIndex];
  };

  const nextMode = getNextMode();

  return (
    <Dialog open={open} fullScreen={true}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <DialogTitle>{`Exercise - ${getModeDisplay(mode)}`}</DialogTitle>
        <DialogActions>
          <Button size="small" onClick={() => setIsExiting(true)}>
            <Typography variant="caption">Reset</Typography>
          </Button>
        </DialogActions>
      </Box>
      <DialogContent>
        {isExiting ? (
          <Confirmation
            open={isExiting}
            question="Are you sure?"
            onCancel={() => setIsExiting(false)}
            onConfirm={() => {
              setIsExiting(false);
              onClose();
            }}
          />
        ) : mode === ExercisePageMode.Setup ? (
          <ExerciseSetup />
        ) : (
          [ExercisePageMode[mode]]
        )}
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!nextMode}
          onClick={() => {
            if (nextMode) setMode(nextMode);
          }}
        >
          <Typography variant="caption">
            {[ExercisePageMode[nextMode ?? mode]]}
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Exercise;
