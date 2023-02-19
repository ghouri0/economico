import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    // <div style={{backgroundColor: '#FFE6BC', height: '65px'}}>
    //   <p style={{textAlign: 'center', padding: 10, fontFamily: 'times', fontSize: 20}}>
    //     &copy; ShoppingGuide
    //   </p>
    // </div>

    <div class="footer">
      <div class="container">
        <div class="row">
          <div class="footer-col-4">
            {/* <h3>Download Our App</h3>
            <p>Download App for Android and iso mobile phone.</p>
            <div class="app-logo">
              <img src="https://i.ibb.co/KbPTYYQ/play-store.png" alt="" />
              <img src="https://i.ibb.co/hVM4X2p/app-store.png" alt="" />
            </div> */}
          </div>

          <div class="footer-col-1">
            <i className="fas fa-meteor nav-logo"></i>
            <h2>Economico</h2>
            <p>
              Our Purpose Is To Sustainably Make the Pleasure and Benefits of
              Electronics Accessible to the Many.
            </p>
          </div>

          <div class="footer-col-4">
            {/* <h3>Useful Links</h3>
            <ul>
              <li>Coupons</li>
              <Link to= '/blogPosts'>
                <li style={{color: 'gray', margin: '0px'}}>Blog Post</li>
              </Link>
              <li>Return Policy</li>
              <li>Join Affiliate</li>
            </ul> */}
          </div>

          <div class="footer-col-3">
            <h2>Follow us</h2>
            <ul>
            <p>
              Mobile Phones
            </p>
            <p>
              Laptops
            </p>
            <p>
              Computers
            </p>
            
            </ul>
          </div>
        </div>
        <hr />
        <p class="copyright">Copyright &copy; 2023 - Economico</p>
      </div>
    </div>
  );
}
