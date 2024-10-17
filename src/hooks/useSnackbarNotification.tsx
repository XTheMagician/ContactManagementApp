// useSnackbarNotification.tsx
import { useState } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";
import React from "react";

function useSnackbarNotification() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  const showNotification = (msg: string, type: AlertColor = "success"): void => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const SnackbarNotification: React.FC = () => (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );

  return { SnackbarNotification, showNotification };
}

export default useSnackbarNotification;
