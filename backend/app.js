//jshint esversion:6
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express, { urlencoded, json as _json, json } from "express";
import session from "express-session";
import passport from "passport";
import pkg from "passport";
const { initialize, session: _session } = pkg;
import passportLocalMongoose from "passport-local-mongoose";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import findOrCreate from "mongoose-findorcreate";
import FacebookStrategy from "passport-facebook";
import { spawn } from "child_process";
const app = express();
import nodemailer from "nodemailer";
import Stripe from "stripe";

const stripe = Stripe(
  "sk_test_51LyX4QSATIPGrWr4DtnYorc5lWSdZwO43hEVXQlRXLOTkPtC2rS012kMtK7j2S4qhROWBNOfqsCUD1eDxiiBSubR00GQYzpy8T"
);

app.use(express.static("./public"));
app.use(urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(_json());

app.use(
  session({
    secret: "This is my Little secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//mongoose.connect("mongodb://localhost:27017/authDB");

mongoose.connect("mongodb+srv://admin:admin@cluster0.dycul.mongodb.net/fypDB");

var userSession = "";
var searchResult = null;
var emailUsers = [];

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  city: String,
  phone: String,
  role: String,
  googleId: String,
  facebookId: String,
  secret: String,
  compare: [],
  wishlist: [],
});

const sellerSchema = new mongoose.Schema({
  sellerName: String,
  storeName: String,
  licenseID: String,
  emailID: String,
  phoneNo: Number,
  password: String,
  rank: Number,
});

const deliverySchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  phone: Number,
  city: String,
  password: String,
  image: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String,
  image: String,
  category: String,
  brand: String,
  seller: String,
  reviews: [],
});

const orderSchema = new mongoose.Schema({
  order_id: String,
  products: [],
  customer: String,
  date: Date,
  Total: Number,
  pay_meth: String,
  status: String,
  seller: String,
  quantity: Number,
});

const saleSchema = new mongoose.Schema({
  title: String,
  code: String,
  products: [String],
  price: [],
  discount_per: Number,
  startDate: Date,
  endDate: Date,
  seller: String,
});

const promoSchema = new mongoose.Schema({
  title: String,
  code: String,
  discount_per: Number,
  startDate: Date,
  endDate: Date,
  seller: String,
});

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: String,
});

const notificationSchema = new mongoose.Schema({
  notifyID: String,
  message: String,
  seller: String,
});

const scrappedSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  url: String,
  store: String,
});

//used to hash and salt schema
userSchema.plugin(passportLocalMongoose);
sellerSchema.plugin(passportLocalMongoose);
deliverySchema.plugin(passportLocalMongoose);
blogSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);
const Seller = mongoose.model("Seller", sellerSchema);
const Product = mongoose.model("Product", productSchema);
const Delivery = mongoose.model("Delivery", deliverySchema);
const Blog = mongoose.model("Blog", blogSchema);
const Scrapped = mongoose.model("Scrapped", scrappedSchema);
const Sale = mongoose.model("Sale", saleSchema);
const Order = mongoose.model("Order", orderSchema);
const Promo = mongoose.model("Promo", promoSchema);
const Notification = mongoose.model("Notification", notificationSchema);

passport.use(User.createStrategy());
passport.use(Seller.createStrategy());
passport.use(Delivery.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/customerHome",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log("line 81 Google Profile....", profile);
      User.findOrCreate(
        { googleId: profile.id },
        { email: profile.displayName },
        function (err, user) {
          return done(err, user);
        }
      );
    }
  )
);

///////////////////   facebook        ////////////////////////
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:5000/auth/facebook/customerHome",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("line 95 Facebook Profile....", profile);
      User.findOrCreate(
        { facebookId: profile.id },
        { email: profile.displayName },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

app.get(
  "/auth/facebook/customerHome",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/loginCustomer");
  }
);

app.get("/auth/facebook", passport.authenticate("facebook"));

// /////////////////////// facebook code ends here //////////////

// app.get("/", function (req, res) {
//   res.render("home");
// });

// app.get("/login", function (req, res) {
//   res.render("login");
// });

app.post("/loginCustomer", async function (req, res) {
  console.log("Body sending....", req.body);
  const existUser = await User.findOne({ email: req.body.email1 });
  console.log("Email Result.... ", existUser);
  if (!existUser) {
    res.send({ IEmessage: "Invalid Email" });
  } else if (existUser.password === req.body.password1) {
    console.log("Found user....", existUser);
    res.send(existUser);
  } else {
    res.send({ INmessage: "Invalid Credentials" });
  }
});

// app.post("/login", function (req, res) {
//   const user = new User({
//     username: req.body.username,
//     password: req.body.password,
//   });
//   req.login(user, function (err) {
//     if (err) {
//       console.log(err);
//       res.redirect("/login");
//     } else {
//       authenticate("local")(req, res, function (err) {
//         if (err) {
//           console.log(err);
//           res.redirect("/login");
//         } else {
//           res.redirect("/secrets");
//         }
//       });
//     }
//   });
// });

// google popup authentication if successful google redirects to /auth/google/secrets
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// authenticate locally
app.get(
  "/auth/google/customerHome",
  passport.authenticate("google", {
    successRedirect: "/loginCustomer",
    failureRedirect: "http://localhost:3000/login",
  })
);

app.get("/GetUserSession", function (req, res) {
  res.send(userSession);
});

app.post("/register", async function (req, res) {
  console.log("Body sending....", req.body);
  const existUser = await User.findOne({ email: req.body.email1 });
  console.log("Query Result.... ", existUser);
  if (existUser) {
    res.send({ message: "User already exist" });
  } else {
    const user = new User({
      email: req.body.email1,
      password: req.body.password1,
      googleId: "",
      facebookId: "",
      secret: "",
    });
    user.save((err, data) => {
      console.log(err, data);
      if (err) throw err;
      else {
        res.send(data);
      }
    });
  }
});

app.get("/loginCustomer", function (req, res) {
  // here the req object is used as cookie, if it exists then no need for user to login
  console.log(req.isAuthenticated);
  console.log(req.session.passport);
  if (req.isAuthenticated()) {
    //passport method check if user is logged in
    // res.send({ASmessage: "User is already logged in"});
    // var string = encodeURIComponent(JSON.stringify(req.session.passport));
    // res.redirect('http://localhost:3000/?valid=' + string);
    userSession = req.session.passport;
    res.redirect("http://localhost:3000/");
  } else {
    res.redirect("http://localhost:3000/login");
  }
});

// Seller Profile Routes

app.post("/registerSeller", async function (req, res) {
  console.log("Body sending....", req.body);
  const existUser = await Seller.findOne({ licenseID: req.body.license1 });
  console.log("Query Result.... ", existUser);
  if (existUser) {
    res.send({ message: "Seller is already registered" });
  } else {
    const seller = new Seller({
      sellerName: req.body.name1,
      storeName: req.body.stName,
      licenseID: req.body.license1,
      emailID: req.body.email1,
      phoneNo: req.body.phone1,
      password: req.body.password1,
    });
    seller.save((err, data) => {
      console.log(err, data);
      if (err) throw err;
      else {
        res.send(data);
      }
    });
  }
});

app.post("/loginSeller", async function (req, res) {
  console.log("Body sending....", req.body);
  const existUser = await Seller.findOne({ emailID: req.body.email1 });
  console.log("Email Result.... ", existUser);
  if (!existUser) {
    res.send({ IEmessage: "Invalid Email" });
  } else if (existUser.password === req.body.password1) {
    console.log("Found user....", existUser);
    res.send(existUser);
  } else {
    res.send({ INmessage: "Invalid Credentials" });
  }
});

app.get("/logout", function (req, res) {
  userSession = "";
  req.logout();
  //res.redirect("/");
  res.send(userSession);
  // res.redirect("http://localhost:3000/");
});

// Profile Management Routes Ends Here

// Send Mails For Marketing purposes

app.get("/sendMails", async function (req, res) {
  const users = await User.find({});
  const usersEmail = ["alimuhammadghouri0@gmail.com"];
  for (let index = 0; index < users.length; index++) {
    const element =
      users[index].name +
      Math.floor(Math.random() * 100).toString() +
      "@gmail.com";
    usersEmail.push(element);
  }
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shoppinguidef@gmail.com",
      pass: "tuixrooaulypgivw",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let mailOptions = {
    from: "shoppinguidef@gmail.com",
    to: usersEmail,
    subject: "Shopping Guide---find every thing",
    html: `<h2>Find Electronics from your Best stores at single plateform</h2><br><h5>We are here to Help yoo in finding your best Accessery</h5> <br> 
    <img style={width: '50px', height: '50px'} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUP4SE9mf03KtwY3Tl0E2TK_V_R2tGtTneEg2ahvG&s" alt="" />
    <br>
    <div class="footer">
    <div class="container">
      <div class="row">
        <div class="footer-col-1">
          <h3>Download Our App</h3>
          <p>Download App for Android and iso mobile phone.</p>
          <div class="app-logo">
            <img src="https://i.ibb.co/KbPTYYQ/play-store.png" alt="" />
            <img src="https://i.ibb.co/hVM4X2p/app-store.png" alt="" />
          </div>
        </div>

        <div class="footer-col-2">
          <i className="fas fa-meteor nav-logo"></i>
          <h2>ShoppingGuide</h2>
          <p>
            Our Purpose Is To Sustainably Make the Pleasure and Benefits of
            Electronics Accessible to the Many.
          </p>
        </div>

        <div class="footer-col-3">
          <h3>Useful Links</h3>
          <ul>
            <li>Coupons</li>
            <li>Blog Post</li>
            <li>Return Policy</li>
            <li>Join Affiliate</li>
          </ul>
        </div>

        <div class="footer-col-4">
          <h3>Follow us</h3>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>YouTube</li>
          </ul>
        </div>
      </div>
      <hr />
      <p class="copyright">Copyright &copy; 2022 - ShoppingGuide</p>
    </div>
  </div>`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully Send Mail");
    }
  });
  console.log(usersEmail);
});

// Products Search Routes Starts Here

app.post("/search", async function (req, res) {
  console.log("recieved data..... ", req.body.name);
  const foundProduct = await Product.find({
    name: { $regex: req.body.name, $options: "i" },
  });
  console.log("found product......", foundProduct);
  res.send(foundProduct);
});

app.post("/result", async function (req, res) {
  console.log(req.body);
  searchResult = req.body;
  res.send({ message: "successful" });
});

app.post("/send/result", async function (req, res) {
  console.log("Search Result", req.body);
  const sendResult = req.body.searchResult;
  console.log(sendResult);
  searchResult = null;
  res.send(req.body.searchResult);
});

// Recommendations routes

app.get("/getRecProduct/:title", async function (req, res) {
  console.log("Body sending....", req.params);
  const found = await Product.findOne({ name: req.params.title });
  res.set("Access-Control-Allow-Origin", "*");
  console.log("Query Result.... ", found);
  if (found) {
    res.send(found);
  } else {
    res.send({ error: "Not found" });
  }
});

app.get("/getTopProduct", async function (req, res) {
  console.log("not Logged in");
  const products = await Order.aggregate([
    {
      $unwind: "$products",
    },
    {
      $group: {
        _id: "$products.proName",
        sum: {
          $sum: "$products.cartQuantity",
        },
      },
    },
    {
      $sort: {
        sum: -1,
      },
    },
    {
      $group: {
        _id: null,
        top_Products: {
          $push: "$_id",
        },
      },
    },
  ]);
  let topProduct = "";
  let i = 0;
  products.forEach((element) => {
    element.top_Products.forEach((elem) => {
      if (i == 0) {
        topProduct = elem;
      }
      i++;
    });
  });
  console.log(topProduct);
  const product = await Product.findOne({ name: topProduct });
  if (product) {
    console.log(product);
    res.send({ topProduct: product });
  }
});

app.get("/getSuggestions", async function (req, res) {
  console.log("not Logged in");
  const products = await Order.aggregate([
    {
      $unwind: "$products",
    },
    {
      $group: {
        _id: "$products.proName",
        sum: {
          $sum: "$products.cartQuantity",
        },
      },
    },
    {
      $sort: {
        sum: -1,
      },
    },
    {
      $group: {
        _id: null,
        top_Products: {
          $push: "$_id",
        },
      },
    },
  ]);
  res.send(products[0].top_Products);
  // res.send(topProducts)
});

app.get("/getSuggestions/:userName", async function (req, res) {
  console.log(req.params.userName);
  const products = await Order.aggregate([
    {
      $match: { customer: req.params.userName },
    },
    {
      $unwind: "$products",
    },
    {
      $group: {
        _id: "$products.proName",
        sum: {
          $sum: "$products.cartQuantity",
        },
      },
    },
    {
      $sort: {
        sum: -1,
      },
    },
    {
      $group: {
        _id: null,
        top_Products: {
          $push: "$_id",
        },
      },
    },
  ]);
  const topProducts = products[0].top_Products;
  res.send(topProducts);
});

// Products Manage Routes starts Here

app.post("/addProduct", async function (req, res) {
  console.log("Product sending....", req.body.object);
  const existUser = await Product.findOne({ name: req.body.object.name });
  console.log("Query Result.... ", existUser);
  if (existUser) {
    res.send({ message: "Product already Exists" });
  } else {
    const product = new Product({
      name: req.body.object.name,
      description: req.body.object.description,
      price: req.body.object.price,
      image: req.body.object.image,
      category: req.body.object.category,
      brand: req.body.object.brand,
      seller: req.body.object.seller,
      full: req.body.object.full,
    });
    product.save(async (err, data) => {
      console.log(err, data);
      if (err) throw err;
      else {
        let pro = req.body.object.name.split(" ");
        pro = pro[0] + " " + pro[1];
        const products = await Product.find({
          name: { $regex: pro, $options: "$i" },
        });
        console.log(products);
        let i = 0;
        products.forEach(async (element) => {
          const user = await Order.find(
            { "products.proName": element.name },
            { _id: 0, customer: 1 }
          );
          await user.forEach((element1) => {
            if (!emailUsers.includes(element1.customer)) {
              emailUsers.push(element1.customer);
              let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "shoppinguidef@gmail.com",
                  pass: "tuixrooaulypgivw",
                },
                tls: {
                  rejectUnauthorized: false,
                },
              });
              let mailOptions = {
                from: "shoppinguidef@gmail.com",
                to: element1.customer,
                subject: "New Product Added in Inventory Hurry Grab it First",
                html: `<h2>Product added to Inventory of Seller: </h2> ${req.body.object.seller} <br> <img src= ${req.body.object.image}>
              <br>
              <div class="footer">
              <div class="container">
                <div class="row">
                  <div class="footer-col-1">
                    <h3>Download Our App</h3>
                    <p>Download App for Android and iso mobile phone.</p>
                    <div class="app-logo">
                      <img src="https://i.ibb.co/KbPTYYQ/play-store.png" alt="" />
                      <img src="https://i.ibb.co/hVM4X2p/app-store.png" alt="" />
                    </div>
                  </div>
    
                  <div class="footer-col-2">
                    <i className="fas fa-meteor nav-logo"></i>
                    <h2>ShoppingGuide</h2>
                    <p>
                      Our Purpose Is To Sustainably Make the Pleasure and Benefits of
                      Electronics Accessible to the Many.
                    </p>
                  </div>
    
                  <div class="footer-col-3">
                    <h3>Useful Links</h3>
                    <ul>
                      <li>Coupons</li>
                      <li>Blog Post</li>
                      <li>Return Policy</li>
                      <li>Join Affiliate</li>
                    </ul>
                  </div>
    
                  <div class="footer-col-4">
                    <h3>Follow us</h3>
                    <ul>
                      <li>Facebook</li>
                      <li>Twitter</li>
                      <li>Instagram</li>
                      <li>YouTube</li>
                    </ul>
                  </div>
                </div>
                <hr />
                <p class="copyright">Copyright &copy; 2022 - ShoppingGuide</p>
              </div>
            </div>`,
              };

              transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Successfully Send Mail");
                }
              });
              console.log("line 566..", element1.customer);
            }
          });
        });
        res.send(data);
      }
    });
  }
});

app.put("/updateProduct", function (req, res) {
  console.log("Product sending....", req.body.object);
  const filter = {
    name: req.body.object.name,
    seller: req.body.object.seller,
  };
  const update = {
    name: req.body.object.name,
    description: req.body.object.description,
    price: req.body.object.price,
    category: req.body.object.category,
    brand: req.body.object.brand,
    image: req.body.object.image,
  };
  const existUser = Product.updateOne(filter, update, function (err, data) {
    if (err) {
      res.send({ error: "Not Updates" });
    } else {
      res.send({ message: "Product Updated" });
    }
  });
  console.log("Query Result.... ", existUser);
});

app.delete("/delProduct/:title", async function (req, res) {
  console.log("Body sending....", req.params);
  const del = await Product.deleteOne({ name: req.params.title });
  res.set("Access-Control-Allow-Origin", "*");
  console.log("Query Result.... ", del);
  if (del) {
    res.send({ message: "Successfully Deleted" });
  } else {
    res.send({ error: "Not Deleted" });
  }
});

app.post("/viewProduct", async function (req, res) {
  console.log("recieved data..... ", req.body.seller);
  const foundProduct = await Product.find({
    seller: { $regex: req.body.seller, $options: "i" },
  });
  console.log(foundProduct);
  res.send(foundProduct);
});

app.get("/getProducts/:sellerEmail", async function (req, res) {
  console.log("reached to server", req.params.sellerEmail);
  res.set("Access-Control-Allow-Origin", "*");
  const found = await Product.find({ seller: req.params.sellerEmail });
  console.log(found);
  res.send(found);
});

app.get("/getSellerProducts/:sellerEmail", async function (req, res) {
  console.log("reached to server", req.params.sellerEmail);
  res.set("Access-Control-Allow-Origin", "*");
  const found = await Product.aggregate([
    {
      $match: { seller: req.params.sellerEmail },
    },
    {
      $limit: 10,
    },
  ]);
  console.log(found);
  res.send(found);
});

app.get("/getImage/:title", async function (req, res) {
  console.log("Body sending....", req.params);
  const exists = await Product.findOne(
    { name: req.params.title },
    { _id: 0, image: 1 }
  );
  res.set("Access-Control-Allow-Origin", "*");
  console.log("Query Result.... ", exists);
  if (exists) {
    res.send(exists);
  } else {
    res.send({ error: "Not Found" });
  }
});

app.put("/addReview", async function (req, res) {
  console.log("Body sending....", req.body);
  const updated = await Product.updateOne(
    { name: req.body.product },
    { $push: { reviews: req.body.review } }
  );
  const setReview = await Order.updateOne(
    {
      order_id: req.body.order,
      products: { $elemMatch: { proName: req.body.product } },
    },
    {
      $set: {
        "products.$.review": true,
      },
    }
  );
  console.log("Query Result.... ", updated);
  if ((updated, setReview)) {
    res.send(JSON.stringify({ message: "Successfully reviewed" }));
  } else {
    res.send({ error: "Not updated" });
  }
});

// Products Routes Ends

// Admin / Blogs Routes Starts Here
// Customer Routes Start Here

app.get("/getAllCustomers", async function (req, res) {
  console.log("reached to server");
  res.set("Access-Control-Allow-Origin", "*");
  const found = await User.countDocuments({ role: "customer" });
  console.log(found);
  res.send({ count: found });
});

app.get("/getProfile/:customer", async function (req, res) {
  console.log("reached to server");
  res.set("Access-Control-Allow-Origin", "*");
  const found = await User.find({ email: req.params.customer });
  console.log(found);
  res.send(found);
});

app.put("/updateProfile", async function (req, res) {
  console.log("Body sending....", req.body.profile);
  const updated = await User.updateOne(
    { email: req.body.profile.email },
    {
      $set: {
        name: req.body.profile.name,
        phone: req.body.profile.phone,
        city: req.body.profile.city,
        password: req.body.profile.password,
        role: req.body.profile.role,
      },
    }
  );
  console.log("Query Result.... ", updated);
  if (updated) {
    res.send(JSON.stringify({ message: "Successfully Updated" }));
  } else {
    res.send({ error: "Not updated" });
  }
});

app.get("/getCustomer", async function (req, res) {
  console.log("reached to server");
  res.set("Access-Control-Allow-Origin", "*");
  const found = await User.find({ role: "customer" });
  console.log(found);
  res.send(found);
});

app.delete("/delCustomer", async function (req, res) {
  console.log("reached to server", req.body);
  res.set("Access-Control-Allow-Origin", "*");
  const found = await User.deleteOne({ email: req.body.email });
  if (found) {
    console.log("deleted");
    res.send({ message: "deleted" });
  } else {
    res.send({ message: "Not found" });
  }
});

// orders Routes starts here

app.get("/getOrders/:customerName", async function (req, res) {
  console.log(req.params);
  res.set("Access-Control-Allow-Origin", "*");
  const found = await Order.find({ customer: req.params.customerName });
  console.log(found);
  res.send(found);
});

app.get("/getOrders", async function (req, res) {
  console.log("reached to server");
  res.set("Access-Control-Allow-Origin", "*");
  const found = await Order.find({});
  console.log(found);
  res.send(found);
});

app.get("/getSellerOrders/:sellerName", async function (req, res) {
  console.log("reached to server");
  res.set("Access-Control-Allow-Origin", "*");
  const found = await Order.find({ seller: req.params.sellerName });
  console.log(found);
  res.send(found);
});

app.get("/getAllOrders", async function (req, res) {
  console.log("reached to server");
  res.set("Access-Control-Allow-Origin", "*");
  const found = await Order.countDocuments({});
  console.log(found);
  res.send({ count: found });
});

// Sellers Routes Starts here

app.get("/getSellers", async function (req, res) {
  console.log("reached to server");
  res.set("Access-Control-Allow-Origin", "*");
  const found = await Seller.find({});
  console.log(found);
  res.send(found);
});

app.get("/getAllSellers", async function (req, res) {
  console.log("reached to server");
  res.set("Access-Control-Allow-Origin", "*");
  const found = await Seller.countDocuments({});
  console.log(found);
  res.send({ count: found });
});

app.get("/getSellerProfile/:seller", async function (req, res) {
  console.log("reached to server", req.params.seller);
  res.set("Access-Control-Allow-Origin", "*");
  const found = await Seller.find({ emailID: req.params.seller });
  console.log(found);
  res.send(found);
});

app.put("/updateSellerProfile", async function (req, res) {
  console.log("Body sending....", req.body.profile);
  const updated = await Seller.updateOne(
    { emailID: req.body.profile.emailID },
    {
      $set: {
        sellerName: req.body.profile.name,
        phoneNo: req.body.profile.phoneNo,
        password: req.body.profile.password,
      },
    }
  );
  console.log("Query Result.... ", updated);
  if (updated) {
    res.send(JSON.stringify({ message: "Successfully Updated" }));
  } else {
    res.send({ error: "Not updated" });
  }
});

app.delete("/delSeller", async function (req, res) {
  console.log("reached to server", req.body);
  res.set("Access-Control-Allow-Origin", "*");
  const found = await Seller.deleteOne({ emailID: req.body.email });
  if (found) {
    console.log("deleted");
    res.send({ message: "deleted" });
  } else {
    res.send({ message: "Not found" });
  }
});

app.get("/sellerRanks", async function (req, res) {
  console.log("reached to server");
  res.set("Access-Control-Allow-Origin", "*");
  const found = await Seller.find({}, { _id: 0, sellerName: 1, rank: 1 });
  console.log(found);
  res.send(found);
});

app.get("/sellerSales", async function (req, res) {
  console.log("reached to server");
  res.set("Access-Control-Allow-Origin", "*");
  const found = await Order.aggregate([
    {
      $group: { _id: "$seller", sales: { $sum: "$Total" } },
    },
    // {
    //   $sort: {
    //     "$Total": 1
    //   },
    // },
  ]);
  console.log(found);
  res.send(found);
});

// Delivery Boy Routes start here

app.post("/registerDel", async function (req, res) {
  console.log("Body sending....", req.body);
  const existUser = await Delivery.findOne({ email: req.body.object.email });
  console.log("Query Result.... ", existUser);
  if (existUser) {
    res.send({ message: "User already exist" });
  } else {
    const delivery = new Delivery({
      name: req.body.object.name,
      email: req.body.object.email,
      address: req.body.object.address,
      phone: req.body.object.phone,
      city: req.body.object.city,
      password: req.body.object.password,
      image: req.body.object.image,
    });
    delivery.save((err, data) => {
      console.log(err, data);
      if (err) throw err;
      else {
        res.send(data);
      }
    });
  }
});

app.delete("/delDelivery", async function (req, res) {
  console.log("reached to server", req.body);
  res.set("Access-Control-Allow-Origin", "*");
  const found = await Delivery.deleteOne({ email: req.body.email });
  if (found) {
    console.log("deleted");
    res.send({ message: "deleted" });
  } else {
    res.send({ message: "Not found" });
  }
});

app.get("/getDelivery", async function (req, res) {
  console.log("reached to server");
  res.set("Access-Control-Allow-Origin", "*");
  const found = await Delivery.find({});
  console.log(found);
  res.send(found);
});

// Blogs Routes starts here

app.get("/getBlogs", async function (req, res) {
  console.log("reached to server");
  res.set("Access-Control-Allow-Origin", "*");
  const found = await Blog.find({});
  console.log(found);
  res.send(found);
});

app.post("/addBlog", async function (req, res) {
  console.log("Body sending....", req.body);
  const exists = await Blog.findOne({ title: req.body.blog.title });
  console.log("Query Result.... ", exists);
  if (exists) {
    res.send({ message: "Blog with same title already exist" });
  } else {
    const blog = new Blog({
      title: req.body.blog.title,
      content: req.body.blog.content,
      date: req.body.blog.date,
    });
    blog.save((err, data) => {
      console.log(err, data);
      if (err) throw err;
      else {
        res.send(data);
      }
    });
  }
});

app.put("/editBlog", async function (req, res) {
  console.log("Body sending....", req.body);
  const updated = await Blog.updateOne(
    { title: req.body.blog.title },
    {
      $set: {
        content: req.body.blog.content,
        date: req.body.blog.date,
      },
    }
  );
  console.log("Query Result.... ", updated);
  if (updated) {
    res.send({ message: "Successfully Updated" });
  } else {
    res.send({ error: "Not updated" });
  }
});

app.delete("/delBlogs/:title", async function (req, res) {
  console.log("Body sending....", req.params);
  const del = await Blog.deleteOne({ title: req.params.title });
  res.set("Access-Control-Allow-Origin", "*");
  console.log("Query Result.... ", del);
  if (del) {
    res.send({ message: "Successfully Deleted" });
  } else {
    res.send({ error: "Not Deleted" });
  }
});

// Sales and Discounts Routes

app.post("/addSale", async function (req, res) {
  console.log("Body sending....", req.body.obj);
  const exists = await Sale.findOne({ code: req.body.obj.code });
  console.log("Query Result.... ", exists);
  if (exists) {
    res.send({ message: "Sale with same code already exist" });
  } else {
    const sale = new Sale({
      title: req.body.obj.title,
      code: req.body.obj.code,
      products: req.body.obj.products,
      price: req.body.obj.price,
      discount_per: req.body.obj.discount,
      startDate: req.body.obj.start,
      endDate: req.body.obj.end,
      seller: req.body.obj.seller,
    });
    sale.save(async (err, data) => {
      console.log(err, data);
      if (err) throw err;
      else {
        const users = await User.find({});
        const usersEmail = [];
        console.log(users);
        users.forEach((element) => {
          usersEmail.push(element.email);
        });
        console.log(usersEmail);
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "shoppinguidef@gmail.com",
            pass: "tuixrooaulypgivw",
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
        let mailOptions = {
          from: "shoppinguidef@gmail.com",
          to: usersEmail,
          subject: `Enjoy the sale ${data.discount_per}%off on selected products`,
          html: `<h2>Hurry Up and being the one of them </h2> <br> <img src= ''>
          <br>
          <div class="footer">
          <div class="container">
            <div class="row">
              <div class="footer-col-1">
                <h3>Download Our App</h3>
                <p>Download App for Android and iso mobile phone.</p>
                <div class="app-logo">
                  <img src="https://i.ibb.co/KbPTYYQ/play-store.png" alt="" />
                  <img src="https://i.ibb.co/hVM4X2p/app-store.png" alt="" />
                </div>
              </div>

              <div class="footer-col-2">
                <i className="fas fa-meteor nav-logo"></i>
                <h2>ShoppingGuide</h2>
                <p>
                  Our Purpose Is To Sustainably Make the Pleasure and Benefits of
                  Electronics Accessible to the Many.
                </p>
              </div>

              <div class="footer-col-3">
                <h3>Useful Links</h3>
                <ul>
                  <li>Coupons</li>
                  <li>Blog Post</li>
                  <li>Return Policy</li>
                  <li>Join Affiliate</li>
                </ul>
              </div>

              <div class="footer-col-4">
                <h3>Follow us</h3>
                <ul>
                  <li>Facebook</li>
                  <li>Twitter</li>
                  <li>Instagram</li>
                  <li>YouTube</li>
                </ul>
              </div>
            </div>
            <hr />
            <p class="copyright">Copyright &copy; 2022 - ShoppingGuide</p>
          </div>
        </div>`,
        };

        transporter.sendMail(mailOptions, function (err, data) {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully Send Mail");
          }
        });
        res.send(data);
      }
    });
  }
});

app.put("/editSale", function (req, res) {
  console.log("Product sending....", req.body.obj);
  const filter = {
    title: req.body.obj.title,
    seller: req.body.obj.seller,
  };
  const update = {
    code: req.body.obj.code,
    products: req.body.obj.products,
    price: req.body.obj.price,
    discount_per: req.body.obj.discount,
    startDate: req.body.obj.start,
    endDate: req.body.obj.end,
  };
  const existUser = Sale.updateOne(filter, update, function (err, data) {
    if (err) {
      res.send({ error: "Not Updates" });
    } else {
      res.send({ message: "Sale Details Updated" });
    }
  });
  console.log("Query Result.... ", existUser);
});

app.get("/getSales/:sellerEmail", async function (req, res) {
  console.log("reached to server");
  res.set("Access-Control-Allow-Origin", "*");
  const found = await Sale.find({ seller: req.params.sellerEmail });
  console.log(found);
  res.send(found);
});

app.get("/getSales", async function (req, res) {
  console.log("reached to server");
  res.set("Access-Control-Allow-Origin", "*");
  const date = new Date();
  console.log(date);
  const found = await Sale.find({
    startDate: { $lte: date },
    endDate: { $gte: date },
  });
  console.log(found);
  res.send(found);
});

app.get("/getPromo", async function (req, res) {
  console.log("reached to server");
  res.set("Access-Control-Allow-Origin", "*");
  const date = new Date();
  const found = await Promo.find({
    startDate: { $lte: date },
    endDate: { $gte: date },
  });
  console.log(found);
  res.send(found);
});

app.delete("/delSale/:code", async function (req, res) {
  console.log("Body sending....", req.params);
  const del = await Sale.deleteOne({ code: req.params.code });
  res.set("Access-Control-Allow-Origin", "*");
  console.log("Query Result.... ", del);
  if (del) {
    res.send({ message: "Successfully Deleted" });
  } else {
    res.send({ error: "Not Deleted" });
  }
});

app.post("/addPromo", async function (req, res) {
  console.log("Body sending....", req.body.obj);
  const exists = await Promo.findOne({
    code: req.body.obj.code,
    seller: req.body.obj.seller,
  });
  console.log("Query Result.... ", exists);
  if (exists) {
    res.send({ message: "Same Promo code already exist" });
  } else {
    const promo = new Promo({
      title: req.body.obj.title,
      code: req.body.obj.code,
      discount_per: req.body.obj.discount,
      startDate: req.body.obj.start,
      endDate: req.body.obj.end,
      seller: req.body.obj.seller,
    });
    promo.save(async (err, data) => {
      console.log(err, data);
      if (err) throw err;
      else {
        const users = await User.find({});
        const usersEmail = [];
        console.log(users);
        users.forEach((element) => {
          usersEmail.push(element.email);
        });
        console.log(usersEmail);
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "shoppinguidef@gmail.com",
            pass: "tuixrooaulypgivw",
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
        let mailOptions = {
          from: "shoppinguidef@gmail.com",
          to: usersEmail,
          subject: `Enjoy the sale ${data.discount_per}%off on selected products`,
          html: `<h2>Hurry Up and being the one of them </h2> <br> <img src= ''>
          <br>
          <div class="footer">
          <div class="container">
            <div class="row">
              <div class="footer-col-1">
                <h3>Download Our App</h3>
                <p>Download App for Android and iso mobile phone.</p>
                <div class="app-logo">
                  <img src="https://i.ibb.co/KbPTYYQ/play-store.png" alt="" />
                  <img src="https://i.ibb.co/hVM4X2p/app-store.png" alt="" />
                </div>
              </div>

              <div class="footer-col-2">
                <i className="fas fa-meteor nav-logo"></i>
                <h2>ShoppingGuide</h2>
                <p>
                  Our Purpose Is To Sustainably Make the Pleasure and Benefits of
                  Electronics Accessible to the Many.
                </p>
              </div>

              <div class="footer-col-3">
                <h3>Useful Links</h3>
                <ul>
                  <li>Coupons</li>
                  <li>Blog Post</li>
                  <li>Return Policy</li>
                  <li>Join Affiliate</li>
                </ul>
              </div>

              <div class="footer-col-4">
                <h3>Follow us</h3>
                <ul>
                  <li>Facebook</li>
                  <li>Twitter</li>
                  <li>Instagram</li>
                  <li>YouTube</li>
                </ul>
              </div>
            </div>
            <hr />
            <p class="copyright">Copyright &copy; 2022 - ShoppingGuide</p>
          </div>
        </div>`,
        };

        transporter.sendMail(mailOptions, function (err, data) {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully Send Mail");
          }
        });
        res.send(data);
      }
    });
  }
});

app.get("/applyPromo/:code/:seller", async function (req, res) {
  console.log("reached to server", req.params);
  res.set("Access-Control-Allow-Origin", "*");
  const date = new Date();
  const found = await Promo.findOne(
    {
      startDate: { $lte: date },
      endDate: { $gte: date },
      code: req.params.code,
      seller: req.params.seller,
    },
    {
      _id: 0,
      discount_per: 1,
    }
  );
  console.log(found);
  if (found) {
    res.send({ discount: found.discount_per });
  } else {
    res.send({ message: "..Code Expired Try Another.." });
  }
});

// Admin login Route

app.post("/loginAdmin", async function (req, res) {
  console.log(req.body);
  res.set("Access-Control-Allow-Origin", "*");
  const existUser = await User.findOne({
    email: req.body.email,
    role: "admin",
  });
  console.log("Email Result.... ", existUser);
  if (!existUser) {
    res.send({ IEmessage: "Invalid Email" });
  } else if (existUser.password === req.body.password) {
    console.log("Found user....", existUser);
    res.send({ message: "Logged In" });
  } else {
    res.send({ INmessage: "Invalid Credentials" });
  }
});

// homeshopping webscraping
app.post("/homeshopping", function (req, res) {
  const pythonChild = spawn("python", ["homeshopping.py", req.body.name]);
  const products = [];

  pythonChild.stdout.on("data", (data) => {
    products.push(data.toString());
  });
  pythonChild.stderr.on("data", (data) => {
    console.log("stderr: " + data);
  });
  pythonChild.on("close", (code) => {
    res.send(JSON.parse(products[0]));
  });
});

// daraz webscraping
app.post("/Daraz", async function (req, res) {
  const pythonChild = await spawn("python", ["Daraz.py", req.body.name]);
  const products = [];

  pythonChild.stdout.on("data", (data) => {
    products.push(data.toString());
  });
  pythonChild.stderr.on("data", (data) => {
    console.log("stderr: " + data);
  });
  pythonChild.on("close", (code) => {
    res.send(JSON.parse(products[0]));
  });
});

// mega webscraping
app.post("/mega", function (req, res) {
  const pythonChild = spawn("python", ["mega.py", req.body.name]);
  const products = [];

  pythonChild.stdout.on("data", (data) => {
    products.push(data.toString());
  });
  pythonChild.stderr.on("data", (data) => {
    console.log("stderr: " + data);
  });
  pythonChild.on("close", (code) => {
    res.send(JSON.parse(products[0]));
  });
});

// sorting //

app.post("/AddSort", async function (req, res) {
  // console.log("adding.......",req.body.data);
  Scrapped.insertMany(req.body.data, (err, docs) => {
    if (err) {
      console.log(err);
    }
  });
  res.send({ message: "uploaded" });
});

app.get("/getSortLH", async function (req, res) {
  const found = await Scrapped.find()
    .sort({ price: 1 })
    .exec(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        // console.log("sorted data.......", data);
        const removed = Scrapped.deleteMany({}, function (err, success) {
          if (err) {
            console.log(err);
          }
        });
        res.send(data);
      }
    });
});

app.get("/getSortHL", async function (req, res) {
  const found = await Scrapped.find()
    .sort({ price: -1 })
    .exec(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        const removed = Scrapped.deleteMany({}, function (err, success) {
          if (err) {
            console.log(err);
          }
        });
        res.send(data);
      }
    });
});

app.get("/getSortAZ", async function (req, res) {
  const found = await Scrapped.find()
    .sort({ name: 1 })
    .exec(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        const removed = Scrapped.deleteMany({}, function (err, success) {
          if (err) {
            console.log(err);
          }
        });
        res.send(data);
      }
    });
});

app.get("/getSortZA", async function (req, res) {
  const found = await Scrapped.find()
    .sort({ name: -1 })
    .exec(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        const removed = Scrapped.deleteMany({}, function (err, success) {
          if (err) {
            console.log(err);
          }
        });
        res.send(data);
      }
    });
});
//// sorting end ////

/// Scrape Product details ///
app.post("/ProductDetails", async function (req, res) {
  console.log("bb.....", req.body);
  console.log("store....", req.body.store);
  switch (req.body.store) {
    case "HomeShopping.pk":
      const pythonChild = await spawn("python", [
        "homeDetails.py",
        req.body.url,
      ]);
      const items = [];
      pythonChild.stdout.on("data", (data) => {
        items.push(data.toString());
      });
      pythonChild.stderr.on("data", (data) => {
        console.log("stderr: " + data);
      });
      pythonChild.on("close", (code) => {
        console.log("here ok........", JSON.parse(items[0]));
        res.send(JSON.parse(items[0]));
      });
      break;

    case "Daraz.pk":
      const pythonChild1 = await spawn("python", [
        "darazDetails.py",
        req.body.url,
      ]);
      const items1 = [];
      pythonChild1.stdout.on("data", (data) => {
        items1.push(data.toString());
      });
      pythonChild1.stderr.on("data", (data) => {
        console.log("stderr: " + data);
      });
      pythonChild1.on("close", (code) => {
        console.log("here..daraz......", JSON.parse(items1[0]));
        res.send(JSON.parse(items1[0]));
      });
      break;

    default: //mega.pk has no reviews
      console.log("no such store available");
      const newDetails = {
        image: [],
        review: [],
      };
      console.log(newDetails);
      const itemMega = [];
      itemMega.push(newDetails);
      console.log(itemMega[0]);
      res.send(itemMega[0]);
      break;
  }
});

/// get Sentiment Score///
app.post("/getSentimentScore", async function (req, res) {
  console.log("here.2.....", req.body.data); //req.body
  let review = req.body.data; //req.body
  let item = [];
  const pythonChild = await spawn("python", [
    "sentimentModelLoad.py",
    JSON.stringify(review),
  ]); //sentiment.py
  pythonChild.stdout.on("data", (data) => {
    item.push(data.toString("utf-8"));
  });
  pythonChild.stderr.on("data", (data) => {
    console.log("stderr: " + data);
  });
  pythonChild.on("close", (code) => {
    console.log("item close.....", item);
  });
  pythonChild.on("exit", (code) => {
    console.log("item exit.....", item);
    res.send(JSON.parse(item[0]));
  });
});

// Payments Handling Route

app.post("/create-checkout-session", async (req, res) => {
  console.log("reached to checkout", req.body);
  let coupon = "";
  if (req.body.discount === 25) {
    coupon = "dqm5T2NO";
  } else if (req.body.discount === 50) {
    coupon = "HOLyz4bK";
  } else if (req.body.discount === 70) {
    coupon = "hQiE1jys";
  } else if (req.body.discount === 75) {
    coupon = "64Tz2kOD";
  } else if (req.body.discount === 80) {
    coupon = "gsKss3ZY";
  } else if (req.body.discount === 10) {
    coupon = "NIRX4t3v";
  } else if (req.body.discount === 0) {
    coupon = "rydtzfSg";
  }
  const line_items = req.body.shopCart.map((item) => {
    return {
      price_data: {
        currency: "pkr",
        product_data: {
          name: item.product,
          images: [item.image],
        },
        unit_amount: Math.floor(item.price.discount) * 100,
      },
      quantity: item.cartQuantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    discounts: [
      {
        coupon: coupon,
      },
    ],
    success_url: "http://localhost:3000/checkout-success",
    cancel_url: "http://localhost:3000/shoppingCart",
  });
  res.send({ url: session.url });
});

// order Management Route

app.post("/saveOrder", async function (req, res) {
  console.log("Body sending....", req.body.orderDetails);
  var exists = await Order.findOne({
    order_id: req.body.orderDetails.order_id,
  });
  console.log("Query Result.... ", exists);
  while (exists) {
    let order_id = "SG" + Math.floor(Math.random() * (10000 - 1 + 1) + 1);
    exists = await Order.findOne({ order_id: order_id });
    console.log("Query Result.... ", exists);
  }
  console.log("success");
  const order = new Order({
    order_id: req.body.orderDetails.order_id,
    products: req.body.orderDetails.products,
    customer: req.body.orderDetails.customer,
    date: req.body.orderDetails.date,
    Total: req.body.orderDetails.Total,
    pay_meth: req.body.orderDetails.pay_meth,
    status: req.body.orderDetails.status,
    seller: req.body.orderDetails.seller,
    quantity: req.body.orderDetails.quantity,
  });
  order.save(async (err, data) => {
    console.log(data);
    if (err) throw err;
    else {
      const notify = await Notification.findOne({
        notifyID: req.body.orderDetails.order_id,
      });
      if (!notify) {
        const notify1 = new Notification({
          notifyID: req.body.orderDetails.order_id,
          message: "New Order Booked",
          seller: req.body.orderDetails.seller,
        });
        notify1.save((err, data) => {
          if (err) {
            throw err;
          }
        });
      }
      res.send({ success: "saved" });
    }
  });
});

// Product Comparison

app.put("/addCompare", async function (req, res) {
  console.log("userData: ", req.body);
  let newProd = true;
  const foundUser = await User.findOne({ email: req.body.email });
  console.log("Found Email .... ", foundUser);
  if (!foundUser) {
    res.send("Not found");
  }

  for (let i = 0; i < foundUser.compare.length; i++) {
    if (foundUser.compare[i].hub) {
      if (foundUser.compare[i].data.prod._id === req.body.data.prod._id) {
        newProd = false;
        break;
      }
    }
  }

  for (let i = 0; i < foundUser.compare.length; i++) {
    if (!foundUser.compare[i].hub) {
      //same scrappped products checking
      if (foundUser.compare[i].data.prod.url === req.body.data.prod.url) {
        newProd = false;
        break;
      }
    }
  }

  if (newProd) {
    foundUser.compare.push(req.body);
    await foundUser.save();
    res.send("successful");
  } else {
    res.send("product already added");
  }
});

app.post("/getCompare", async function (req, res) {
  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) {
    res.send("Not found");
  } else {
    console.log("found user.....", foundUser.compare);
    res.send(foundUser.compare);
  }
});

app.post("/delCompare", async function (req, res) {
  let user = req.body.prod.data;
  let userComp = await User.findOne({
    email: req.body.prod.email,
  });
  if (userComp) {
    let data = userComp.compare;
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      if (data[i].data.prod.item === user.prod.item) {
        data.splice(i, 1);
      }
    }
    userComp.compare = data;
    await userComp.save();
    res.send({ success: "product deleted" });
  }
});

///WishList
app.put("/addWishList", async function (req, res) {
  console.log("userData: ", req.body);
  let newProd = true;
  const foundUser = await User.findOne({ email: req.body.email });
  console.log("Found Email .... ", foundUser);
  if (!foundUser) {
    res.send("Not found");
  }

  for (let i = 0; i < foundUser.wishlist.length; i++) {
    if (foundUser.wishlist[i].hub) {
      if (foundUser.wishlist[i].data.prod._id === req.body.data.prod._id) {
        newProd = false;
        break;
      }
    }
  }

  for (let i = 0; i < foundUser.wishlist.length; i++) {
    if (!foundUser.wishlist[i].hub) {
      //same scrappped products checking
      if (foundUser.wishlist[i].data.prod.url === req.body.data.prod.url) {
        newProd = false;
        break;
      }
    }
  }

  if (newProd) {
    foundUser.wishlist.push(req.body);
    await foundUser.save();
    res.send("successful");
  } else {
    res.send("product already added");
  }
});

app.post("/getWishList", async function (req, res) {
  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) {
    res.send("User Not found");
  } else {
    // console.log("found user.....", foundUser.wishlist);
    res.send(foundUser.wishlist);
  }
});

app.post("/getWishListLenght", async function (req, res) {
  const foundUser = await User.findOne({ email: req.body.email });
  let num = 0;
  if (!foundUser) {
    num = 0;
    res.send({ num: num });
  } else {
    console.log(foundUser.wishlist.length);
    num = foundUser.wishlist.length;
    res.json({ num: num });
  }
});

app.post("/delWish", async function (req, res) {
  let user = req.body.prod.data;
  let userWish = await User.findOne({
    email: req.body.prod.email,
  });
  if (userWish) {
    let data = userWish.wishlist;
    for (let i = 0; i < data.length; i++) {
      if (data[i].data.item === user.item) {
        data.splice(i, 1);
      }
    }
    userWish.wishlist = data;
    await userWish.save();
    res.send({ success: "product deleted" });
  }
});

// Notifications
app.post("/getDarazNotifications", async function (req, res) {
  // console.log("found user1.....", foundUser.wishlist);
  // const changes = []
  // for (let i = 0; i <foundUser.wishlist.length; i++){
  //   if (!foundUser.wishlist[i].hub) {
  //     if (foundUser.wishlist[i].data.prod.store === "HomeShopping.pk") {
  //       let pythonChild = await spawn("python", [
  //         "homeDetails.py",
  //         foundUser.wishlist[i].data.prod.url,
  //       ]);
  //       let items = [];
  //       pythonChild.stdout.on("data", (data) => {
  //         items.push(data.toString());
  //       });
  //       pythonChild.stderr.on("data", (data) => {
  //         console.log("stderr: " + data);
  //       });
  //       pythonChild.on("close", (code) => {
  //         console.log("here ok........", JSON.parse(items[0]));
  //         //res.send(JSON.parse(items[0]));
  //         changes.push(JSON.parse(items[0]))
  //       });
  //       pythonChild.on("exit", (code) => {
  //         console.log("item exit.....", items);
  //         //res.send(JSON.parse(items[0]));
  //         changes.push(JSON.parse(items[0]))
  //       });
  //     }
  //     if (foundUser.wishlist[i].data.prod.store === "Daraz.pk") {
  //       let pythonChild1 = await spawn("python", [
  //         "darazNotification.py",
  //         foundUser.wishlist[i].data.prod.url,
  //       ]);
  //       let items1 = [];
  //       pythonChild1.stdout.on("data", (data) => {
  //         items1.push(data.toString());
  //       });
  //       pythonChild1.stderr.on("data", (data) => {
  //         console.log("stderr: " + data);
  //       });
  //       pythonChild1.on("close", (code) => {
  //         console.log("here..daraz......", JSON.parse(items1[0]));
  //         changes.push(JSON.parse(items1[0]))
  //         //res.send(JSON.parse(items1[0]));
  //       });
  //       pythonChild1.on("exit", (code) => {
  //         console.log("item exit.....", items1);
  //         //res.send(JSON.parse(items1[0]));
  //         changes.push(JSON.parse(items1[0]))
  //       });
  //     }
  //     if (foundUser.wishlist[i].data.prod.store === "Mega.pk") { //mega.pk has no reviews
  //       console.log("no such store available");
  //       let newDetails = {
  //         image: [],
  //         review: [],
  //       };
  //       console.log(newDetails);
  //       let itemMega = [];
  //       itemMega.push(newDetails);
  //       console.log(itemMega[0]);
  //       //res.send(itemMega[0]);
  //       changes.push(itemMega[0])
  //     }
  //   }
  // }
  const items1 = [];
  console.log("hello");
  console.log("okk.....", req.body.WishProduct);
  if (req.body.WishProduct.data.prod.store === "Daraz.pk") {
    const pythonChild1 = await spawn("python", [
      "darazNotification.py",
      req.body.WishProduct.data.prod.url,
    ]);
    pythonChild1.stdout.on("data", (data) => {
      items1.push(data.toString());
    });
    pythonChild1.stderr.on("data", (data) => {
      console.log("stderr: " + data);
    });
    pythonChild1.on("close", (code) => {
      console.log("here..daraz......", JSON.parse(items1[0]));
      //res.send(JSON.parse(items1[0]));
    });
    pythonChild1.on("exit", (code) => {
      console.log("item exit.....", items1);
      res.send(JSON.parse(items1[0]));
    });
  }

  if (req.body.WishProduct.data.prod.store === "HomeShopping.pk") {
    const pythonChild = await spawn("python", [
      "homeNotification.py",
      req.body.WishProduct.data.prod.url,
    ]);
    pythonChild.stdout.on("data", (data) => {
      items1.push(data.toString());
    });
    pythonChild.stderr.on("data", (data) => {
      console.log("stderr: " + data);
    });
    pythonChild.on("close", (code) => {
      console.log("here ok........", JSON.parse(items1[0]));
      // res.send(JSON.parse(items1[0]));
    });
    pythonChild.on("exit", (code) => {
      console.log("item exit.....", items1);
      res.send(JSON.parse(items1[0]));
    });
  }

  if (req.body.WishProduct.data.prod.store === "Mega.pk") {
    const pythonChild = await spawn("python", [
      "megaNotification.py",
      req.body.WishProduct.data.prod.url,
    ]);
    pythonChild.stdout.on("data", (data) => {
      items1.push(data.toString());
    });
    pythonChild.stderr.on("data", (data) => {
      console.log("stderr: " + data);
    });
    pythonChild.on("close", (code) => {
      console.log("here ok........", JSON.parse(items1[0]));
      // res.send(JSON.parse(items1[0]));
    });
    pythonChild.on("exit", (code) => {
      console.log("item exit.....", items1);
      res.send(JSON.parse(items1[0]));
    });
  }
});

app.post("/getLocalNotifications", async function (req, res) {
  console.log(req.body.WishProduct + "line... 2037");
  const product = await Product.findOne({
    name: req.body.WishProduct.data.prod.name,
    seller: req.body.WishProduct.data.prod.seller,
  });
  console.log(product, "line-2039");
  if (product.price !== req.body.WishProduct.data.prod.price) {
    res.send(product);
  } else {
    res.send({ message: "No Changes" });
  }
});

app.post("/getOrderNotifications", async function (req, res) {
  console.log(req.body.seller);
  const order = await Notification.find({
    seller: req.body.seller,
  });
  if (order.length > 0) {
    res.send(order);
  } else {
    res.send({ message: "No Notifications" });
  }
});

app.get("/getAdminNotifications", async function (req, res) {
  console.log(req.body.seller);
  const order = await Notification.find({});
  if (order.length > 0) {
    res.send(order);
  } else {
    res.send({ message: "No Notifications" });
  }
});

app.delete("/deleteNotifications/:notifyID/:seller", async function (req, res) {
  console.log(req.params.notifyID, req.params.seller);
  const order = await Notification.deleteOne({
    seller: req.params.seller,
    notifyID: req.params.notifyID,
  });
  if (order) {
    console.log(order);
    res.send({ success: "deleted" });
  } else {
    res.send({ error: "not deleted" });
  }
});

app.delete("/deleteAdminNotifications/:notifyID", async function (req, res) {
  console.log(req.params.notifyID);
  const order = await Notification.deleteOne({
    notifyID: req.params.notifyID,
  });
  if (order) {
    console.log(order);
    res.send({ success: "deleted" });
  } else {
    res.send({ error: "not deleted" });
  }
});

app.listen(8000, function () {
  console.log("Server running on port:8000");
});
