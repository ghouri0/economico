import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./searchResultCss.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

//drawer imports
import Box from "@mui/material/Box";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

//filter imports
import Slider from "@mui/material/Slider";
import AdjustIcon from "@mui/icons-material/Adjust";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import SortIcon from "@mui/icons-material/Sort";
import MuiInput from "@mui/material/Input";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Item1 = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const lightTheme = createTheme({ palette: { mode: "light" } });

export default function() {
  const location = useLocation();
  // const [home, setHome] = useState([JSON.parse(location.state.homeshopping)]);
  // const [daraz, setDaraz] = useState([JSON.parse(location.state.daraz)]);
  // const [mega, setMega] = useState([JSON.parse(location.state.mega)]);

  const [data, setData] = useState([]);
  const [value, setValue] = React.useState(0); //slider value control
  const [state, setState] = useState({ filter: false });
  const navigate = useNavigate();

  // var dataHome = [];
  // var dataDaraz = [];
  // var dataMega = [];

  //slider functions
  const Input = styled(MuiInput)`
    width: 42px;
  `;

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

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

  ///
  // const handleWeb = () =>
  //   unstable_batchedUpdates(() => {
  //     setHome(dataHome);
  //     setDaraz(dataDaraz);
  //     setMega(dataMega);
  //   });

  useEffect(async (e) => {
    console.log("Search Result in 15: ", location.state.products);
    const recieveResult = await axios.post("/send/result", {
      searchResult: location.state.products,
    });
    console.log(recieveResult);
    if (recieveResult.data.length > 0) {
      handleData(recieveResult.data);
    }

    // dataHome.push(JSON.parse(location.state.homeshopping));
    // dataDaraz.push(JSON.parse(location.state.daraz));
    // dataMega.push(JSON.parse(location.state.mega));
    // handleWeb(dataHome, dataDaraz, dataMega);

    // console.log(handleWeb);

    // sortProducts();
  }, []);

  console.log("Data local", data);
  console.log("Data local type:", typeof data);

  // console.log("Online home length........", home.length);
  // console.log("Online data home........", home);

  // console.log("Online daraz length........", daraz.length);
  // console.log("Online data daraz ........", daraz);

  // console.log("Online mega length........", mega.length);
  // console.log("Online data mega........", mega);

  //drawer functions

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem style={{ gap: "15x" }}>
          <ListItemIcon>
            <AdjustIcon />
          </ListItemIcon>
          <ListItemText primary={"Price Range"} />
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100000,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
            style={{ padding: "10px" }}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Button
            onClick={() => {
              // sortLowHigh();
            }}
          >
            <ListItemIcon>
              <SortIcon />
            </ListItemIcon>
            <ListItemText primary={"Sort Price Low to High"} />
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button
            onClick={() => {
              // sortHighLow();
            }}
          >
            <ListItemIcon>
              <SortIcon />
            </ListItemIcon>
            <ListItemText primary={"Sort Price High to Low"} />
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button
            onClick={() => {
              // sortAZ();
            }}
          >
            <ListItemIcon>
              <SortByAlphaIcon />
            </ListItemIcon>
            <ListItemText primary={"Sort A-Z"} />
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button
            onClick={() => {
              // sortZA();
            }}
          >
            <ListItemIcon>
              <SortByAlphaIcon />
            </ListItemIcon>
            <ListItemText primary={"Sort Z-A"} />
          </Button>
        </ListItem>
      </List>
    </Box>
  );
  //drawer functions end

  return (
    <div>
      <div class="small-container" style={{ width: "max-content", display: 'flex' }}>
        <div>
          <Grid container spacing={2}>
            {[lightTheme].map((theme, index) => (
              <Grid item xs={6} key={index}>
                <ThemeProvider theme={theme}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "background.default",
                      display: "grid",
                      // gridTemplateColumns: { md: "1fr 1fr" },
                      gap: 2,
                    }}
                  >
                    {[0, 1, 2, 3, 4,5].map((elevation) => (
                      <Item1 key={elevation} elevation={elevation}>
                        {`elevation=${elevation}`}
                      </Item1>
                    ))}
                  </Box>
                </ThemeProvider>
              </Grid>
            ))}
          </Grid>
        </div>
        <div>
          <h2 style={{ fontWeight: "bold", marginLeft: "50px" }}>
            Search Results from Inventory
          </h2>
          <div class="row">
            {data.length === 0 ? (
              <div
                style={{
                  height: "calc(80vh)",
                  display: "flex",
                  textAlign: "center",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ClipLoader
                  size={150}
                  cssOverride={{ borderWidth: 8 }}
                  color={"red"}
                  loading={true}
                />
              </div>
            ) : (
              <>
                {data.map((element) => (
                  <div class="col-4">
                    <a href="product_details.html">
                      <img className="proImg" src={element.image} alt="" />
                    </a>
                    <a href="product_details.html">
                      <h4 className="productName">{element.name}</h4>
                    </a>
                    <h6>{element.price}</h6>
                    {/* <Rating value={score.length > 0 ? score[i++] : ""} /> */}
                    <br />
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "orange",
                        width: "max-content",
                        padding: "5px",
                      }}
                      onClick={async () => {
                        navigate("/loading", { state: { load: true } });
                        navigate("/result/productHub", {
                          state: {
                            item: JSON.stringify(element),
                            prod: element,
                          },
                        });
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  function handleData(d) {
    setData(d);
  }

  // function sortProducts() {
  //   let sorted = [];
  //   for (let i = 0; i < home[0].ProductNames.length; i++) {
  //     let p = home[0].ProductPrices[i];
  //     let element = {
  //       name: home[0].ProductNames[i],
  //       image: home[0].ProductImages[i],
  //       price: parseFloat(home[0].ProductPrices[i].slice(3).replace(/,/g, "")), // "Rs 26,499"
  //       url: home[0].ProductUrl[i],
  //       store: "HomeShopping.pk",
  //       reviews: [],
  //     };
  //     sorted.push(element);
  //   }
  //   for (let i = 0; i < daraz[0].ProductNames.length; i++) {
  //     let p = daraz[0].ProductPrices[i];
  //     p = p.replace("Rs.", "").replace(",", ""); //  "Rs. 6,180"
  //     let element = {
  //       name: daraz[0].ProductNames[i],
  //       image: daraz[0].ProductImages[i],
  //       price: parseFloat(p),
  //       url: daraz[0].ProductUrl[i],
  //       store: "Daraz.pk",
  //       reviews: [],
  //     };
  //     sorted.push(element);
  //   }
  //   for (let i = 0; i < mega[0].ProductNames.length; i++) {
  //     let p = mega[0].ProductPrices[i];
  //     p = p
  //       .replace("PKR", "")
  //       .replace("-", "")
  //       .replace(",", ""); // "8,199 - PKR"
  //     let element = {
  //       name: mega[0].ProductNames[i],
  //       image: mega[0].ProductImages[i],
  //       price: parseFloat(p),
  //       url: mega[0].ProductUrl[i],
  //       store: "Mega.pk",
  //       reviews: [],
  //     };
  //     sorted.push(element);
  //   }
  //   console.log(sorted);
  //   setProducts(sorted);
  // }

  // async function sortLowHigh() {
  //   const postLH = await axios.post("/AddSort", { data: Products });
  //   const getLH = await axios.get("/getSortLH");
  //   setProducts(getLH.data);
  // }

  // async function sortHighLow() {
  //   const postLH = await axios.post("/AddSort", { data: Products });
  //   const getHL = await axios.get("/getSortHL");
  //   setProducts(getHL.data);
  // }

  // async function sortAZ() {
  //   const postLH = await axios.post("/AddSort", { data: Products });
  //   const getLH = await axios.get("/getSortAZ");
  //   setProducts(getLH.data);
  // }

  // async function sortZA() {
  //   const postLH = await axios.post("/AddSort", { data: Products });
  //   const getLH = await axios.get("/getSortZA");
  //   setProducts(getLH.data);
  // }
}
