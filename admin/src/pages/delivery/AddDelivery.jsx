import React from "react";
import "./delivery.css";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { IconButton, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function AddDelivery() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [password, setPass] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "e-commerce");
    console.log(formData);
    const imageData = await axios.post(
      "https://api.cloudinary.com/v1_1/shopping-fyp/image/upload",
      formData
    );
    console.log("Image Data", imageData.data.url);
    // console.log(name, email, address, phone, city, password, file);
    const object = {
      name: name,
      email: email,
      address: address,
      phone: phone,
      city: city,
      password: password,
      image: imageData.data.url
    };
    console.log(object);
    await fetch("/registerDel", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        object,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          navigate("/delivery");
        }
      });
  }
  // console.log(file);
  return (
    <div className="formContainer">
      <div className="image">
        <h1 style={{ width: "40%", display: "flex", fontWeight: "bold" }}>
          <HowToRegOutlinedIcon
            style={{ padding: "10px", color: "crimson", fontSize: "75px" }}
          />
          Register Delivery Boy
        </h1>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          style={{ margin: "25px" }}
        >
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : "https://t4.ftcdn.net/jpg/02/83/72/41/360_F_283724163_kIWm6DfeFN0zhm8Pc0xelROcxxbAiEFI.jpg"
            }
            alt=""
          />
        </IconButton>
      </div>
      <div className="inputs">
        <form action="" style={{ padding: "25px" }}>
          <div className="delInp">
            <AccountBoxOutlinedIcon className="icon2" />
            <TextField
              id="fullwidth"
              label="Full Name"
              placeholder="Enter Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              style={{
                textAlign: "center",
                justifyContent: "center",
                width: "500px",
              }}
            />
          </div>
          <div className="delInp">
            <MailOutlineOutlinedIcon className="icon2" />
            <TextField
              id="outlined-name fullwidth"
              label="Email"
              placeholder="Enter Email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              style={{
                textAlign: "center",
                justifyContent: "center",
                width: "500px",
              }}
            />
          </div>
          <div className="delInp">
            <HomeOutlinedIcon className="icon2" />
            <TextField
              id="outlined-name fullwidth"
              label="Address"
              placeholder="Enter Address"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              style={{
                textAlign: "center",
                justifyContent: "center",
                width: "500px",
              }}
            />
          </div>
          <div className="delInp">
            <LocalPhoneOutlinedIcon className="icon2" />
            <TextField
              id="outlined-name fullwidth"
              label="Phone"
              placeholder="Enter Phone"
              type="number"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              style={{
                textAlign: "center",
                justifyContent: "center",
                width: "500px",
              }}
            />
          </div>
          <div className="delInp">
            <LocationCityOutlinedIcon className="icon2" />
            <TextField
              id="outlined-name fullwidth"
              label="City"
              placeholder="Enter City"
              onChange={(e) => {
                setCity(e.target.value);
              }}
              style={{
                textAlign: "center",
                justifyContent: "center",
                width: "500px",
              }}
            />
          </div>
          <div className="delInp">
            <VpnKeyOutlinedIcon className="icon2" />
            <TextField
              id="outlined-name fullwidth"
              label="Password"
              placeholder=""
              type="password"
              onChange={(e) => {
                setPass(e.target.value);
              }}
              style={{
                textAlign: "center",
                justifyContent: "center",
                width: "500px",
              }}
            />
          </div>
          <Button
            onClick={handleRegister}
            variant="contained"
            color="error"
            style={{ marginLeft: "50px", width: "50%", height: "50px" }}
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
