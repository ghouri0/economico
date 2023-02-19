import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "./features/productSlice";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import toast, { Toaster } from 'react-hot-toast';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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

export default function Saledetail({ login, setLogin }) {
  const location = useLocation();
  const [pro, setPro] = useState([]);
  const dispatch = useDispatch();
  const products = [];
  const navigate = useNavigate();

  function handleAddToCart(product) {
    if (!login) {
      navigate("/login");
    } else {
      dispatch(addToCart(product));
      toast('Added to Cart')
    }
  }

  async function mapProducts() {
    var image = "";
    for (let index = 0; index < location.state.products.length; index++) {
      const price = location.state.price[index];
      console.log(price);
      image = await getImage(location.state.products[index]);
      console.log(image);
      if (image === "no") {
        products.push({
          product: location.state.products[index],
          price: price,
          image: "",
        });
      } else {
        products.push({
          product: location.state.products[index],
          price: price,
          image: image,
          seller: location.state.seller
        });
      }
      console.log(products);
    }
    setPro(products);
  }

  useEffect(() => {
    mapProducts();
  }, []);

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  async function getImage(product) {
    try {
      const response = await axios.get(`/getImage/${product}`);
      // const res = await fetch(`/getImage/${product}`, { mode: "cors" });
      // const result = await res.json();
      console.log(response.data);
      if (response.data.error) {
        return "no";
      } else {
        return response.data.image;
      }
      // return result;
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div>
      <Box sx={{ bgcolor: "background.paper", width: 1300, margin: "auto" }}>
        <AppBar position="static">
          <Tabs
            style={{ backgroundColor: "#F03200" }}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab
              label={
                location.state.title +
                "  " +
                location.state.discount_per +
                "  %  OFF"
              }
              {...a11yProps(0)}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {pro.map((product) => (
                  <div class="col-4">
                  <a href="product_details.html">
                    <img className="proImg" src={product.image} alt="" />
                  </a>
                  <a href="product_details.html">
                    <h4 className="productName">{product.product}</h4>
                  </a>
                  <h4>{<strike> {product.price.actual}</strike>}</h4>
                  <br />
                  <h3>{Math.floor(product.price.discount)}</h3>
                  {/* <Rating value={score.length > 0 ? score[i++] : ""} /> */}
                  <br/>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "orange", width: 'max-content', padding: '5px' }}
                    onClick={() => {
                      handleAddToCart(product);
                    }}
                  >
                    Buy Now
                  </Button>
                </div>
                ))}
              </Grid>
            </Box>
          </TabPanel>
        </SwipeableViews>
      </Box>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            backgroundColor: '#2d9632',
            padding: '5px',
            color: 'white',
            width: '250px',
            height: '40px',
            left: 15,
            top: 1000
          },
        }}
      />
    </div>
  );
}
