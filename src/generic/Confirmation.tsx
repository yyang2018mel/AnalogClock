import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function Confirmation({
  open,
  question,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  question: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog open={open}>
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText>{question}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm}>Yes</Button>
        <Button onClick={onCancel} autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Confirmation;
