import React, { useEffect, useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import TextField from "@mui/material/TextField";
import "./sellerDashboard.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import MasksIcon from "@mui/icons-material/Masks";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
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

export default function EditSale() {
  const location = useLocation();
  const navigate = useNavigate();
  const [date, setDate] = React.useState(dayjs(""));
  const [end, setEnd] = React.useState(dayjs(""));
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState(location.state.title);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState(location.state.products);
  const price = [];
  const [value, setValue] = React.useState(location.state.discount);
  const [stErr, setSt] = useState("");
  const [enErr, seten] = useState("");
  const code = location.state
    ? location.state.code
    : Math.random()
        .toString(16)
        .substr(2, 5);
  console.log(location.state.price);

  async function handleSale() {
    const obj = {
      title: title,
      code: code,
      products: personName,
      price: price,
      discount: value,
      start: date,
      end: end,
      seller: localStorage.getItem("SellerEmail"),
    };
    console.log(obj);
    if (
      obj.discount > 0 &&
      obj.title &&
      obj.products &&
      obj.price &&
      obj.start &&
      obj.end
    ) {
    await fetch("/editSale", {
      method: "put",
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
          navigate("/seller/saleUpdateAlert");
        }
      });
    }
    else
    {
      toast('Please Fill all Fields')
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

  function handlePrice() {
    console.log("price", personName);
    products.forEach((element) => {
      console.log(element.name);
      personName.forEach((element1) => {
        console.log(element1);
        if (element.name === element1) {
          var dis = element.price * (value / 100);
          dis = element.price - dis;
          price.push({ actual: Number(element.price), discount: dis });
          console.log(price);
        }
      });
    });
  }

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  handlePrice();
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

  async function getProducts(sellerEmail) {
    console.log(sellerEmail);
    await fetch(`/getProducts/${sellerEmail}`, { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }

  getNames();
  function getNames() {
    console.log("names", products);
    products.forEach((element) => {
      names.push({ name: element.name });
    });
  }

  function discountPrice() {
    console.log(location.state.price);
    for (let index = 0; index < location.state.price.length; index++) {
      if (index > 3) {
        break;
      } else {
        price.push({
          actual: location.state.price[index].actual,
          discount: location.state.price[index].discount,
        });
      }
    }
    console.log(price);
  }

  useEffect(() => {
    getProducts(localStorage.getItem("SellerEmail"));
    discountPrice();
  }, []);

  return (
    <>
      <div className="title">Update Sales Details</div>
      <div style={{ display: "flex", margin: "10px" }}>
        <form action="" style={{ padding: "25px", gap: "10px" }}>
          <div className="delInp">
            <TitleOutlinedIcon className="icon" />
            <TextField
              id="fullwidth"
              label="Sale Title"
              placeholder="Enter Title"
              type="text"
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
              label="Sale Code"
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
            <InventoryIcon className="icon" />
            <FormControl sx={{ m: 1, width: 500 }}>
              <InputLabel id="demo-multiple-chip-label">Products</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name.name}
                    value={name.name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
      <div style={{ display: "flex", margin: "25px", gap: "15px" }}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead
            sx={{
              "& th": {
                backgroundColor: "black",
                color: "white",
              },
            }}
          >
            <TableRow>
              <TableCell
                style={{ textAlign: "center", justifyContent: "center" }}
              >
                Product Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {personName.map((row) => (
              <TableRow
                key={row}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  scope="row"
                  style={{ textAlign: "center", justifyContent: "center" }}
                >
                  {row}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead
            sx={{
              "& th": {
                backgroundColor: "black",
                color: "white",
              },
            }}
          >
            <TableRow>
              <TableCell
                style={{ textAlign: "center", justifyContent: "center" }}
              >
                Actual Price
              </TableCell>
              <TableCell
                style={{ textAlign: "center", justifyContent: "center" }}
              >
                Discounted Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {price.map((row) => (
              <TableRow
                key={row.actual}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  scope="row"
                  style={{ textAlign: "center", justifyContent: "center" }}
                >
                  {row.actual}
                </TableCell>
                <TableCell
                  scope="row"
                  style={{ textAlign: "center", justifyContent: "center" }}
                >
                  {row.discount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button
        variant="contained"
        onClick={handleSale}
        endIcon={<SendIcon style={{ color: "blue" }} />}
        style={{ width: "50%", margin: "10px", fontWeight: "bold" }}
      >
        Save Changes
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
    </>
  );
}
