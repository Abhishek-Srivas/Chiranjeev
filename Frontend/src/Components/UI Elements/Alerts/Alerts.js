import React, { useState } from "react";
import "./Alerts.css";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const Alerts = ({ alertdata }) => {
  
   const vertical = "top";
   const horizontal = "center" 

  const [open, setOpen] = useState(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="Alert">
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
        <Alert
        
          onClose={handleClose}
          severity={alertdata.type ? "success" : "error"}
         
        >
          {alertdata.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Alerts;
