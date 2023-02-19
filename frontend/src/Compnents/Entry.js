import "./entry.css";
import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function CreateEntry({ prod }) {
  console.log("prod----", prod);
  return (
    <Grid item style={{ marginBottom: 50, marginTop: 50}}>
      <Paper className="product" elevation={3}>
        <div className="productDiv">
          <img
            src={prod.image}
            alt="product"
            className="image"
            style={{ height: 250, width: 200, marginTop: 10 }}
            />
        </div>  
        <h4
          style={{
            fontSize: "large",
            overflow: "hidden",
            textOverflow: "ellipsis",
            margin: 10,
            height: "40px",
          }}>
          {" "}
          {prod.name}{" "}
        </h4>
        {/* <p>{prod.description}</p>
          <p>{prod.category}</p> */}
        <h3 style={{ paddingBottom: 10 }}>
          Rs: <b>{prod.price}</b>
        </h3>
      </Paper>
    </Grid>
  );
}

export { CreateEntry };
