import React from "react";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import '../pages/home/home.css'

export default function MainLayout({ login, setLogin }) {
  console.log(login);
  const navigate = useNavigate();
  useEffect(() => {
    if (!login) {
      navigate("/login");
    }
  }, [login]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
