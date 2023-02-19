import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Loader from "./Loading";
import Rating from "./Rating";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addToCart } from "./features/productSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import ButtonGroup from "@mui/material/ButtonGroup";
import ButtonMUI from "@mui/material/Button";
import toast, { Toaster } from "react-hot-toast";

export default function ProductHub({ login, setLogin }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [score, setScore] = useState(null);
  const [loader, setLoading] = useState(false);
  const [review, setReview] = useState(JSON.parse(location.state.item));

  useEffect(async (e) => {
    console.log("location:   ", location.state.item);
    console.log("parse:   ", JSON.parse(location.state.item));
    let query = { data: [] };
    if (review.reviews.length > 0) {
      setLoading(true);
      query = await axios.post("/getSentimentScore", { data: review.reviews });
    }
    product.push({
      product: location.state.prod.name,
      image: location.state.prod.image,
      price: {
        actual: 0,
        discount: parseInt(location.state.prod.price),
      },
      seller: location.state.prod.seller,
    });
    console.log("prod......", product);
    console.log(query.data);
    // handleScore(query.data);
    setLoading(false);
  }, []);

  console.log(product);
  console.log(product.reviews);

  // console.log("score....", score);

  // function handleScore(d) {
  //   setScore(d);
  // }

  function handleAddToCart(product) {
    if (!login) {
      navigate("/login");
    } else {
      dispatch(addToCart(product));
      toast("Added to Cart");
    }
  }

  const addCompareProducts = async () => {
    console.log("local: ", localStorage);
    if (localStorage.Name) {
      //login condition
      const query = await axios.put("/addCompare", {
        email: localStorage.Name,
        data: location.state,
        score: score ? score.score : 0,
        hub: true,
      }); //Name is Email in localstorage
      console.log(query.data);
      navigate("/compare", {
        state: {
          prod: location.state.prod, //name, url, store
          item: JSON.parse(location.state.item), //image, price, review
          score: score ? score.score : 0,
          hub: true,
          data: query.data,
        },
      });
    } else {
      toast("Login First Please");
    }
  };

  const addWishListProducts = async () => {
    console.log("local: ", localStorage);
    if (localStorage.Name) {
      //login condition
      const query = await axios.put("/addWishList", {
        email: localStorage.Name,
        data: location.state,
        score: score ? score.score : 0,
        hub: true,
      }); //Name is Email in localstorage
      console.log(query.data);
      navigate("/wishlist", {
        state: {
          prod: location.state.prod, //name, url, store
          item: JSON.parse(location.state.item), //image, price, review
          score: score ? score.score : 0,
          hub: true,
          data: query.data,
        },
      });
      toast("Succesfully Added to Wishlist");
    } else {
      toast("Login First Please");
    }
  };

  if (loader) {
    return (
      <div
        style={{
          height: "calc(100vh)",
          display: "flex",
          textAlign: "center",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ClipLoader
          size={200}
          cssOverride={{ borderWidth: 8 }}
          color={"red"}
          loading={true}
        />
      </div>
    );
  } else {
    return (
      <div>
        {product.map((item) => (
          <div style={{ paddingBottom: 100 }}>
            <Link className="btn btn-light my-3" to="/">
              Go Back
            </Link>
            <Row>
              <Col
                md={3}
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  boxShadow: "0 2px 10px rgb(0 0 0 / 30%)",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.product}
                  fluid
                  style={{ height: 250, width: 250 }}
                />
              </Col>
              <Col md={3} style={{ padding: 0 }}>
                <ListGroup variant="flush">
                  <ListGroup.Item style={{ padding: 0 }}>
                    <h3
                      style={{
                        fontWeight: "bold",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        height: 100,
                      }}
                    >
                      {item.product}
                    </h3>
                  </ListGroup.Item>
                  {/* <ListGroup.Item>
                    <Rating
                      value={
                        // score != null &&
                        // score.score != null &&
                        // score.positive != null &&
                        // score.negative != null
                        //   ? score.positive
                        //   : 0
                        score ? score.score : 0
                      }
                      text={
                        score != null &&
                        score.score != null &&
                        score.positive != null &&
                        score.negative != null &&
                        score.positive > score.negative
                          ? "Mostly Positive"
                          : score != null &&
                            score.score != null &&
                            score.positive != null &&
                            score.negative != null &&
                            score.positive < score.negative
                          ? "Mostly Negative"
                          : score != null &&
                            score.score != null &&
                            score.positive != null &&
                            score.negative != null &&
                            score.positive === score.negative &&
                            score.negative !== 0 &&
                            score.positive !== 0
                          ? "Mixed Reviews"
                          : "No Reviews"
                      }
                    />
                  </ListGroup.Item> */}
                  <ListGroup.Item>
                    <div className="row">
                      <div className="col">
                        <strong>Price:</strong>
                      </div>
                      <div className="col">{item.price.discount} Rs</div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="row">
                      <div className="col">
                        <strong>Brand:</strong>
                      </div>
                      <div className="col">{location.state.prod.brand}</div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="row">
                      <div className="col">
                        <strong>Category:</strong>
                      </div>
                      <div className="col">{location.state.prod.category}</div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="row">
                      <div className="col">
                        <strong>Description:</strong>
                      </div>
                      <div className="col">
                        {location.state.prod.description}
                      </div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="row">
                      <div className="col">
                        <strong>Available at:</strong>
                      </div>
                      <div className="col">ShoppingGuide</div>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card style={{ paddingTop: 10, width: "auto" }}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>{location.state.prod.price} Rs</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>In Stock</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Seller:</Col>
                        <Col>{location.state.prod.seller}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Button
                        onClick={() => {
                          handleAddToCart(item);
                        }}
                        className="btn-block"
                        type="button"
                      >
                        <ShoppingCartIcon style={{ fontSize: 27, width: 30 }} />
                        Add to Cart
                      </Button>
                      {/* <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                        style={{ paddingBottom: 20 }}
                      >
                        <ButtonMUI
                          onClick={() => {
                            addWishListProducts();
                          }}
                          className="btn-block"
                          type="button"
                          style={{
                            backgroundColor: "#ff523b",
                            height: 50,
                            marginTop: 8,
                            borderTopLeftRadius: 50,
                            borderBottomLeftRadius: 50,
                            borderColor: "#bdbdbd",
                          }}
                        >
                          Add to WishList
                        </ButtonMUI>
                        <ButtonMUI
                          onClick={() => {
                            addCompareProducts();
                          }}
                          className="btn-block"
                          type="button"
                          style={{
                            backgroundColor: "#ff523b",
                            height: 50,
                            borderTopRightRadius: 50,
                            borderBottomRightRadius: 50,
                          }}
                        >
                          Add to Compare
                        </ButtonMUI>
                      </ButtonGroup> */}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
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
            </Row>

            {/* <Row>
              <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Write a Customer Review</h2>
                    {successProductReview && (
                      <Message variant='success'>
                        Review submitted successfully
                      </Message>
                    )}
                    {loadingProductReview && <Loader />}
                    {errorProductReview && (
                      <Message variant='danger'>{errorProductReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={loadingProductReview}
                          type='submit'
                          variant='primary'
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to='/login'>sign in</Link> to write a review{' '}
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row> */}
          </div>
        ))}
      </div>
    );
  }
}
