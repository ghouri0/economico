import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

export default function UpdateAlert({name}) {
  return (
    <div style={{ margin: "15px" }}>
      <Alert severity="warning">
        <AlertTitle>Successfully Updated Details</AlertTitle>
        {name} details are Successfully Updated to Inventory —{" "}
        <strong>
          <SentimentSatisfiedAltIcon />
        </strong>
      </Alert>
    </div>
  );
}
