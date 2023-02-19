//import './App.css';
import React, { useEffect } from "react";
import { useState } from "react";
import { Routes } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Compnents/Header";
import Body from "./Compnents/Body";
import Login from "./Compnents/login";
import Signup_sell from "./Compnents/signup_sell";
import Signup_cust from "./Compnents/signup_cust";
import About from "./Compnents/about";
import Footer from "./Compnents/Footer";
import Addproduct from "./Compnents/addProduct";
import SellerLogin from "./Compnents/sell_login";
import Seller from "./Compnents/seller";
import MainLayout from "./Compnents/Seller/MainLayout";
import SearchResult from "./Compnents/searchResult";
import ViewProduct from "./Compnents/viewProduct";
import Update from "./Compnents/update";
import Loading from "./Compnents/Loading";
import app from "./App.css";
import SellerDashboard from "./Compnents/Seller/SellerDashboard";
import Products from "./Compnents/Seller/Products";
import AddProduct from "./Compnents/Seller/AddProduct";
import SellerInputs from "./Compnents/Seller/SellerInputs";
import Discount from "./Compnents/Seller/Discount";
import AddSale from "./Compnents/Seller/AddSale";
import EditProduct from "./Compnents/Seller/EditProduct";
import UpdateAlert from "./Compnents/Seller/Alert1";
import ProductDetail from "./Compnents/productDetail";
import ShowAlert from "./Compnents/Seller/Alert";
import EditSale from "./Compnents/Seller/EditSale";
import AddPromo from "./Compnents/Seller/PromoCode";
import Orders from "./Compnents/Seller/Orders";
import Logout from "./Compnents/Seller/Logout";
import ProductHub from "./Compnents/productHub";
import Wishlist from "./Compnents/Wishlist";
import Saledetail from "./Compnents/Saledetail";
import Cart from "./Compnents/Cart";
import CheckoutSucess from "./Compnents/checkoutSucess";
import CompareTable from "./Compnents/compareTable";
import CustomerPanel from "./Compnents/CustomerPanel";
import AddReviews from "./Compnents/addReviews";
import SellerProfile from "./Compnents/Seller/SellerProfile";
import BlogsPage from "./Compnents/Seller/BlogsPage";
import Notifications from "./Compnents/Seller/Notifications";
// import { ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function App() {
  async function sendMail() {
    await fetch("/sendMails", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          console.log(data);
        }
      });
  }
  const [sellLogin, setSellLogin] = useState(false);
  const [custLogin, setCustLogin] = useState(false);
  useEffect((e) => {
    setInterval(sendMail, 1000000000);
    if(localStorage.getItem("Name") !== ""){
      setCustLogin(true)
    }
    if(localStorage.getItem("SellerName") !== ""){
      setSellLogin(true)
    }
  });
  return (
    <>
      {/* <Provider store = {store}> */}
      <BrowserRouter>
        {/* <ToastContainer/> */}
        <Header />
        <Routes>
          <Route exact path="/" element={<Body login={custLogin} setLogin={setCustLogin}/>} />
          <Route exact path="/loading" element={<Loading />} />
          <Route
            exact
            path="/login"
            element={<Login login={custLogin} setLogin={setCustLogin} />}
          />
          <Route exact path="/customer/add" element={<Signup_cust />} />
          <Route exact path="/result" element={<SearchResult />} />
          <Route exact path="/wishlist" element={<Wishlist />} />
          <Route exact path="/custPanel" element={<CustomerPanel />} />
          <Route exact path="/addReviews" element={<AddReviews />} />
          <Route exact path="/blogPosts" element={<BlogsPage />} />
          <Route
            exact
            path="/saleDetail"
            element={<Saledetail login={custLogin} setLogin={setCustLogin} />}
          />
          <Route exact path="/shoppingCart" element={<Cart />} />
          <Route exact path="/checkout-success" element={<CheckoutSucess />} />
          <Route
            path="/seller"
            element={<MainLayout login={sellLogin} setLogin={setSellLogin} />}
          >
            <Route index element={<SellerDashboard />} />
            <Route exact path="sellerProfile" element={<SellerProfile />} />
            <Route exact path="products" element={<Products />} />
            <Route exact path="blogs" element={<BlogsPage />} />
            <Route exact path="orders" element={<Orders />} />
            <Route exact path="addProduct" element={<AddProduct />} />
            <Route exact path="editProduct" element={<EditProduct />} />
            <Route exact path="sales" element={<Discount />} />
            <Route exact path="addSale" element={<AddSale />} />
            <Route exact path="editSale" element={<EditSale />} />
            <Route exact path="notifications" element={<Notifications />} />
            <Route
              exact
              path="saleUpdateAlert"
              element={<UpdateAlert name="Sale" />}
            />
            <Route
              exact
              path="prodUpdateAlert"
              element={<UpdateAlert name="Product" />}
            />
            <Route exact path="saleAlert" element={<ShowAlert name="Sale" />} />
            <Route exact path="addPromo" element={<AddPromo />} />
            <Route
              exact
              path="promoAlert"
              element={<ShowAlert name="Promo" />}
            />
          </Route>
          <Route
            exact
            path="/sellerLogin"
            element={<SellerLogin login={sellLogin} setLogin={setSellLogin} />}
          />
          <Route
            exact
            path="/sellerLogout"
            element={<Logout login={sellLogin} setLogin={setSellLogin} />}
          />
          <Route exact path="/sellerAdd" element={<Signup_sell />} />
          <Route
            exact
            path="/result/productDetail"
            element={<ProductDetail />}
          />
          <Route exact path="/result/productHub" element={<ProductHub login={custLogin} setLogin={setCustLogin}/>} />
          <Route exact path="/compare" element={<CompareTable login={custLogin} setLogin={setCustLogin}/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
      {/* </Provider> */}
    </>
  );
}

export default App;
