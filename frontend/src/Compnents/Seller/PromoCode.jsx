import React, { useEffect, useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import TextField from "@mui/material/TextField";
import "./sellerDashboard.css";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FlagIcon from "@mui/icons-material/Flag";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import DiscountIcon from "@mui/icons-material/Discount";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const Input = styled(MuiInput)`
  width: 42px;
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AddPromo() {
  const navigate = useNavigate();
  const [date, setDate] = React.useState(dayjs(""));
  const [end, setEnd] = React.useState(dayjs(""));
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const price = [];
  const [value, setValue] = React.useState(0);
  const [stErr, setSt] = useState("");
  const [enErr, seten] = useState("");
  const code = Math.random()
    .toString(16)
    .substr(2, 5);

  async function handlePromo() {
    const obj = {
      title: title,
      code: code,
      discount: value,
      start: date,
      end: end,
      seller: localStorage.getItem("SellerEmail"),
    };
    console.log(obj);
    if (obj.discount > 0 && obj.title && obj.start && obj.end) {
      await fetch("/addPromo", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          obj,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data) {
            console.log(data);
            navigate("/seller/promoAlert");
          }
        });
    } else {
      toast("Please Fill All Fields");
    }
  }

  const handleDate = (newValue) => {
    console.log(newValue.$d);
    var today = new Date();
    if (newValue < today) {
      setSt("Date is expired Enter valid");
    } else {
      setSt("");
      setDate(newValue);
    }
  };
  const handleEnd = (newValue) => {
    console.log(newValue);
    if (newValue < date) {
      seten("Date is less than Start Date..");
    } else {
      seten("");
      setEnd(newValue);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  //   handlePrice();
  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <div style={{ margin: "25px", border: "1px solid grey" }}>
      <div className="title">Add Promo Code</div>
      <div style={{ display: "flex", margin: "10px" }}>
        <form action="" style={{ padding: "25px", gap: "10px" }}>
          <div className="delInp">
            <TitleOutlinedIcon className="icon" />
            <TextField
              id="fullwidth"
              label="Promo Title"
              placeholder="Enter Title"
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              style={{
                textAlign: "center",
                justifyContent: "center",
                width: "500px",
              }}
            />
          </div>
          <div className="delInp">
            <DescriptionIcon className="icon" />
            <TextField
              id="outlined-name fullwidth"
              label="Promo Code"
              placeholder="Enter Code"
              value={code}
              type="text"
              style={{
                textAlign: "center",
                justifyContent: "center",
                width: "500px",
              }}
            />
          </div>
          <div className="delInp">
            <Box sx={{ width: 550, gap: "10px" }}>
              <Typography id="input-slider" gutterBottom>
                Discount %
              </Typography>
              <Grid container spacing={5} alignItems="center">
                <Grid item>
                  <DiscountIcon className="icon" />
                </Grid>
                <Grid item xs>
                  <Slider
                    value={typeof value === "number" ? value : 0}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                  />
                </Grid>
                <Grid item>
                  <Input
                    value={value}
                    size="small"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                      step: 10,
                      min: 0,
                      max: 100,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </div>
        </form>
        <div
          className="delInp"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="delInp">
            <FlagIcon className="icon" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Start Date"
                inputFormat="MM/DD/YYYY"
                value={date}
                onChange={handleDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div style={{ color: "red", fontSize: "12px" }}>{stErr}</div>
          <div className="delInp">
            <CloseIcon className="icon" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="End Date"
                inputFormat="MM/DD/YYYY"
                value={end}
                onChange={handleEnd}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div style={{ color: "red", fontSize: "12px" }}>{enErr}</div>
        </div>
      </div>
      <Button
        variant="contained"
        onClick={handlePromo}
        endIcon={<SendIcon style={{ color: "white" }} />}
        style={{
          width: "max-content",
          height: "35px",
          margin: "10px",
          fontWeight: "bold",
          backgroundColor: "crimson",
        }}
      >
        Add Promo Code
      </Button>
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
