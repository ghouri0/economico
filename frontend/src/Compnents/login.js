import React, { useEffect } from "react";
import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import toast, { Toaster } from "react-hot-toast";

var name = "";
var user = {};

export default function Login({ login, setLogin }) {
  const initial = {
    email: null,
    pass: null,
  };

  const [inputs, setInputs] = useState(initial);
  const [email, setEmail] = useState("");
  const [error, seterror] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleEmail(e) {
    const emailId = e.target.value;
    inputs.email = emailId;
  }

  function handlePassword(e) {
    const password = e.target.value;
    inputs.pass = password;
  }

  const handlesign = () => {
    navigate("/customer/add");
  };
  useEffect(() => {
    if (login) {
      navigate("/");
    }
  }, [login]);

  // handling local login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, pass } = inputs;
    console.log(email);
    console.log(pass);

    const data = {
      email1: email,
      password1: pass,
    };

    const result = await axios.post("/loginCustomer", data);
    console.log("res", result);
    if (result.data.INmessage) {
      toast(result.data.INmessage);
    } else if (result.data.IEmessage) {
      toast(result.data.IEmessage);
    } else if (result.data.IPmessage) {
      toast(result.data.IPmessage);
    } else {
      user = result.data; // save information into user
      toast("Successfully Logged In");
      localStorage.setItem("Name", result.data.email);
      setLogin(true);
      navigate("/");
    }
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <form class="form-signin" method="POST">
        <h1 class="h3 mb-3 font-weight-normal">Sign-In</h1>
        <label for="inputEmail" class="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          autofocus
          required
          onChange={handleEmail}
        />
        <label for="inputPassword" class="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          required
          onChange={handlePassword}
        />
        <button
          class="btn btn-lg btn-primary btn-block"
          type="submit"
          onClick={handleLogin}
        >
          Sign in
        </button>
        <br />
        <a
          href="http://localhost:5000/auth/google"
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="outlined"
            startIcon={<GoogleIcon style={{ color: "maroon" }} />}
            style={{
              width: "100%",
              fontWeight: "bold",
              borderColor: "maroon",
              color: "crimson",
            }}
          >
            Login with Google
          </Button>
        </a>
        <br />
        <br />
        <a
          href="http://localhost:5000/auth/facebook"
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="outlined"
            startIcon={<FacebookIcon style={{ color: "blue" }} />}
            style={{
              width: "100%",
              fontWeight: "bold",
              borderColor: "blue",
              color: "blue",
            }}
          >
            Login with Facebook
          </Button>
        </a>
        <br />
        OR
        <br />
        <button
          class="btn btn-lg btn-primary btn-block"
          type="submit"
          onClick={handlesign}
        >
          Register Now..
        </button>
      </form>
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

export { name };
export { user }; // export local auth user.
