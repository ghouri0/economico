import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

export default function ShowAlert({name}) {
  return (
    <div style={{ margin: "10px", backgroundColor: "lightgreen" }}>
      <Alert severity="success">
        <AlertTitle>Successfully Uploaded</AlertTitle>
        {name} is Successfully Added to Inventory —{" "}
        <strong>
          <SentimentSatisfiedAltIcon />
        </strong>
      </Alert>
    </div>
  );
}
