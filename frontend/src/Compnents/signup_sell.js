import React from "react";
import { useState } from "react";
import "./sell_sign.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export default function Signup_sell() {
  const navigate = useNavigate();

  const initial = {
    owner: null,
    store_name: null,
    license: null,
    email: null,
    phone: null,
    pass: null,
  };

  const [inputs, setInputs] = useState(initial);
  const [storename_err, setstorename_err] = useState("");
  const [license_err, setlicense_err] = useState("");
  const [owner_err, setowner_err] = useState("");
  const [pass_err, setPass_err] = useState("");
  const [checkpass, setCheck] = useState("");
  const [email_err, setemail_err] = useState("");
  const [phone_err, setphone_err] = useState("");

  function handleUser(e) {
    var name = e.target.value.trim();
    const lenght = /.{3,}/;
    if (name == null || !lenght.test(name)) {
      setowner_err("Name can't be Null");
    } else {
      setowner_err("");
    }
    inputs.owner = name;
  }

  function handleEmail(e) {
    var email = e.target.value.trim();
    if (email == null || email.lenght == 0) {
      setemail_err("email can't be Null");
    } else {
      setemail_err("");
    }
    inputs.email = email;
  }

  function handleStoreName(e) {
    const stname = e.target.value.trim();
    if (stname == null || stname.lenght == 0) {
      setstorename_err("Store name must be given");
    } else {
      setstorename_err("");
    }
    inputs.store_name = stname;
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

  function handleLicense(e) {
    const licenseid = e.target.value.trim();
    if (licenseid == null || licenseid.lenght == 0) {
      setlicense_err("License ID must be Given");
    } else {
      setlicense_err("");
    }
    inputs.license = licenseid;
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const { owner, store_name, license, email, phone, pass } = inputs;
    console.log(store_name);
    console.log(license);
    const data = {
      name1: email,
      password1: pass,
      email1: email,
      license1: license,
      phone1: phone,
      stName: store_name,
    };
    if (
      data.password1 &&
      data.email1 &&
      data.phone1 &&
      data.stName &&
      data.license1
    ) {
      const result = await axios.post("/registerSeller", data);
      console.log("res", result.data);
      console.log(result.data.message);
      if (result.data.message) {
        toast("Seller is already registered");
      } else {
        toast("Seller Successfully Registered");
        navigate("/sellerLogin");
      }
      console.log(result);
    } else {
      toast("Please Fill the all Fields.");
    }
  };

  function handlePass(e) {
    var password = e.target.value.trim();
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
      setCheck("Password does'nt match");
    } else {
      setCheck("");
    }
  }

  return (
    // <div className='body' style={{ height: '950px' }}>
    //   <br />
    //   <form style={{ width: '600px', height: '920px' }} method="POST" className='form_cust' action="" title='Login'>
    //     <h3 className='title1'>Create Your Store</h3>
    //     <br />
    //     <label htmlFor="owner" className='label' >Owner: </label>
    //     <input type='text' name="" className="in" placeholder='Owner Name' required onChange={handleUser} />
    //     <div class='error'>
    //       <p>{owner_err}</p>
    //     </div>
    //     <label htmlFor="store" className='label' >Store Name: </label>
    //     <input type='text' name="" className="in" placeholder='Store Name' onChange={handleStoreName} />
    //     <div class='error'>
    //       <p>{storename_err}</p>
    //     </div>
    //     <label htmlFor="license" className='label' >License: </label>
    //     <input type='text' name="" className="in" placeholder='License ID' onChange={handleLicense} />
    //     <div class='error'>
    //       <p>{license_err}</p>
    //     </div>
    //     <label htmlFor="Email" className='label' >E-mail: </label>
    //     <input type="email" name="" className="in" placeholder='Email' required onChange={handleEmail} />
    //     <div class='error'>
    //       <p>{email_err}</p>
    //     </div>
    //     <label htmlFor="phone" className='label' >Phone: </label>
    //     <input type="text" name="" className="in" placeholder='Number' required onChange={handlePhone} />
    //     <div class='error'>
    //       <p>{phone_err}</p>
    //     </div>
    //     <label htmlFor="pass" className='label'>Password: </label>
    //     <input type="password" name="" className="in" placeholder='Pasword' required onChange={handlePass} />
    //     <div class='error'>
    //       <p>{pass_err}</p>
    //     </div>
    //     <label htmlFor="pass" className='label'>Confirm Password: </label>
    //     <input type="password" name="" className="in" placeholder='Confirm Password' required onChange={check} />
    //     <div class='error'>
    //       <p>{checkpass}</p>
    //     </div>
    //     <input type="submit" value="Register" className = 'btn btn-success login' onClick={handleClick} />
    //     <input value="Login" style={{ marginLeft: "20px" }} onClick={handleSellerLogin} className = 'btn btn-success login' />
    //   </form>
    // </div>

    <div style={{ backgroundColor: "#f5f5f5" }}>
      <form class="form-signin" method="POST">
        <h1 class="h3 mb-3 font-weight-normal">Sell Online</h1>
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

        <label for="License" class="sr-only">
          License
        </label>
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="License"
          autofocus
          required
          onChange={handleLicense}
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

        <label for="Store Name" class="sr-only">
          Store Name
        </label>
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Store Name"
          autofocus
          required
          onChange={handleStoreName}
        />

        <button
          class="btn btn-lg btn-primary btn-block"
          type="submit"
          onClick={handleClick}
        >
          Register
        </button>
      </form>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            backgroundColor: 'crimson',
            padding: '5px',
            color: 'white',
            width: '250px',
            height: '40px',
            left: 15,
            top: 1000
          },
        }}
      />
    </div>
  );
}
