import React, { useReducer } from "react";
import "./cart.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloseIcon from "@mui/icons-material/Close";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { removeFromCart } from "./features/productSlice";
import { decreaseCart } from "./features/productSlice";
import { increaseCart } from "./features/productSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import TextField from "@mui/material/TextField";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export default function Cart() {
  const cart = useSelector((item) => item.products);
  const [shopCart, setCart] = useState([]);
  var totalBill = 0;
  const [total, setTotal] = useState(0)
  const [discount, setDiscount] = useState(0);
  const [codeMess, setMess] = useState("");
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [discountPer, setPer] =useState(0)

  async function getDiscount() {
    await fetch(`/applyPromo/${code}/${cart.seller}`, { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          console.log((data.discount / 100) * totalBill);
          setPer(data.discount)
          setTotal(totalBill - parseInt((data.discount / 100) * totalBill));
          setDiscount(parseInt((data.discount / 100) * totalBill));
          setMess("Discount Added to Cart");
          toast('Discount Added to Cart')
        }
      });
  }

  function handleBill(price) {
    totalBill += price;
  }

  function handleRemove(product) {
    dispatch(removeFromCart(product));
    toast("Item Removed From Cart")
  }

  function handleOrder() {
    let productCart = [];
    shopCart.forEach((element) => {
      productCart.push({
        proName: element.product ? element.product : element.name,
        cartQuantity: element.cartQuantity,
        price: element.price.discount
          ? Math.floor(element.price.discount)
          : Math.floor(element.price),
        review: false
      });
    });
    console.log(productCart);
    localStorage.setItem("shopCart", JSON.stringify(productCart));
    localStorage.setItem("totalBill", totalBill);
    localStorage.setItem("quantity", cart.quantity);
    localStorage.setItem("sellerOrder", cart.seller);
  }

  function handleDecrease(product) {
    dispatch(decreaseCart(product));
    toast("Product Quantity Decreased")
  }
  function handleIncrease(product) {
    dispatch(increaseCart(product));
    toast("Product Quantity Increased")
  }

  function handleCheckout() {
    handleOrder();
    axios
      .post("/create-checkout-session", {
        shopCart,
        user: localStorage.getItem("Name"),
        discount: discountPer
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  }

  useEffect(() => {
    setCart(cart.items);
  }, cart.items);

  return cart.items.length ? (
    <div style={{ margin: "auto" }}>
      <div class="card1">
        <div class="row" style={{alignItems: "baseline"}}>
          <div class="col-md-9 cart" style={{paddingTop: 100}}>
            <div class="title1">
              <div class="row" style={{ bgColor: "InfoBackground" }}>
                <div class="col">
                  <h4>
                    <b>Shopping Cart</b>
                  </h4>
                </div>
                <div class="col align-self-center text-right text-muted">
                  {cart.quantity} items
                </div>
              </div>
            </div>
            <div class="row" style={{borderTop: '1px solid grey'}}>
              <div
                class="row main align-items-center"
                style={{ fontWeigth: "bold" }}
              >
                <div class="col-2"></div>
                <div class="col title1">
                  <div class="row text-muted">Product Title</div>
                </div>
                <div class="col title1">
                  <div class="row text-muted">Quantity</div>
                </div>
                <div class="col title1" style={{ display: "flex" }}>
                  Unit Price
                </div>
                <div class="col title1" style={{ display: "flex" }}>
                  Total Price
                </div>
              </div>
            </div>
            <div class="row" style={{borderTop: '1px solid grey', borderBottom: '1px solid grey'}}>
              {shopCart.map((item) => (
                <div class="row main align-items-center">
                  <div class="col-2">
                    <img class="img" src={item.image} />
                  </div>
                  <div class="col">
                    <div class="row text-muted">
                      {item.product ? item.product : item.name}
                    </div>
                  </div>
                  <div
                    class="col num"
                    style={{
                      display: "flex",
                      gap: "2px",
                      border: "1px solid ",
                    }}
                  >
                    <span
                      // class = 'close'
                      onClick={() => {
                        handleDecrease(item);
                      }}
                    >
                      <RemoveOutlinedIcon style={{color: 'black'}} />
                    </span>
                    {item.cartQuantity}
                    <span
                      //  class="close"
                      onClick={() => {
                        handleIncrease(item);
                      }}
                    >
                      <AddOutlinedIcon style={{color: 'black'}}/>
                    </span>
                  </div>
                  <div
                    class="col"
                    style={{ display: "flex", fontWeight: "bold" }}
                  >
                    Rs.{" "}
                    {item.price.discount
                      ? Math.floor(item.price.discount)
                      : Math.floor(item.price)}
                  </div>
                  <div
                    class="col"
                    style={{ display: "flex", fontWeight: "bold" }}
                  >
                    Rs.
                    {item.price.discount
                      ? Math.floor(item.price.discount) * item.cartQuantity
                      : Math.floor(item.price) * item.cartQuantity}
                    {handleBill(
                      item.price.discount
                        ? Math.floor(item.price.discount) * item.cartQuantity
                        : Math.floor(item.price) * item.cartQuantity
                    )}
                    <span
                      class="close"
                      onClick={() => {
                        handleRemove(item);
                      }}
                    >
                      <CloseIcon style={{color: 'black'}}/>
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div class="back-to-shop">
              <Link to="/">
                <KeyboardBackspaceIcon style={{color: 'white'}} />
                <span style={{color: 'white'}}>Back to shop</span>
              </Link>
            </div>
          </div>
          <div class="col-md-3 summary">
            <div>
              <h5>
                <b>Cart Summary</b>
              </h5>
            </div>
            <hr />
            <div class="row">
              <div class="col" style={{ paddingLeft: "0" }}>
                ITEMS {cart.quantity}
              </div>
              <div class="col text-right">
                <b>Rs.</b> {totalBill}
              </div>
            </div>
            <br />
            <br />
            <hr />
            <form>
              <p>
                <b>SHIPPING</b>
              </p>
              Shipping Charges: Rs. 50
              <br />
              <br />
              <hr />
              <p>
                <b>Enter Code</b>
              </p>
              <span
                style={{
                  display: "flex",
                  padding: "5px",
                  border: "0.5px solid silk",
                }}
              >
                <TextField
                  id="standard-basic"
                  label="Enter Code"
                  variant="standard"
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                ></TextField>
                <DoubleArrowIcon
                  style={{ margin: "auto" }}
                  onClick={() => {
                    if (code !== "") {
                      getDiscount();
                    } else {
                      alert("Enter Code to get Discounted");
                    }
                  }}
                />
              </span>
            </form>
            <div
              class="row"
              style={{
                marginTop: "5px",
                padding: "2vh 0",
              }}
            >
              <div class="col">Total Cart Amount</div>
              <div class="col text-right">{totalBill + 50 - discount}</div>
              <br />
              <hr />
              <br />
              <p style={{ color: "brown", display: "flex" }}>
                {codeMess}
                {codeMess === "" ? "" : <SentimentSatisfiedAltIcon />}
              </p>
            </div>
            <button
              class="btn1"
              onClick={() => {
                handleCheckout();
              }}
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            backgroundColor: '#1e68c9',
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
  ) : (
    <div>
      <img
        src="https://cdni.iconscout.com/illustration/free/thumb/empty-cart-4085814-3385483.png"
        alt="EmptyCart"
        style={{ width: "370px", height: "400px" }}
      />
      <h4 style={{ color: "grey", fontWeight: "bold" }}>
        Your Cart is Empty !!
      </h4>
      <h3 style={{ color: "grey" }}>Go and Explore Products</h3>
      <Link to="/">
        <a href="#" target="_blank" rel="noopener noreferrer" class="btn">
          <KeyboardBackspaceIcon /> Shop Now
        </a>
      </Link>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            backgroundColor: '#1e68c9',
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
