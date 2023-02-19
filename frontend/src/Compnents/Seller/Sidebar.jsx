import React, { useState } from "react";
import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import CropFreeIcon from "@mui/icons-material/CropFree";
import ShoppingBagSharpIcon from "@mui/icons-material/ShoppingBagSharp";
import DiscountIcon from "@mui/icons-material/Discount";
import NotificationsSharpIcon from "@mui/icons-material/NotificationsSharp";
import SettingsSuggestSharpIcon from "@mui/icons-material/SettingsSuggestSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="sidebar">
      <div className="center">
        <ul>
          <Link to="/seller" style={{ textDecoration: "none" }}>
            <li className="active">
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">Application Stats</p>
          <Link to="/seller/products" style={{ textDecoration: "none" }}>
            <li>
              <InventoryIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/seller/orders" style={{ textDecoration: "none" }}>
            <li>
              <ShoppingBagSharpIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <p className="title">Discount Offers</p>
          <Link to="/seller/sales" style={{ textDecoration: "none" }}>
            <li>
              <DiscountIcon className="icon" />
              <span>Sales - Deals</span>
            </li>
          </Link>
          <p className="title">System Controls</p>
          <Link to="/seller/notifications">
            <li>
              <NotificationsSharpIcon className="icon" />
              <span>Notifications</span>
            </li>
          </Link>
          <p className="title">Store Profile</p>
          <Link to="/seller/sellerProfile">
            <li>
              <AccountCircleSharpIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <Link to="/sellerLogout">
            <li>
              <LogoutRoundedIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
