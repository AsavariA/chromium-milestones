import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import { handleEditDoc } from "../services/fire_functions";

export default function Edit({ job }) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(job.status);
  const [message, setMessage] = React.useState(job.message);
  const [result, setResult] = React.useState(job.result);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStatus(job.status);
    setMessage(job.message);
    setResult(job.result);
  };

  return (
    <div>
      <EditIcon onClick={handleClickOpen}></EditIcon>
      <Dialog open={open} keepMounted onClose={handleClose}>
        <DialogTitle>{"Edit Your Job"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Edit your job by filling these existing fields, this will help you
            keep track of your work and increase productivity!
          </DialogContentText>
          <br />
          <Grid container direction={"column"} spacing={2}>
            <Grid item sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                label="Set Message"
              ></TextField>
            </Grid>
            <Grid item sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                value={result}
                onChange={(e) => setResult(e.target.value)}
                label="Set Result"
              ></TextField>
            </Grid>
            <Grid item sm={12}>
              <Select
                margin="dense"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
              >
                <MenuItem value={"Scheduled"}>Scheduled</MenuItem>
                <MenuItem value={"Running"}>Running</MenuItem>
                <MenuItem value={"Finished"}>Finished</MenuItem>
                <MenuItem value={"Failed"}>Failed</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleEditDoc(job.id, message, result, status, handleClose)}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
