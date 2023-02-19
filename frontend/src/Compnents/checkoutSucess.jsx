import React, { useEffect, useState } from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import "./sucess.css";

export default function CheckoutSucess() {
  const [order, setOrder] = useState([])

  async function saveOrder(orderDetails) {
    console.log(orderDetails);
    setOrder(orderDetails.order_id)
    await fetch("/saveOrder", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderDetails,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data);
        }
      });
  }

  useEffect(() => {
    let orderDetails = [];
    let date = new Date();
    orderDetails.push({
      order_id: "SG" + Math.floor(Math.random() * (10000 - 1 + 1) + 1),
      products: JSON.parse(localStorage.getItem("shopCart")),
      customer: localStorage.getItem("Name"),
      Total: parseInt(localStorage.getItem("totalBill")),
      date: date,
      quantity: parseInt(localStorage.getItem("quantity")),
      pay_meth: "online",
      status: "completed",
      seller: localStorage.getItem("sellerOrder")
    });
    saveOrder(orderDetails[0]);
  },[]);
  return (
    <div class="container">
      <div class="printer-top"></div>

      <div class="paper-container">
        <div class="printer-bottom"></div>

        <div class="paper">
          <div class="main-contents">
            <div class="success-icon">&#10004;</div>
            <div class="success-title">Checkout Successfully Completed</div>
            <div class="success-description" style={{color: 'green'}}>
              Always Welcome.. We are here to help you... <SentimentSatisfiedAltIcon style={{color: 'green'}}/>
            </div>
            <div class="order-details">
              <div class="order-number-label">Order Tracking ID</div>
              <div class="order-number">{order}</div>
            </div>
            <div class="order-footer">Thanks for Shopping Here !!</div>
          </div>
          <div class="jagged-edge"></div>
        </div>
      </div>
    </div>
  );
}
