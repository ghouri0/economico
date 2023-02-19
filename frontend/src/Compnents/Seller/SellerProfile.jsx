import React from "react";
import "./sellerProfile.css";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Chip from '@mui/material/Chip';

export default function SellerProfile() {
  const [seller, setSeller] = useState([]);
  const [profile, setProfile] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [password, setPass] = useState("");
  const [old, setOld] = useState("");
  const [passErr, setErr] = useState("");
  const [newErr, setNew] = useState("");
  const [alertEdit, setAlert] = useState(false);

  async function updateProfile() {
    const profile = {
      sellerName: name,
      emailID: localStorage.getItem("SellerEmail"),
      phoneNo: phone,
      password: password,
    };
    await fetch("/updateSellerProfile", {
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
          alert(data.message);
          setProfile(false);
          setAlert(true);
        } else {
          alert(data.error);
        }
      });
  }

  async function getSellerProfile() {
    await fetch(`/getSellerProfile/${localStorage.getItem("SellerEmail")}`, {
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setSeller(data);
      });
  }

  function checkPassword(password) {
    if (password !== old) {
      setErr("Passowrd donot Matched");
    } else {
      setErr("Password Matched");
    }
  }

  useEffect(() => {
    getSellerProfile(localStorage.getItem("SellerEmail"));
  }, []);

  return (
    <div class="container mt-5">
      <div class="row d-flex justify-content-center">
        <div class="col-md-12" style={{ width: "100%" }}>
          <div class="card p-3 py-4" style={{ width: "100%" }}>
            <div
              class="text-center"
              style={{
                width: "150px",
                height: "max-contect",
                margin: "auto",
                // margin: '50px',
                gap: "250px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                style={{
                  borderRadius: "50%",
                  width: "150px",
                  height: "150px",
                  fontSize: "50px",
                  fontWeight: "bold",
                  color: "Background",
                  backgroundColor: "grey",
                  // marginLeft: "0px",
                }}
              >
                {localStorage
                  .getItem("SellerName")
                  .charAt(0)
                  .toUpperCase()}
              </Avatar>
              <div
                class="mt-3"
                style={{
                  margin: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  fontSize: "25px",
                }}
              >
                <h3 class="mt-2 mb-0">{localStorage.getItem("SellerName")}</h3>
                <br />
                <Chip label="Registered Seller" color="info"/>
                <h2>{localStorage.getItem("SellerStore")}</h2>
                <span>{localStorage.getItem("SellerEmail")}</span>

                <div class="buttons">
                  <button
                    class="btn btn-outline-primary px-4"
                    onClick={() => {
                      setProfile(true);
                      setAlert(false);
                    }}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
            {!profile ? (
              alertEdit ? (
                <Alert severity="success" style={{ width: "80%" }}>
                  Profile Edited
                  <SentimentSatisfiedAltIcon style={{ color: "green" }} />
                </Alert>
              ) : (
                ""
              )
            ) : (
              // <div class="titleContainer">
              <div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 edit_information">
                {seller &&
                  seller.map((sell) => (
                    <form action="" method="POST" style={{ padding: "10px" }}>
                      <h3
                        class="text-center"
                        style={{ display: "flex", gap: "10px" }}
                      >
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
                              value={sell.sellerName}
                              contentEditable="true"
                              required
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <div class="form-group">
                            <label class="profile_details_text">
                              Email ID:
                            </label>
                            <input
                              type="email"
                              name="email"
                              class="form-control"
                              value={sell.emailID}
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <div class="form-group">
                            <label class="profile_details_text">
                              Store Name:
                            </label>
                            <input
                              type="text"
                              name="store"
                              class="form-control"
                              required
                              value={sell.storeName}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <div class="form-group">
                            <label class="profile_details_text">
                              License ID:
                            </label>
                            <input
                              type="text"
                              name="license"
                              class="form-control"
                              required
                              value={sell.licenseID}
                            />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <div class="form-group">
                            <label class="profile_details_text">
                              Phone No:
                            </label>
                            <input
                              type="number"
                              name="phone"
                              class="form-control"
                              required
                              contentEditable="true"
                              value={sell.phoneNo}
                              onChange={(e) => {
                                setPhone(e.target.value);
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
                                setOld(sell.password);
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
                                width: "max-content",
                                padding: "10px",
                                margin: "10px",
                                backgroundColor: "orange",
                                color: "white",
                                fontSize: "12px",
                              }}
                              onMouseEnter="brown"
                              onClick={() => {
                                updateProfile();
                              }}
                            >
                              Save Updates
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  ))}
                {/* </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
