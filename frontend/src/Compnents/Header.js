import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./header.css";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ClipLoader from "react-spinners/ClipLoader";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";

var userLoggedin = false;
var sellLogin = false;

if (localStorage.getItem("Name") !== "") {
  userLoggedin = true;
}

if (localStorage.getItem("SellerName") !== "") {
  sellLogin = true;
}

function Header() {
  const cart = useSelector((item) => item.products);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [notificationIcon, setnotificationIcon] = useState(0);
  const [wishIcon, setwishIcon] = useState(0);
  const open = Boolean(anchorEl);
  const [notIcon, setNotIcon] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const searchItem = {
    name: null,
  };

  const [input, setInput] = useState(searchItem);
  const [Name, setName] = useState("");
  const navigate = useNavigate();

  const searchSubmit = async (e) => {
    // se.preventDefault();
    const result = await axios.post("/search", searchItem);
    console.log("header data " + result.data);
    console.log("lenght: " + result.data.length);
    if (result.data.length > 0) {
      const sendresult = await axios.post("/result", result.data);
      console.log(sendresult);
    }
    console.log(searchItem);
    navigate("/loading", { state: { load: true } }); //loading animation
    // let query = axios.post("/homeshopping", searchItem);
    // let query1 = axios.post("/daraz", searchItem);
    // let query2 = axios.post("/mega", searchItem);
    // while ((await query) && (await query1) && (await query2)) {
    //   //navigate("/loading", { state: { load: true } }); //loading animation
    //   if (query !== null && query1 !== null && query2 !== null) {
    //     break;
    //   }
    // }
    // await query.then((data) => {
    //   query = data.data;
    // });
    // await query1.then((data) => {
    //   query1 = data.data;
    // });
    // await query2.then((data) => {
    //   query2 = data.data;
    // });
    navigate("/result", {
      state: {
        products: result.data, //offline products
      },
    });
  };

  async function handleNotifications() {
    const data1 = await axios.post("/getWishList", {
      email: localStorage.Name,
    });
    let changes = [];
    if (data1.data.length > 0) {
      console.log(data1.data);
      for (let i = 0; i < data1.data.length; i++) {
        if (!data1.data[i].hub) {
          let element = {
            pic: [],
            title: [],
            price: [],
            availability: [],
          };
          let data2 = await axios.post("/getDarazNotifications", {
            WishProduct: data1.data[i],
          });
          console.log(data2.data);
          //setNotifications(data2.data);
          if (data2.data.availability.length > 0) {
            //if not available
            // element.availability.push(data2.data.availability[0])
            element.availability.push("Out of Stock");
            element.pic.push(data1.data[i].data.prod.image);
            element.title.push(data1.data[i].data.prod.name);
            element.price.push(data1.data[i].data.prod.price);
            changes.push(element);
            //break;
            //continue;
          } else if (data1.data[i].data.prod.store === "Daraz.pk") {
            let p = parseFloat(
              data2.data.price.replace("Rs.", "").replace(",", "")
            );
            if (p !== data1.data[i].data.prod.price) {
              element.availability.push("Price Changed");
              element.pic.push(data1.data[i].data.prod.image);
              element.title.push(data1.data[i].data.prod.name);
              element.price.push(p);
              changes.push(element);
              //break;
            }
          } else if (data1.data[i].data.prod.store === "HomeShopping.pk") {
            let p = parseFloat(data2.data.price[0].slice(3).replace(/,/g, ""));
            if (p !== data1.data[i].data.prod.price) {
              element.availability.push("Price Changed");
              element.pic.push(data1.data[i].data.prod.image);
              element.title.push(data1.data[i].data.prod.name);
              element.price.push(p);
              changes.push(element);
              //break;
            }
          } else if (data1.data[i].data.prod.store === "Mega.pk") {
            let p = parseFloat(
              data2.data.price[0]
                .replace("PKR", "")
                .replace("-", "")
                .replace(",", "")
                .replace(" ", "")
            );
            if (p !== data1.data[i].data.prod.price) {
              element.availability.push("Price Changed");
              element.pic.push(data1.data[i].data.prod.image);
              element.title.push(data1.data[i].data.prod.name);
              element.price.push(p);
              changes.push(element);
              //break;
            }
          }
        } else {
          let element = {
            pic: [],
            title: [],
            price: [],
            availability: [],
          };
          let data2 = await axios.post("/getLocalNotifications", {
            WishProduct: data1.data[i],
          });
          console.log(data2);
          if (!data2.data.message) {
            element.availability.push("Price Changed");
            element.pic.push(data1.data[i].data.prod.image);
            element.title.push(data1.data[i].data.prod.name);
            element.price.push(data1.data[i].data.prod.price);
            changes.push(element);
          }
          if (data2.data.message) {
            element.availability.push("No changes");
            element.pic.push(data1.data[i].data.prod.image);
            element.title.push(data1.data[i].data.prod.name);
            element.price.push(data1.data[i].data.prod.price);
            changes.push(element);
          }
        }
      }
    }

    console.log(changes);
    setNotifications(changes);
  }

  const handleLogout = async (e) => {
    setName("");
    localStorage.setItem("Name", "");
    const checkLoggedOut = await axios.get("/logout");
    console.log("Logging out of session:...", checkLoggedOut);
    navigate("/");
  };

  function handleAvatar() {
    if (localStorage.getItem("Name") && userLoggedin) {
      return localStorage
        .getItem("Name")
        .charAt(0)
        .toUpperCase();
    } else if (localStorage.getItem("SellerName") && sellLogin) {
      return localStorage
        .getItem("SellerName")
        .charAt(0)
        .toUpperCase();
    } else {
      return <PersonIcon />;
    }
  }

  useEffect(async (e) => {
    const loggedInUser = localStorage.getItem("Name"); //if local login user
    const checkLogged = await axios.get("/GetUserSession"); // if google/facebook user
    console.log("checking user session:...", checkLogged);
    console.log(loggedInUser);
    if (loggedInUser) {
      setName("Welcome " + loggedInUser);
      const query = await axios.post("/getWishListLenght", {
        email: loggedInUser,
      });
      setwishIcon(query.data.num);

      // const data = await axios.post("/getWishList", { email: localStorage.Name })
      // console.log(data.data);
    } else if (checkLogged.data.user) {
      setName("Welcome " + checkLogged.data.user.email);
      localStorage.setItem("Name", checkLogged.data.user.email);
      navigate("/");
    } else {
      setName("");
      localStorage.setItem("Name", "");
      navigate("/");
      localStorage.setItem("SellerName", "");
      localStorage.setItem("SellerEmail", "");
      localStorage.setItem("SellerStore", "");
    }
  }, []);

  return (
    <div className="header">
      <nav className="navbar" style={{ backgroundColor: "white" }}>
        <div style={{ marginLeft: "10px" }}>
          <Link
            to="/"
            className="navbar-logo"
            style={{ textDecoration: "none" }}
          >
            <i className="fas fa-meteor nav-logo"></i>
            <h2 style={{ fontFamily: "sans-serif" }}>Economico</h2>
          </Link>
        </div>
        <div className="navbar-search" style={{ width: "18%" }}>
          <i
            className="fas fa-search search-icon"
            onClick={() => searchSubmit()}
          ></i>
          <input
            type="text"
            className="i-text"
            placeholder="Search for products, brands and more"
            onChange={(e) => (searchItem.name = e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                searchSubmit();
              }
            }}
          />
        </div>

        <div style={{ marginLeft: "200px" }}>
          <div class="right-links float-right mr-3">
            <div className="items">
              <div className="item">
                <Link to="/wishlist">
                  <FavoriteBorderSharpIcon className="icon1" />
                  <div className="counter">{wishIcon}</div>
                </Link>
              </div>
              <a
                onClick={() => {
                  handleNotifications();
                }}
              >
                <div onClick={() => setNotIcon(!notIcon)} className="item">
                  <NotificationsOutlinedIcon
                    className="icon1"
                    style={{ color: "black", fontSize: 27 }}
                  />
                  <div className="counter">+</div>
                  {notIcon && (
                    <div
                      style={{
                        zIndex: 200,
                        position: "absolute",
                        bottom: -310,
                        backgroundColor: "black",
                        left: -30,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: 1,
                      }}
                    >
                      {notifications.length === 0 ? (
                        <List
                          sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper",
                            overflow: "auto",
                            maxHeight: 300,
                          }}
                        >
                          <ListItem alignItems="flex-start">
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
                                size={50}
                                cssOverride={{ borderWidth: 2 }}
                                color={"red"}
                                loading={true}
                              />
                            </div>
                          </ListItem>
                        </List>
                      ) : (
                        <>
                          <List
                            sx={{
                              width: "100%",
                              maxWidth: 360,
                              bgcolor: "background.paper",
                              overflow: "auto",
                              maxHeight: 300,
                            }}
                          >
                            {notifications.map((notify, index) => {
                              return (
                                <div key={index}>
                                  <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                      <Avatar
                                        alt="product"
                                        src={notify.pic[0]}
                                      />
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary={notify.availability[0]} //status
                                      secondary={
                                        <React.Fragment>
                                          <Typography
                                            sx={{ display: "inline" }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                          >
                                            {notify.title[0]}
                                          </Typography>
                                        </React.Fragment>
                                      }
                                    />
                                  </ListItem>
                                  <Divider variant="inset" component="li" />
                                </div>
                              );
                            })}
                          </List>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </a>

              <div className="item">
                <Link to="/shoppingCart">
                  <ShoppingCartSharpIcon className="icon1" />
                  <div className="counter">{cart.quantity}</div>
                </Link>
              </div>
              <div className="item">
                <IconButton
                  onClick={(e) => handleClick(e)}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {/* {sellLogin &&
                    localStorage.getItem("SellerEmail") !== null ? (
                      localStorage.getItem("SellerEmail").charAt(0)
                    ) : (
                      ""
                    )}
                    {userLoggedin && localStorage.getItem("Name") !== null ? (
                      localStorage.getItem("Name").charAt(0)
                    ) : (
                      ""
                    )} */}
                    {handleAvatar()}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={() => handleClose()}
                  onClick={() => handleClose()}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  {!userLoggedin && (
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <MenuItem>
                        <Avatar /> Sign-In
                      </MenuItem>
                    </Link>
                  )}
                  {userLoggedin && (
                    <Link to="/custPanel" style={{ textDecoration: "none" }}>
                      <MenuItem>
                        <Avatar>
                          {/* {localStorage
                            .getItem("Name")
                            .charAt(0)
                            .toUpperCase()} */}
                        </Avatar>
                        {localStorage.getItem("Name")}
                      </MenuItem>
                    </Link>
                  )}
                  {!sellLogin && (
                    <Link to="/sellerLogin" style={{ textDecoration: "none" }}>
                      <MenuItem>
                        <Avatar>
                          {" "}
                          <StorefrontOutlinedIcon />
                        </Avatar>
                        Login as Seller
                      </MenuItem>
                    </Link>
                  )}
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  {(userLoggedin || sellLogin) && (
                    <a
                      href=""
                      onClick={() => handleLogout()}
                      style={{ textDecoration: "none" }}
                    >
                      <MenuItem>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </a>
                  )}
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
