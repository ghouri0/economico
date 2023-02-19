import React from "react";
import "./profile.css";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Profile() {
  const location = useLocation();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="container" style={{ flexDirection: "column" }}>
      <div
        className="titleContainer"
        style={{ width: "98%", backgroundColor: "white" }}
      >
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={8}
        >
          <Item>
            <img
              src={location.state.image}
              alt=""
              className="avatar1"
            />
          </Item>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1
              style={{
                alignItems: "center",
                fontSize: "35px",
                fontWeight: "bold",
                color: "grey",
                justifyContent: "center",
                margin: "auto",
              }}
            >
              {location.state.name} Profile | &nbsp;<br />
              {/* <p style={{fontSize: '20px', fontWeight: 'bold'}}>Where You Find All</p> */}
              Shopping Guide
              {location.state.store? location.state.store: ''}
            </h1>
          </div>
        </Stack>
      </div>
      <div
        className="titleContainer"
        style={{
          width: "98%",
          backgroundColor: "white",
          flexDirection: "column",
          margin: "auto",
        }}
      >
        <h2 style={{ fontWeight: "bold", fontSize: "25px" }}>
          Email: {location.state.email}
        </h2>
        <h2 style={{ fontWeight: "bold", fontSize: "25px" }}>
          Phone: {location.state.phone}
        </h2>
        {/* <h3 style={{ fontWeight: "bold", fontSize: "25px" }}>
          <Link to="">Reset Password</Link>
        </h3> */}
      </div>
    </div>
  );
}
