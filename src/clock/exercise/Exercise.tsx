import {
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
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    <Dialog open={open} fullScreen={true} TransitionComponent={Transition}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <DialogTitle>{`Exercise - ${getModeDisplay(mode)}`}</DialogTitle>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            disabled={!nextMode}
            onClick={() => {
              if (nextMode) setMode(nextMode);
            }}
          >
            <Typography variant="caption">
              {[ExercisePageMode[nextMode ?? mode]]}
            </Typography>
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => setIsExiting(true)}
          >
            <Typography variant="caption">Close</Typography>
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
    </Dialog>
  );
}

export default Exercise;
