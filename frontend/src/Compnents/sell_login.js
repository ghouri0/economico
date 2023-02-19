import React from 'react'
import './login.css';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

var name = "";
var user = {};


export default function Sell_login({login, setLogin}) {
  const navigate = useNavigate();
  

   const initial = {
    email: null,
    pass: null
  }

  const [inputs, setInputs] = useState(initial);

  useEffect(() => {
    if (login) {
      navigate("/seller");
    }
  }, [login]);

  const handlesign = () => {
    navigate("/sellerAdd");
  }

   function handleEmail(e) {
    const emailId = e.target.value;
    inputs.email = emailId;
  }

  function handlePassword(e) {
    const password = e.target.value;
    inputs.pass = password;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, pass } = inputs;
    console.log(email);
    console.log(pass);

    const data = {
      email1: email,
      password1: pass
    }

    const result = await axios.post("/loginSeller", data);
    console.log("res....",result);
    if (result.data.INmessage) {
      toast(result.data.INmessage)
    }
    else if (result.data.IEmessage) {
      toast(result.data.IEmessage)
    }
    else if (result.data.IPmessage) {
      toast(result.data.IPmessage)
    }
    else {
      user = result.data;  // save information into user
      toast("Successfully Logged In");
      localStorage.setItem("Name", result.data.sellerName);
      localStorage.setItem("SellerName", result.data.sellerName);
      localStorage.setItem("SellerEmail", result.data.emailID);
      localStorage.setItem("SellerStore", result.data.storeName);
      setLogin(true)
      navigate("/seller");
    }
  }

  return (
    // <div className= 'body'>
    //     <br />
    //     <br />
    //     <form action="" title='Login' className='form_cust'>
    //         <h3 className='title1'>Sell Online</h3>
    //         <br />
    //         <label htmlFor="Email" className = 'label' >E-mail: </label>
    //         <input type="email" name="" className="form-control in" placeholder= 'Email' required onChange={handleEmail}/>
    //         <br />
    //         <br />
    //         <label htmlFor="pass" className = 'label'>Password: </label>
    //         <input type="password" name="" className="form-control in" placeholder='Pasword' required onChange={handlePassword}/>
    //         <br />
    //         <input type="submit" value="Login" className = 'btn btn-success login' onMouseEnter={'hover'} onClick= {handleLogin}/>
    //         <br />
    //         <br />
    //         <div id='notAccount'>
    //           <p>Not have an account &nbsp; &nbsp;<button className='btn btn-dark' type="submit" onClick={handlesign}> Register Now</button></p>
    //         </div>
    //     </form>
    //     <br />
    // </div>






    <div style={{backgroundColor: "#f5f5f5"}}>
      <form class="form-signin" method="POST">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" autofocus required onChange={handleEmail}/>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required onChange={handlePassword}/>
        <button class="btn btn-lg btn-primary btn-block" type="submit" onClick={handleLogin}>Sign in</button>
        <br/>
        <p style={{ textAlign: "center" }}>Or</p>
        <button class="btn btn-primary btn-block" type="submit" onClick={handlesign}>Sign Up</button>
        </form>
        <Toaster
        toastOptions={{
          className: "",
          style: {
            backgroundColor: "2d9632",
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

    
    
  )
}

export { name };
export { user };  // export local auth user.
