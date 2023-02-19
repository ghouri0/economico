import React from "react";
import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

export default function Addproduct() {
  const [loading, setLoading] = useState(false);
  const [Product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    image: null,
    category: "",
    brand: "",
  });

  const navigate = useNavigate();

  const [priceerr, setPriceerr] = useState("");
  const [titleerr, setTitleerr] = useState("");
  const [deserr, setdeserr] = useState("");
  const [imageerr, setimageerr] = useState("");

  const handleTitle = (e) => {
    const value = e.target.value;
    if (value === "") {
      setTitleerr("Title not be null");
    } else {
      setTitleerr("");
      Product.title = value;
    }
  };
  const handleDesc = (e) => {
    const value = e.target.value;
    if (value === "") {
      setdeserr("Add product specifications");
    } else {
      setdeserr("");
      Product.description = value;
    }
  };

  const handlePrice = (e) => {
    const value = e.target.value;
    if (value <= 0 || value === null) {
      setPriceerr("Price must be positive");
    } else {
      setPriceerr("");
      Product.price = value;
    }
  };

  const handleImage = (e) => {
    console.log(e.target.files[0]);
    const value = e.target.files[0];
    if (value === null) {
      setimageerr("Price must be positive");
    } else {
      setimageerr("");
      Product.image = value;
    }
  };

  const handleCategory = (e) => {
    const value = e.target.value;
    Product.category = value;
    alert(Product.category);
  };

  const handleBrand = (e) => {
    const value = e.target.value;
    Product.brand = value;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", Product.image);
    formData.append("upload_preset", "e-commerce");
    const imageData = await axios.post(
      "https://api.cloudinary.com/v1_1/shopping-fyp/image/upload",
      formData
    );
    console.log("Image Data", imageData.data.url);
    const { title, description, price, image, category, brand } = Product;
    const data = {
      name: title,
      des: description,
      price: price,
      img: imageData.data.url,
      category: category,
      company: brand,
    };
    const result = await axios.post("/addProduct", data);
    console.log("res....", result.data);
    console.log(result.data.message);
    setLoading(false);
    if (result.data.message) {
      alert("Product already exists");
      navigate("/addProduct");
    } else {
      alert("Product Uploaded");
      navigate("/addProduct");
    }
    console.log(result);
  };

  return (
    // <div className='container-fluid'>
    //     <div className='row' style={{margin: 'auto'}}>
    //         <div className='col-md-12' style={{ backgroundColor: 'rgba(44, 58, 85, 0.75)', height: '900px'}}>
    //             <br />
    //             <form action="" method="POST" className='form_cust' style={{width: '600px', height: '850px'}}>
    //                 <h4 className='title1'>Product Details</h4>
    //                 <hr />
    //                 <label htmlFor="" className='label'>Title</label>
    //                 <input type="text" className='form-control in' placeholder='Title' required onChange={handleTitle} />
    //                 <div className='error'>
    //                     <p>{titleerr}</p>
    //                 </div>
    //                 <label htmlFor="" className='label'>Description</label>
    //                 <input type="textArea" name="" id="" className='form-control in' placeholder='Product specifications' required onChange={handleDesc} />
    //                 <div className='error'>
    //                     <p>{deserr}</p>
    //                 </div>
    //                 <label htmlFor="" className='label'>Price</label>
    //                 <input type='number' className='form-control in' placeholder='Price' onChange={handlePrice} required />
    //                 <div className='error'>
    //                     <p>{priceerr}</p>
    //                 </div>
    //                 <label htmlFor="" className='label'>Image</label>
    //                 <input type='file' className='form-fontrol in' placeholder='Upload Product Image' required onChange={handleImage} />
    //                 <div className='error'>
    //                     <p>{imageerr}</p>
    //                 </div>
    //                 <div id='product_category' onChange={handleCategory} required>
    //                     <label htmlFor="" className='label'>Categories</label>
    //                     <br />
    //                     <div className='in'>
    //                     <input type="radio" id="mobile" name="category" value="mobiles" />
    //                     <label for="mobiles" className='label' style={{width: '25px'}}>Mobiles</label>
    //                     <label for="mobiles" className='label'></label>
    //                     <input type="radio" id="laptop" name="category" value="laptops" />
    //                     <label for="laptops" className='label' style={{width: '25px'}}>Laptops</label><br />
    //                     <input type="radio" id="computer" name="Category" value="computers" />
    //                     <label for="Computers" className='label' style={{width: '25px'}}>Computers</label>
    //                     <label for="mobiles" className='label'></label>
    //                     <input type="radio" id="Cameras" name="category" value="cameras" />
    //                     <label for="cameras" className='label' style={{width: '25px'}}>Cameras</label><br />
    //                     </div>
    //                     </div>
    //                 <br />
    //                 <br />
    //                 <label htmlFor="" className='label'>Brand</label>
    //                 <input type='text' className='form-control in' placeholder='Product Brand' onChange={handleBrand} required/>
    //                 <br />
    //                 <br />
    //                 <input type="submit" value="Add to Inventory" className='btn btn-danger login' onClick={handleClick}/>
    //             </form>
    //         </div>
    //     </div>
    // </div>

    <div style={{ backgroundColor: "#f5f5f5" }}>
      <form class="form-signin" method="POST">
        <h1 class="h3 mb-3 font-weight-normal">Product Details</h1>

        <label for="Title" class="">
          Title
        </label>
        <input
          type="text"
          id="inputEmail"
          class="form-control"
          placeholder="Product Title"
          autofocus
          required
          onChange={handleTitle}
        />

        <label for="Description" class="">
          Description
        </label>
        <input
          type="text"
          id="inputPassword"
          class="form-control"
          placeholder="Description"
          required
          onChange={handleDesc}
        />

        <label for="Description" class="">
          Price
        </label>
        <input
          type="number"
          id="inputPassword"
          class="form-control"
          placeholder="Price"
          required
          onChange={handlePrice}
        />

        <label for="Image" class="">
          Image
        </label>
        <input
          type="file"
          id="inputPassword"
          class="form-control"
          placeholder="Image"
          required
          onChange={handleImage}
        />

        <div id="product_category" onChange={handleCategory} required>
          <label htmlFor="" className="">
            Categories
          </label>
          <br />

          <label for="mobiles" className="label" style={{ width: "25px" }}>
            Mobiles:{" "}
            <input type="radio" id="mobile" name="category" value="mobiles" />
          </label>
          <br />
          <label for="laptops" className="label" style={{ width: "25px" }}>
            Laptops:{" "}
            <input type="radio" id="laptop" name="category" value="laptops" />
          </label>
          <br />
          <br />
          <label for="Computers" className="label" style={{ width: "25px" }}>
            Computers:{" "}
            <input
              type="radio"
              id="computer"
              name="Category"
              value="computers"
            />
          </label>
          <br />
          <label for="cameras" className="label" style={{ width: "25px" }}>
            Cameras:{" "}
            <input type="radio" id="Cameras" name="category" value="cameras" />
          </label>
          <br />
        </div>

        <label for="Brand" class="sr-only">
          Brand
        </label>
        <input
          type="text"
          id="inputPassword"
          class="form-control"
          placeholder="Brand"
          required
          onChange={handleBrand}
        />

        <button
          class="btn btn-lg btn-primary btn-block"
          type="submit"
          onClick={handleClick}
        >
          Upload
        </button>
        <br />
      </form>
    </div>
  );
}
