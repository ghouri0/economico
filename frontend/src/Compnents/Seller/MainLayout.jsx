import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Seller from "../seller";
import Sidebar from "./Sidebar";

export default function MainLayout({ login, setLogin }) {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(sidebarOpen);
  };
  console.log(login);
  const navigate = useNavigate();
  useEffect(() => {
    if (!login) {
      navigate("/sellerLogin");
    }
  }, [login]);

  return (
    <div className="home">
      <div className="homeContainer">
        <Seller/>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
