import React, { useEffect, useState } from "react";
import "./sellerDashboard.css";
import Sales from "./Sales";
import Orders from "./Orders";
import Ranks from "./Ranking";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import ProductsChart from "./ProductsChart";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export default function SellerDashboard() {

  async function getNotification(seller) {
    let data2 = await axios.post("/getOrderNotifications", {
      seller: seller,
    });
    if (!data2.data.message) {
      console.log(data2.data);
      toast('You have new Notifications')
    }
  }

  useEffect(() => {
    getNotification(localStorage.getItem("SellerEmail"));
  }, []);

  return (
    <div>
      <div style={{ display: "flex", margin: "25px" }}>
        <div className="sales" style={{ display: "flex", width: "1350px" }}>
          <div
            className="sales"
            style={{
              width: "500px",
              height: "450px",
              boxShadow: "none",
              marginTop: "10px",
            }}
          >
            <div className="title">Products Cataloge</div>
            <Link to="/seller/products">
              <AccountTreeOutlinedIcon
                style={{
                  width: "250px",
                  height: "250px",
                  margin: "auto",
                  color: "#ff7300",
                }}
              />
            </Link>
          </div>
          <div
            className="sales"
            style={{
              width: "800px",
              height: "600px",
              boxShadow: "none",
              marginTop: "50px",
            }}
          >
            <ProductsChart />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", margin: "10px" }}>
        <div className="sales" style={{width: '1350px'}}>
          <div className="title">Last 6 Months Sales</div>
          <Sales />
        </div>
      </div>
      <div className="widgets" style={{ display: "flex" }}>
        <Orders />
      </div>
      <Toaster />
    </div>
  );
}
