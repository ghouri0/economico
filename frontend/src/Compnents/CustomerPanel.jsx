import React, { useState, useEffect } from "react";
import "./panel.css";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import OrderTable from "./OrderTable";
import { useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import toast, { Toaster } from 'react-hot-toast';

export default function CustomerPanel() {
  const [orders, setOrders] = useState(0);
  const cart = useSelector((item) => item.products);
  const [profile, setProfile] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [city, setCity] = useState("");
  const [password, setPass] = useState("");
  const role = "customer";
  const [old, setOld] = useState("");
  const [passErr, setErr] = useState("");
  const [newErr, setNew] = useState("");

  async function getOrders(customer) {
    console.log(customer);
    await fetch(`/getOrders/${customer}`, { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        setOrders(data.length);
      });
  }
  async function getCustomerProfile(customer) {
    console.log(customer);
    await fetch(`/getProfile/${customer}`, { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        setCustomer(data);
      });
  }

  useEffect(() => {
    getOrders(localStorage.getItem("Name"));
    getCustomerProfile(localStorage.getItem("Name"));
  }, []);

  function checkPassword(password) {
    if (password !== old) {
      setErr("Passowrd donot Matched");
    } else {
      setErr("Password Matched");
    }
  }

  async function updateProfile() {
    const profile = {
      name: name,
      email: localStorage.getItem("Name"),
      phone: phone,
      city: city,
      password: password,
      role: role,
    };
    await fetch("/updateProfile", {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profile,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          toast(data.message);
        } else {
          toast(data.error);
        }
      });
  }

  return (
    <div class="container">
      <div class="row profile">
        <div class="col-md-3">
          <div
            class="profile-sidebar titleContainer"
            style={{ height: "100vh" }}
          >
            <div class="profile-userpic">
              <img
                src="https://source.unsplash.com/random/?person/"
                class="img-responsive"
                alt=""
              />
            </div>
            <br />
            <div class="profile-usertitle">
              <div class="profile-usertitle-name">
                {localStorage.getItem("Name")}
              </div>
              <div class="profile-usertitle-job">Customer</div>
            </div>
            <div class="profile-userbuttons">
              <Button
                style={{
                  width: "90%",
                  padding: "10px",
                  backgroundColor: "maroon",
                  color: "white",
                  fontSize: "12px",
                }}
                onMouseEnter="brown"
                onClick={() => {
                  setProfile(true);
                }}
              >
                Edit Profile
              </Button>
            </div>

            <div class="profile-usermenu">
              <ul class="nav">
                <li class="active">
                  <a href="#">
                    <i class="glyphicon glyphicon-home"></i>
                    Profile Overview
                  </a>
                </li>
              </ul>
            </div>

            <div class="portlet">
              <div class="row list-separated profile-stat">
                <div class="col-md-4 col-sm-4 col-xs-6">
                  <div class="uppercase profile-stat-title"> {orders} </div>
                  <div class="uppercase profile-stat-text"> Orders </div>
                </div>
                <div class="col-md-4 col-sm-4 col-xs-6">
                  <div class="uppercase profile-stat-title">
                    {" "}
                    {cart.quantity}{" "}
                  </div>
                  <div class="uppercase profile-stat-text"> Cart Items </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-9" style={{ marginTop: "10px" }}>
          <div class="profile-content">
            {!profile ? (
              <OrderTable />
            ) : (
              <div class="titleContainer">
                <div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 edit_information">
                  {customer &&
                    customer.map((cust) => (
                      <form action="" method="POST" style={{ padding: "10px" }}>
                        <h3
                          class="text-center"
                          style={{ display: "flex", gap: "10px" }}
                        >
                          <HomeIcon
                            style={{ display: "flex", marginTop: "5px" }}
                            onClick={() => {
                              setProfile(false);
                            }}
                          />
                          Edit Account Details{" "}
                        </h3>
                        <div class="row">
                          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="form-group">
                              <label class="profile_details_text">
                                Profile Name:
                              </label>
                              <input
                                type="text"
                                name="name"
                                class="form-control"
                                value={cust.name}
                                contentEditable
                                required
                                onChange={(e) => {
                                  setName(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="form-group">
                              <label class="profile_details_text">
                                Email Address:
                              </label>
                              <input
                                type="email"
                                name="email"
                                class="form-control"
                                value={cust.email}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="form-group">
                              <label class="profile_details_text">
                                Mobile Number:
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                class="form-control"
                                value={cust.phone}
                                required
                                onChange={(e) => {
                                  setPhone(e.target.value);
                                }}
                              />
                              <label class="profile_details_text">City:</label>
                              <input
                                type="text"
                                name="city"
                                class="form-control"
                                value={cust.city}
                                required
                                onChange={(e) => {
                                  setCity(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div class="form-group">
                              <label class="profile_details_text">
                                Old Password:
                              </label>
                              <input
                                type="password"
                                name="oldPass"
                                class="form-control"
                                required
                                onChange={(e) => {
                                  console.log(e.target.value);
                                  setOld(cust.password);
                                  checkPassword(e.target.value);
                                }}
                              />
                              <label
                                class="profile_details_text"
                                style={{ color: "grey" }}
                              >
                                {passErr}
                              </label>
                            </div>
                          </div>
                          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div class="form-group">
                              <label class="profile_details_text">
                                New Password:{" "}
                              </label>
                              <input
                                type="password"
                                name="newPass"
                                class="form-control"
                                required
                                onChange={(e) => {
                                  if (e.target.value.length < 8) {
                                    setNew("Password length must be 8");
                                  } else {
                                    setNew("Length Matched");
                                    setPass(e.target.value);
                                  }
                                }}
                              />
                              <label
                                class="profile_details_text"
                                style={{ color: "grey" }}
                              >
                                {newErr}
                              </label>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 submit">
                            <div class="form-group">
                              <Button
                                style={{
                                  width: "60%",
                                  padding: "10px",
                                  margin: "auto",
                                  backgroundColor: "maroon",
                                  color: "white",
                                  fontSize: "12px",
                                }}
                                onMouseEnter="brown"
                                onClick={() => {
                                  updateProfile();
                                }}
                              >
                                Save Changes
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            backgroundColor: "#2d9632",
            padding: "5px",
            color: "white",
            width: "250px",
            height: "40px",
            left: 15,
            top: 1000,
          },
        }}
      />
    </div>
  );
}
