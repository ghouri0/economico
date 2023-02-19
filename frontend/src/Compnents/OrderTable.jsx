import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import Alert from "@mui/material/Alert";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import toast, { Toaster } from "react-hot-toast";

export default function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [reviewOpen, setOpen] = useState(false);
  const [order_id, setOrderID] = useState("");
  const [review, setReview] = useState("");
  const navigate = useNavigate();
  const [add, setAdd] = useState(false);

  async function getOrders(customer) {
    console.log(customer);
    await fetch(`/getOrders/${customer}`, { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        setOrders(data);
      });
  }

  useEffect(() => {
    getOrders(localStorage.getItem("Name"));
  }, []);

  async function addReview(product, order) {
    console.log(product);
    await fetch("/addReview", {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: product,
        review: review,
        order: order,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          toast(data.message);
        } else {
          toast(data.error);
        }
      });
  }

  return !reviewOpen ? (
    <div className="carosal" style={{ width: "100%" }}>
      <div
        className=""
        style={{
          marginBottom: "10px",
          textAlign: "left",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        Order History
      </div>
      <TableContainer component={Paper}>
        <Table sx={{}} aria-label="simple table">
          <TableHead
            sx={{
              "& th": {
                backgroundColor: "black",
                color: "white",
              },
            }}
          >
            <TableRow>
              <TableCell className="tableCell">Tracking ID</TableCell>
              <TableCell className="tableCell">Products</TableCell>
              <TableCell className="tableCell">Total Bill</TableCell>
              <TableCell className="status">Payment Method</TableCell>
              <TableCell className="status">Order Date</TableCell>
              <TableCell className="status"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                style={{ backgroundColor: "white" }}
              >
                <TableCell className="tableCell" scope="row">
                  {row.order_id}
                </TableCell>
                <TableCell className="tableCell">
                  {row.products.length}
                </TableCell>
                <TableCell className="status">{row.Total}</TableCell>
                <TableCell className="tableCell">{row.pay_meth}</TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="status">
                  <Button
                    style={{
                      width: "max-content",
                      padding: "10px",
                      backgroundColor: "crimson",
                      color: "white",
                      fontSize: "10px",
                    }}
                    onClick={() => {
                      // navigate(
                      //   "/addReviews", {state: {order_id: row.order_id, customer: row.customer, products: row.products}}
                      // );
                      setOpen(true);
                      setProducts(row.products);
                      setOrderID(row.order_id);
                    }}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) : (
    <div className="titleContainer" style={{ width: "100%" }}>
      <h3 style={{ display: "flex", marginTop: "10px", gap: "5px" }}>
        <ArrowBackIosNewSharpIcon
          style={{ display: "flex", marginTop: "5px" }}
          onClick={() => {
            setOpen(false);
          }}
        />
        Order ID: <h3 style={{ fontWeight: "bold" }}>{order_id}</h3>
      </h3>
      <TableContainer component={Paper}>
        <Table sx={{}} aria-label="simple table">
          <TableHead
            sx={{
              "& th": {
                backgroundColor: "black",
                color: "white",
              },
            }}
          >
            <TableRow>
              <TableCell className="tableCell">Product Name</TableCell>
              <TableCell className="tableCell">Quantity</TableCell>
              <TableCell className="tableCell">Product Price</TableCell>
              <TableCell className="status"></TableCell>
              <TableCell className="status"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                style={{ backgroundColor: "white" }}
              >
                <TableCell className="tableCell" scope="row">
                  {row.proName}
                </TableCell>
                <TableCell className="tableCell">{row.cartQuantity}</TableCell>
                <TableCell className="status">{row.price}</TableCell>

                <TableCell className="tableCell">
                  {row.review ? (
                    <Alert severity="success">
                      Review Added{" "}
                      <SentimentSatisfiedAltIcon style={{ color: "green" }} />
                    </Alert>
                  ) : (
                    <TextField
                      id="outlined-textarea"
                      label="Enter Your Review"
                      placeholder="Starts here.."
                      multiline
                      InputProps={{
                        inputProps: {
                          style: { justifyContents: "center" },
                        },
                      }}
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        setReview(e.target.value);
                      }}
                    />
                  )}
                </TableCell>
                <TableCell className="status">
                  <Button
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#de2c2c",
                      color: "white",
                      fontSize: "10px",
                    }}
                    onClick={() => {
                      addReview(row.proName, order_id);
                    }}
                  >
                    Add Comment
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
