import React, { useState } from "react";
import Home from "./pages/home/Home";
import Delivery from "./pages/delivery/Delivery";
import Login from "./pages/login/Login";
import AddDelivery from "./pages/delivery/AddDelivery";
import Customer from "./pages/customers/Customer";
import Seller from "./pages/seller/Seller";
import Blogs from "./pages/blogs/Blogs";
import EditBlog from "./pages/blogs/EditBlog";
import "antd/dist/antd.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Order from "./pages/orders/Order";
import MainLayout from "./components/MainLayout";
import Logout from "./pages/logout/Logout";
import Profile from "./pages/profile/Profile";

function App() {
  const [isloggedin, setLoggedin] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<MainLayout login={isloggedin} setLogin={setLoggedin} />}
          >
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="sellers" element={<Seller />} />
            <Route path="customers" element={<Customer />} />
            <Route path="orders" element={<Order />} />
            <Route path="delivery" element={<Delivery />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="editBlog/:title/:content" element={<EditBlog />} />
            <Route path="addDelivery" element={<AddDelivery />} />
          </Route>
          <Route
            exact
            path="/login"
            element={<Login login={isloggedin} setLogin={setLoggedin} />}
          />
          <Route
            exact
            path="/logout"
            element={<Logout login={isloggedin} setLogin={setLoggedin} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
