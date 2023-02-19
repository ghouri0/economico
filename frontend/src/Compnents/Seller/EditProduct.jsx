import React, { useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import TextField from "@mui/material/TextField";
import "./sellerDashboard.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import MasksIcon from "@mui/icons-material/Masks";
import CategoryIcon from "@mui/icons-material/Category";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import toast, { Toaster } from "react-hot-toast";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import DeveloperBoardOutlinedIcon from '@mui/icons-material/DeveloperBoardOutlined';

export default function EditProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState(location.state.name);
  const [des, setDes] = useState(location.state.des);
  const [price, setPrice] = useState(location.state.price);
  const [brand, setBrand] = useState(location.state.brand);
  const [category, setCategory] = useState(location.state.cat);
  const [stock, setStock] = useState("");
  const [ram, setRam] = useState("");
  const [file, setFile] = useState("");
  var i = false;

  async function editProduct() {
    var image = "";
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "e-commerce");
      console.log(formData);
      const imageData = await axios.post(
        "https://api.cloudinary.com/v1_1/shopping-fyp/image/upload",
        formData
      );
      image = imageData.data.url;
    } else {
      image = location.state.image;
    }
    console.log(image);
    const object = {
      name: title,
      ram: ram,
      price: price,
      category: category,
      stock: stock,
      brand: brand,
      seller: localStorage.getItem("SellerEmail"),
      image: image,
    };
    console.log(object);
    if (
      object.name &&
      object.ram &&
      object.price &&
      object.category &&
      object.stock &&
      object.brand &&
      object.image
    ) {
      await fetch("/updateProduct", {
        method: "put",
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
          if (data) {
            console.log(data);
            navigate("/seller/prodUpdateAlert");
          }
        });
    } else {
      toast("Please Fill All fields");
    }
  }

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleStock = (event) => {
    setStock(event.target.value);
  };

  return (
    <div style={{ display: "flex", margin: "10px" }}>
      <form action="" style={{ padding: "25px", gap: "10px" }}>
        <div className="delInp">
          <TitleOutlinedIcon className="icon" />
          <TextField
            id="fullwidth"
            label="Product Title"
            placeholder="Enter Title"
            value={title}
            style={{
              textAlign: "center",
              justifyContent: "center",
              width: "500px",
            }}
          />
        </div>
        <div className="delInp">
          <DeveloperBoardOutlinedIcon className="icon" />
          <TextField
            id="outlined-name fullwidth"
            label="RAM"
            placeholder="Enter RAM"
            value={ram}
            type="text"
            onChange={(e) => {
              setRam(e.target.value);
            }}
            style={{
              textAlign: "center",
              justifyContent: "center",
              width: "500px",
            }}
          />
        </div>
        <div className="delInp">
          <LocalAtmOutlinedIcon className="icon" />
          <TextField
            id="outlined-name fullwidth"
            label="Price"
            placeholder="Enter Product Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            style={{
              textAlign: "center",
              justifyContent: "center",
              width: "500px",
            }}
          />
        </div>
        <div className="delInp">
          <CategoryIcon className="icon" />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Product Category"
            placeholder="Select Category"
            onChange={handleChange}
            style={{
              textAlign: "center",
              justifyContent: "center",
              width: "500px",
            }}
          >
            <MenuItem value={"mobile"}>Mobile Phone</MenuItem>
            <MenuItem value={"laptop"}>Laptops</MenuItem>
            <MenuItem value={"computer"}>Computers</MenuItem>
          </Select>
        </div>
        <div className="delInp">
          <Inventory2OutlinedIcon className="icon" />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={stock}
            label="Product Availbility"
            placeholder="Select Avaibility"
            onChange={handleStock}
            style={{
              textAlign: "center",
              justifyContent: "center",
              width: "500px",
            }}
          >
            <MenuItem value={"instock"}>In Stock</MenuItem>
            <MenuItem value={"outofstock"}>Out Of Stock</MenuItem>
          </Select>
        </div>
        <div className="delInp">
          <MasksIcon className="icon" />
          <TextField
            id="outlined-name fullwidth"
            label="Brand"
            placeholder="Enter Product Brand"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
            }}
            style={{
              textAlign: "center",
              justifyContent: "center",
              width: "500px",
            }}
          />
        </div>
      </form>
      <div className="image1">
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
              i = true;
            }}
          />
          <img
            style={{
              width: "250px",
              height: "250px",
              borderRadius: "30%",
              border: "1px solid lightgray",
              objectFit: "scale-down",
              alignItems: "center",
              margin: "auto",
              textAlign: "center",
            }}
            src={file ? URL.createObjectURL(file) : location.state.image}
            alt=""
          />
        </IconButton>
        <Button
          variant="contained"
          endIcon={<SendIcon style={{ color: "yellow" }} />}
          style={{ backgroundColor: "orange" }}
          onClick={() => {
            editProduct();
          }}
        >
          Save changes
        </Button>
      </div>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            backgroundColor: "crimson",
            padding: "5px",
            color: "white",
            width: "250px",
            height: "40px",
            left: 15,
            top: 1000,
          },
        }}
      />
    </div>
  );
}
