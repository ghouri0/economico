import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cust_sign.css";
import toast, { Toaster } from "react-hot-toast";

export default function Signup_cust() {
  const initial = {
    name: null,
    email: null,
    phone: null,
    add: null,
    pass: null,
  };
  const navigate = useNavigate();

  const [inputs, setInputs] = useState(initial);
  const [user_err, setUser] = useState("");
  const [pass_err, setPass_err] = useState("");
  const [checkpass, setCheck] = useState("");
  const [email_err, setemail_err] = useState("");
  const [phone_err, setphone_err] = useState("");

  function handleUser(e) {
    var name = e.target.value.trim();
    const lenght = /.{3,}/;
    if (name == null || !lenght.test(name)) {
      setUser("Name can't be Null");
    } else {
      setUser("");
    }
    inputs.name = name;
  }

  function handleEmail(e) {
    var email = e.target.value.trim();
    if (email === null || email.lenght == 0) {
      setemail_err("email can't be Null");
    } else {
      setemail_err("");
    }
    inputs.email = email;
  }

  function handlePhone(e) {
    var phone = e.target.value.trim();
    const lenght = /.{11,}/;
    if (phone == null || !lenght.test(phone)) {
      setphone_err("phone number must be 11 chars");
    } else {
      setphone_err("");
    }
    inputs.phone = phone;
  }

  function handleAdd(e) {
    var address = e.target.value.trim();
    inputs.add = address;
  }

  function handlePass(e) {
    const password = e.target.value.trim();
    const upper = /(?=.*?[A-Z])/;
    const lower = /(?=.*?[a-z])/;
    const digit = /(?=.*?[0-9])/;
    const spec = /(?=.*?[#!@$%^&*-?])/;
    const lenght = /.{8,}/;
    if (
      !upper.test(password) ||
      !lower.test(password) ||
      !digit.test(password) ||
      !spec.test(password) ||
      !lenght.test(password)
    ) {
      setPass_err(
        "Password must have 8 chars lenght and atleast 1 upper/lower/digit"
      );
    } else {
      setPass_err("");
    }
    inputs.pass = password;
  }

  function check(e) {
    var password = e.target.value.trim();
    var check_val = inputs.pass;
    if (!password.match(check_val)) {
      setCheck("Password does'not match");
    } else {
      setCheck("");
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const { name, email, phone, add, pass } = inputs;
    const data = {
      name1: name,
      password1: pass,
      email1: email,
      phone1: phone,
      address1: add,
    };
    if (
      data.name1 &&
      data.password1 &&
      data.email1 &&
      data.phone1 &&
      data.address1
    ) {
      const result = await axios.post("/register", data);
      console.log("res", result.data);
      console.log(result.data.message);
      if (result.data.message) {
        toast("Email already taken");
      } else {
        toast("User created");
        localStorage.setItem("Name", result.data.email);
        navigate("/");
      }
      console.log(result);
    } else {
      toast("Please Fill the all fields");
    }
  };

  return (
    // <div className='body' style={{height:'900px'}}>
    //   <br />
    //   <br />

    //   <form style={{width: '600px', height: '830px'}} className='form_cust' method='POST' title='Login' onSubmit={handleClick}>
    //     <h3 className='title1'>Create Account</h3>
    //     <br />
    //     <label htmlFor="name" className='label' >Name: </label>
    //     <input type='text' name="" className="in" placeholder='Users Name' onChange={handleUser} required />
    //     <div class='error'>
    //       <p>{user_err}</p>
    //     </div>
    //     <label htmlFor="Email" className='label' >E-mail: </label>
    //     <input type="email" name="" className="in" placeholder='Email' required onChange={handleEmail} />
    //     <div class='error'>
    //       <p>{email_err}</p>
    //     </div>
    //     <label htmlFor="phone" className='label' >Phone: </label>
    //     <input type="text" name="" className="in" placeholder='Phone' required onChange={handlePhone} />
    //     <div class='error'>
    //       <p>{phone_err}</p>
    //     </div>
    //     <label htmlFor="address" className='label' >Address: </label>
    //     <input type="text" name="" className="in" placeholder='Address' required onChange={handleAdd} />
    //     <br />
    //     <label htmlFor="pass" className='label'>Password: </label>
    //     <input type="password" name="" className="in" placeholder='Pasword' onChange={handlePass} required />
    //     <div class='error'>
    //       <p>{pass_err}</p>
    //     </div>
    //     <label htmlFor="pass" className='label'>Confirm Password: </label>
    //     <input type="password" name="" className="in" placeholder='Confirm Password' onChange={check} required />
    //     <div class='error'>
    //       <p>{checkpass}</p>
    //     </div>
    //     <br />
    //     <input type="submit" value="Register" className = 'btn btn-success login'/>
    //   </form>
    // </div>

    <div style={{ backgroundColor: "#f5f5f5" }}>
      <form class="form-signin" method="POST">
        <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
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
          onChange={handlePass}
        />

        <label for="Name" class="sr-only">
          Name
        </label>
        <input
          type="text"
          id="inputEmail"
          class="form-control"
          placeholder="Name"
          autofocus
          required
          onChange={handleUser}
        />

        <label for="Phone" class="sr-only">
          Phone
        </label>
        <input
          type="number"
          id="inputEmail"
          class="form-control"
          placeholder="Phone"
          autofocus
          required
          onChange={handlePhone}
        />

        <label for="Address" class="sr-only">
          Address
        </label>
        <input
          type="text"
          id="inputEmail"
          class="form-control"
          placeholder="Address"
          autofocus
          required
          onChange={handleAdd}
        />

        <button
          class="btn btn-lg btn-primary btn-block"
          type="submit"
          onClick={handleClick}
        >
          Sign in
        </button>
      </form>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            backgroundColor: "crimson",
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
