import React from "react";
import './login.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function update() {

    const [loading, setLoading] = useState(false);
    const [Product, setProduct] = useState({
        title: '',
        description: '',
        price: 0,
        image: null,
        category: '',
        brand: ''
    })

    const navigate = useNavigate();

    const [priceerr, setPriceerr] = useState('')
    const [titleerr, setTitleerr] = useState('')
    const [deserr, setdeserr] = useState('')
    const [imageerr, setimageerr] = useState('')

    const handleTitle = (e) => {
        const value = e.target.value;
        if (value === '') {
            setTitleerr("Title not be null")
        }
        else {
            setTitleerr('');
            Product.title = value;
        }
    }
    const handleDesc = (e) => {
        const value = e.target.value;

        Product.description = value;

    }

    const handlePrice = (e) => {
        const value = e.target.value;

        Product.price = value;

    }

    const handleImage = (e) => {
        console.log(e.target.files[0])
        const value = e.target.files[0];
        if (value === null) {
            setimageerr("Price must be positive")
        }
        else {
            setimageerr('');
            Product.image = value;
        }
    }

    const handleCategory = (e) => {
        const value = e.target.value;
        Product.category = value;
    }

    const handleBrand = (e) => {
        const value = e.target.value;
        Product.brand = value;
    }

    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("file", Product.image);
        formData.append("upload_preset", "e-commerce")
        const imageData = await axios.post("https://api.cloudinary.com/v1_1/shopping-fyp/image/upload", formData);
        console.log("Image Data", imageData.data.url);
        const { title, description, price, image, category, brand } = Product;
        const data = {
            name: title,
            des: description,
            price: price,
            img: imageData,
            category: category,
            brand: brand,
            seller: localStorage.getItem("SellerEmail")
        };
        const result = await axios.post("/updateProduct", data);
        console.log("res....", result.data)
        console.log(result.data.message);
        setLoading(false);
        if (result.data.message) {
            alert("Product updated");
            navigate("/seller");
        }
        else {
            alert("Product does not updated");
            navigate("/seller");
        }
        console.log(result);
    };

    return (
        <div style={{ backgroundColor: "#f5f5f5" }}>
            <form class="form-signin" method="POST">
                <h1 class="h3 mb-3 font-weight-normal">Product Details</h1>

                <label for="Title" class="">Title</label>
                <input type="text" id="inputEmail" class="form-control" placeholder="Product Title" autofocus required onChange={handleTitle} />

                <label for="Description" class="">Description</label>
                <input type="text" id="inputPassword" class="form-control" placeholder="Description" required onChange={handleDesc} />


                <label for="Description" class="">Price</label>
                <input type="number" id="inputPassword" class="form-control" placeholder="Price" required onChange={handlePrice} />

                <label for="Image" class="">Image</label>
                <input type="file" id="inputPassword" class="form-control" placeholder="Image" required onChange={handleImage} />


                <div id='product_category' onChange={handleCategory} required>
                    <label htmlFor="" className=''>Categories</label>
                    <br />

                    <label for="mobiles" className='label' style={{ width: '25px' }}>Mobiles:  <input type="radio" id="mobile" name="category" value="mobiles" /></label>
                    <br />
                    <label for="laptops" className='label' style={{ width: '25px' }}>Laptops:  <input type="radio" id="laptop" name="category" value="laptops" /></label><br />
                    <br />
                    <label for="Computers" className='label' style={{ width: '25px' }}>Computers:   <input type="radio" id="computer" name="Category" value="computers" /></label>
                    <br />
                    <label for="cameras" className='label' style={{ width: '25px' }}>Cameras:    <input type="radio" id="Cameras" name="category" value="cameras" /></label><br />

                </div>

                <label for="Brand" class="sr-only">Brand</label>
                <input type="text" id="inputPassword" class="form-control" placeholder="Brand" required onChange={handleBrand} />


                <button class="btn btn-lg btn-primary btn-block" type="submit" onClick={handleClick}>Update</button>
                <br />

            </form>


        </div>
    )
}
