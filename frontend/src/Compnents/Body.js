import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "./features/productSlice";
import "./body.css";
import ClipLoader from "react-spinners/ClipLoader";
import toast, { Toaster } from "react-hot-toast";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function Body({ login, setLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var i = -1;
  const [sales, setSales] = useState([]);
  const [selSale, setSelSale] = useState([]);
  const [promo, setPromo] = useState([]);
  const [recomendations, setRecommendation] = useState([]);
  const [topProduct, setTopProduct] = useState({});

  async function getSales() {
    await fetch(`/getSales`, { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        setSales(data);
      });
  }
  async function getPromo() {
    await fetch(`/getPromo`, { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        setPromo(data);
      });
  }

  async function fetchProducts(products) {
    let product_details = [];
    for (let index = 0; index < 7; index++) {
      const element = products[index];
      console.log(element);
      await fetch(`/getRecProduct/${element}`, { mode: "cors" })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          product_details.push(data);
        });
    }
    // for (let index = 0; index < product_details.length; index++) {
    //   const reviews = product_details[index].reviews;
    //   let query = { data: [] };
    //   if (reviews.length > 0) {
    //     query = await axios.post("/getSentimentScore", { data: reviews });
    //   }
    //   console.log(query.data);
    //   if (query.data) score.push(query.data.score);
    // }
    setRecommendation(product_details);
  }

  async function getSuggestions() {
    let rec_products = [];
    if (!localStorage.getItem("Name")) {
      console.log("not logged in");
      await fetch(`/getSuggestions`, {
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          // let array = data.slice(1, data.length - 3).split(",");
          // for (let index = 0; index < array.length; index++) {
          //   var element = array[index].slice(1, array[index].length - 1);
          //   if (index > 0) {
          //     element = array[index].slice(2, array[index].length - 1);
          //   }
          //   rec_products.push(element);
          // }
          // console.log(data);
          fetchProducts(data);
        });
    } else {
      console.log(localStorage.getItem("Name"));
      await fetch(`/getSuggestions/${localStorage.getItem("Name")}`, {
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          // let array = data.slice(1, data.length - 3).split(",");
          // for (let index = 0; index < array.length; index++) {
          //   var element = array[index].slice(1, array[index].length - 1);
          //   if (index > 0) {
          //     element = array[index].slice(2, array[index].length - 1);
          //   }
          //   rec_products.push(element);
          // }
          // console.log(rec_products);
          fetchProducts(data);
        });
    }
  }

  async function getTopProduct() {
    await fetch(`/getTopProduct`, {
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.topProduct);
        setTopProduct(data.topProduct);
      });
  }

  async function getSellerSales() {
    await fetch("/sellerSales", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSelSale(data);
      });
  }

  useEffect(async () => {
    getSales();
    getPromo();
    getSuggestions();
    getTopProduct();
    getSellerSales();
  }, recomendations);

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function navigateDetail(sale) {
    navigate("saleDetail", { state: sale });
  }

  return (
    <div style={{ margin: "0px" }}>
      <div class="row" style={{ textAlign: "center", display: "flex" }}>
        <div class="col-2" style={{ minWidth: "50%" }}>
          <h1 style={{ color: "#0303039e" }}>
            Find Products <br />
            Instantly!
          </h1>
          <p>
            Get the best deals on products across the web all in one place,
            easily <br />
            using our search engine.
          </p>
          <a href="#" target="_blank" rel="noopener noreferrer" class="btn">
            Explore Now &#8594;
          </a>
        </div>
      </div>
      <br />
      <Box sx={{ bgcolor: "background.paper", margin: "auto" }}>
        <AppBar position="static" style={{ margin: "auto", width: "100%" }}>
          <Tabs
            style={{ backgroundColor: "#F03200" }}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Available sales on Brands" {...a11yProps(0)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div style={{ margin: "15px" }}>
              <Container maxWidth="xl">
                <Box
                  sx={{
                    height: "-max-content",
                    padding: "25px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "35px",
                      justifyContent: "center",
                    }}
                  >
                    {sales.map((sale) => (
                      <Card
                        sx={{ maxWidth: 450 }}
                        style={{ width: "300px", height: "max-content" }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="5"
                            image="data:image/jpeg;base64,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"
                            alt="sales"
                            className="image"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              style={{ fontWeight: "bold" }}
                            >
                              {sale.title}
                            </Typography>
                            <Typography
                              variant="h4"
                              color="green"
                              style={{ fontWieght: "bold" }}
                            >
                              {sale.discount_per}%Off
                            </Typography>
                            <Typography
                              variant="h5"
                              color="grey"
                              style={{ fontStyle: "italic" }}
                            >
                              {localStorage.getItem("SellerStore")}
                            </Typography>
                            <Button
                              variant="contained"
                              style={{ backgroundColor: "orange" }}
                              onClick={() => {
                                navigateDetail(sale);
                              }}
                            >
                              Visit Sale
                            </Button>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    ))}
                  </div>
                </Box>
              </Container>
            </div>
          </TabPanel>
          {/* <TabPanel value={value} index={1} dir={theme.direction}>
            <div style={{ margin: "15px" }}>
              <Container maxWidth="xl">
                <Box
                  sx={{
                    height: "-max-content",
                    padding: "25px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "",
                      gap: "15px",
                      justifyContent: "center",
                    }}
                  >
                    {promo.map((sale) => (
                      <div>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar style={{ width: "75px" }}>
                            <Avatar
                              style={{ width: "50px", height: "50px" }}
                              alt="Remy Sharp"
                              src="https://source.unsplash.com/random/?discount/"
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={sale.title}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="p"
                                  variant="body2"
                                  color="text.primary"
                                  fontWeight="bold"
                                >
                                  Grab {sale.discount_per}% off on All Products
                                  <br />
                                </Typography>
                                Enter -- Code: {sale.code}
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </div>
                    ))}
                  </div>
                </Box>
              </Container>
            </div>
          </TabPanel> */}
        </SwipeableViews>
      </Box>

      <div class="offer" style={{ backgroundColor: "black" }}>
        <div class="small-container">
          <div class="row">
            <div class="col-2">
              <img
                src={topProduct.image}
                alt=""
                style={{
                  width: "450px",
                  height: "350px",
                  borderradius: "15px",
                }}
              />
            </div>
            <div class="col-2">
              <p style={{ color: "white" }}>Top Selling Product</p>
              <h3 style={{ color: "white", fontWeight: "bold" }}>
                {topProduct.name}
              </h3>
              <small style={{ color: "white" }}>
                {topProduct.name + " " + topProduct.description}
              </small>
              <br />
              <a
                href="#"
                class="btn"
                onClick={() => {
                  let product = {
                    product: topProduct.name,
                    image: topProduct.image,
                    price: {
                      actual: 0,
                      discount: parseInt(topProduct.price),
                    },
                    seller: topProduct.seller,
                  };
                  if (!login) {
                    navigate("/login");
                  } else {
                    dispatch(addToCart(product));
                    toast("Added to Cart");
                  }
                }}
              >
                Buy Now &#8594;
              </a>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            backgroundColor: "#2d9632",
            padding: "5px",
            color: "white",
            width: "250px",
            height: "40px",
            left: 15,
            top: 1000,
          },
        }}
      />
      <div class="small-container" style={{ width: "max-content" }}>
        <h2 style={{ fontWeight: "bold" }}>Trending Products</h2>
        <div class="row">
          {recomendations.length === 0 ? (
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
              {recomendations.map((element) => (
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
                          item: element,
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
      <br />
      <hr width="90%" style={{ margin: "auto" }} />
      <br />
      <div class="brands">
        <div class="small-container">
          <div class="row">
            <div class="col-5">
              <img
                src="data:image/png;base64,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"
                alt=""
              />
            </div>

            <div class="col-5">
              <img
                src="https://i.pinimg.com/236x/f1/e3/3b/f1e33be3d27950524506f46aa9d1b895.jpg"
                alt=""
              />
            </div>

            <div class="col-5">
              <img
                src="https://i.pinimg.com/564x/98/a3/2e/98a32e0ef25e6148b8a08954956eb0e4.jpg"
                alt=""
              />
            </div>

            <div class="col-5">
              <img
                src="data:image/png;base64,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"
                alt=""
              />
            </div>

            <div class="col-5">
              <img
                src="data:image/jpeg;base64,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"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <hr width="90%" style={{ margin: "auto" }} />
      <br />
      <div class="small-container" style={{ width: "max-content" }}>
        <h2 style={{ fontWeight: "bold" }}>Top Vendors</h2>
        <div class="row">
          {selSale.length === 0 ? (
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
              {selSale.map((element) => (
                <div class="col-4">
                  <a href="product_details.html">
                    <img className="proImg" src="data:image/jpeg;base64,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" alt="" />
                  </a>
                  <a href="product_details.html">
                    <h4 className="productName">{element._id}</h4>
                  </a>
                  <h6>{element.sales}</h6>
                  {/* <Rating value={score.length > 0 ? score[i++] : ""} /> */}
                  <br />
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "crimson",
                      width: "max-content",
                      padding: "5px",
                    }}
                    // onClick={async () => {
                    //   navigate("/loading", { state: { load: true } });
                    //   navigate("/result/productHub", {
                    //     state: {
                    //       item: JSON.stringify(element),
                    //       prod: element,
                    //     },
                    //   });
                    // }}
                  >
                    View Products
                  </Button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
