import React from "react";
import { useState, useEffect } from "react";
import "./compareTable.css";
import { useLocation } from "react-router-dom";
import Rating from "./Rating";
import { addToCart } from "./features/productSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function compareTable({ login, setLogin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState([]);
  const [cartPro, setCartPro] = useState(location.state)
  const [products, setProducts] = useState([])
  console.log(cartPro);


  function handleAddToCart(product) {
    if (!login) {    //if (!login) before
      navigate("/login");
    } else {
      dispatch(addToCart(product));
    }
  }

  async function deleteProduct(product) {
    console.log(product);
    const delQuery = await axios.post("/delCompare", { prod: product })
    console.log(delQuery.data);
    alert(delQuery.data.success)
    window.location.reload();
  }

  useEffect(async (e) => {
    console.log(localStorage.Name);
    if (localStorage.Name) { //login condition
      const data = await axios.post("/getCompare", { email: localStorage.Name })
      console.log(data.data);
      setProducts(data.data);
    }
  },[])

  return (
    <>
      {products ?
        <div className="comparison">
          <table style={{width:'max-content'}}>
            <thead>
              <tr>
                <th
                  className="tl tl2"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    fontSize: "2rem",
                    fontFamily: "inherit",
                  }}
                >
                  Comparison Table
                </th>
                {products.map((productsItem, index) => {
                  console.log(productsItem)
                  return (
                    <th
                      className="product"
                      style={{
                        background: "#69C7F1",
                        borderTopLeftRadius: 5,
                        borderLeft: 0,
                        backgroundColor: "white",
                        textAlign: "left",
                      }}
                      key = {index}
                    >
                      <img
                        src={productsItem.data.prod.image}
                        style={{ height: 180, width: 200 }}
                      ></img>
                  </th>
                  )
                })}
              </tr>
              <tr>
                <th style={{ width: 20, fontSize:36, padding:15, color:'white', fontWeight:600 }} className="price-now">Price(Rs)</th>
                {products.map((productsItem, index) => {
                  return (
                    <>
                      <th className="price-info" style={{ textAlign: "left" }} key = {index}>
                        <div className="price-now">
                          <span style={{ color: "white" }}>
                            {productsItem.data.prod.price}
                          </span>
                        </div>
                      </th>
                    </>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td colSpan="3">item_1</td>
              </tr>
              <tr className="compare-row">
                <td>Title</td>
                {products.map((productsItem, index) => { 
                  return (
                    <td style={{ textAlign: "left" }} key={index}>{productsItem.data.prod.name}</td>
                  )
                })}
              </tr>
              <tr>
                <td> </td>
                <td colSpan="3">item_2</td>
              </tr>
              <tr>
                <td>Store/Seller</td>
                {products.map((productsItem, index) => { 
                  return (
                    <td style={{ textAlign: "left" }} key={index}>
                      {productsItem.data.prod.seller? productsItem.data.prod.seller: productsItem.data.prod.store}
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td> </td>
                <td colSpan="3">item_2</td>
              </tr>
              <tr className="compare-row">
                <td>Brand</td>
                {products.map((productsItem, index) => { 
                  return (
                    <td style={{ textAlign: "left" }} key={index}>
                      {productsItem.data.prod.brand? productsItem.data.prod.brand : "N/A"}
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td> </td>
                <td colSpan="3">item_2</td>
              </tr>
              <tr>
                <td>Description</td>
                {products.map((productsItem, index) => { 
                  return(
                    <td style={{ textAlign: "left" }} key={index}>
                      {productsItem.data.prod.description? productsItem.data.prod.description : "N/A"}
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td> </td>
                <td colSpan="3">item_3</td>
              </tr>
              <tr className="compare-row">
                <td>Rating</td>
                {products.map((productsItem, index) => { 
                  return (
                    <td style={{ textAlign: "left" }} key={index}>
                      <Rating value={productsItem.score}></Rating>
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td> </td>
                <td colSpan="4">item_4</td>
              </tr>
              <tr>
                <td>Available</td>
                {products.map((productsItem, index) => { 
                  return (
                    <td style={{ textAlign: "left" }} key={index}>
                      <i className="fa fa-check"></i>
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td> </td>
                <td colSpan="3">item_5</td>
              </tr>
              <tr className="compare-row">
                <td>Reviews</td>
                {products.map((productsItem, index) => {
                  return (
                    <td style={{ textAlign: "left" }} key = {index}>
                      {JSON.parse(productsItem.data.item).review
                        ? JSON.parse(productsItem.data.item).review.map((rev, index) => {
                            return <p key={index}>{rev}</p>;
                          })
                        : productsItem.data.prod.reviews.map((rev, index) => {
                            //for ShoppingGuide Products
                            return <p key={index}>{rev}</p>;
                        })
                      }
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td> </td>
                <td colSpan="3">item_6</td>
              </tr>
                <tr>
                  <td>Buy Now</td>
                  {products.map((productsItem, index) => { 
                    return (
                      <td style={{ textAlign: "left" }} key={index}>
                        {productsItem.hub ? 
                          <Stack direction="row" spacing={2}>
                            <Button
                              variant="contained"
                              style={{ backgroundColor:'#EC671A'}}
                              onClick={() => {
                                let product = []
                                product.push({
                                  product: productsItem.data.prod.name,
                                  image: productsItem.data.prod.image,
                                  price: {
                                    actual: 0,
                                    discount: productsItem.data.prod.price
                                  },
                                  seller: productsItem.data.prod.seller
                                })
                                handleAddToCart(product[0]);
                              }}
                            >
                              Add To Cart
                              <span className="hide-mobile"></span>
                            </Button>
                            <Button variant="outlined" color="error" onClick={() => { deleteProduct(productsItem) }} startIcon={<DeleteIcon />}>
                              Delete
                            </Button>
                          </Stack>
                            :
                          <Stack direction="row" spacing={2}>    
                            <Button
                              style={{ backgroundColor:'#EC671A'}}
                              variant="contained"
                              onClick={() => {
                                window.open(productsItem.data.prod.url);
                              }}
                            >
                              Visit Store
                              <span className="hide-mobile"></span>
                            </Button>
                            <Button variant="outlined" color="error" onClick={() => { deleteProduct(productsItem) }} startIcon={<DeleteIcon />}>
                              Delete
                            </Button>
                          </Stack>
                        }
                      </td>
                    )
                  })}
                </tr>
            </tbody>
          </table>
        </div>
      
        :
      
        <div className="comparison">
          <table style={{width: 'max-content'}}>
            <thead>
              <tr>
                <th
                  className="tl tl2"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    fontSize: "2rem",
                    fontFamily: "inherit",
                  }}
                >
                  Comparison Table
                </th>
                <th
                  className="product"
                  style={{
                    background: "#69C7F1",
                    borderTopLeftRadius: 5,
                    borderLeft: 0,
                    backgroundColor: "white",
                    textAlign: "left",
                  }}
                >
                  <img
                    src={cartPro.hub ? cartPro.item.image : cartPro.item.image[0]}
                    style={{ height: 180, width: 200 }}
                  ></img>
                </th>
              </tr>
              <tr>
                <th style={{ width: 20 }}></th>
                <th className="price-info" style={{ textAlign: "left" }}>
                  <div className="price-now">
                    <span style={{ color: "mediumseagreen" }}>
                      {cartPro.hub ? cartPro.prod.price : cartPro.item.price[0]}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td colSpan="3">item_1</td>
              </tr>
              <tr className="compare-row">
                <td>Title</td>
                <td style={{ textAlign: "left" }}>{cartPro.prod.name}</td>
              </tr>
              <tr>
                <td> </td>
                <td colSpan="3">item_2</td>
              </tr>
              {cartPro.hub ? (
                <tr>
                  <td>Seller</td>
                  <td style={{ textAlign: "left" }}>{cartPro.prod.seller}</td>
                </tr>
              ) : (
                <tr>
                  <td>Store</td>
                  <td style={{ textAlign: "left" }}>{cartPro.prod.store}</td>
                </tr>
              )}

              {cartPro.hub ? (
                <>
                  <tr>
                    <td> </td>
                    <td colSpan="3">item_2</td>
                  </tr>
                  <tr className="compare-row">
                    <td>Brand</td>
                    <td style={{ textAlign: "left" }}>{cartPro.prod.brand}</td>
                  </tr>
                </>
              ) : (
                <></>
              )}

              {cartPro.hub ? (
                <>
                  <tr>
                    <td> </td>
                    <td colSpan="3">item_2</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td style={{ textAlign: "left" }}>
                      {cartPro.prod.description}
                    </td>
                  </tr>
                </>
              ) : (
                <></>
              )}

              <tr>
                <td> </td>
                <td colSpan="3">item_3</td>
              </tr>
              <tr className="compare-row">
                <td>Rating</td>
                <td style={{ textAlign: "left" }}>
                  <Rating value={cartPro.score}></Rating>
                </td>
              </tr>
              <tr>
                <td> </td>
                <td colSpan="4">item_4</td>
              </tr>
              <tr>
                <td>Available</td>
                <td style={{ textAlign: "left" }}>
                  <i className="fa fa-check"></i>
                </td>
              </tr>
              <tr>
                <td> </td>
                <td colSpan="3">item_5</td>
              </tr>
              <tr className="compare-row">
                <td>Reviews</td>
                <td style={{ textAlign: "left" }}>
                  {location.state.item.review
                    ? location.state.item.review.map((rev, index) => {
                        return <p key={index}>{rev}</p>;
                      })
                    : location.state.item.reviews.map((rev, index) => {
                        //for ShoppingGuide Products
                        return <p key={index}>{rev}</p>;
                      })}
                </td>
              </tr>

              <tr>
                <td> </td>
                <td colSpan="3">item_6</td>
              </tr>
              {cartPro.hub ? (
                <tr>
                  <td>Buy Now</td>
                  <td style={{ textAlign: "left" }}>
                    <Stack direction="row" spacing={2}>    
                      <Button
                        style={{ backgroundColor:'#EC671A'}}
                        variant="contained"
                        onClick={() => {
                          handleAddToCart();
                        }} 
                      >
                        Add To Cart
                        <span className="hide-mobile"></span>
                      </Button>
                      <Button variant="outlined" color="error"
                        onClick={() => {
                          console.log("CartPro Delete")
                          console.log(cartPro)
                          deleteProduct(cartPro)
                        }}
                        startIcon={<DeleteIcon />}
                      >
                          Delete
                      </Button>
                    </Stack>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td>Url</td>
                  <td style={{ textAlign: "left" }}>
                    <Stack direction="row" spacing={2}>    
                      <Button
                        variant="contained"
                        onClick={() => {
                          window.open(cartPro.prod.url);
                        }}
                      >
                        Visit Store
                        <span className="hide-mobile"></span>
                      </Button>
                        <Button variant="outlined" color="error" onClick={() => { deleteProduct() }} startIcon={<DeleteIcon />}>
                          Delete
                      </Button>
                    </Stack>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>                    
        }
    
  </>);
}
