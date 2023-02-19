import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import toast, { Toaster } from 'react-hot-toast';

export default function AddReviews() {
  const [products, setProducts] = useState([]);
  const [review, setReview] = useState("");
  const location = useLocation();
  console.log(location.state);
  useEffect((e) => {
    setProducts(location.state.products);
  });

  async function addReview(product){
    console.log(product);
    await fetch("/addReview", {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product:product, 
        review: review
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

  return (
    <div className="titleContainer" style={{ width: "100%" }}>
      <div className="" style={{ marginBottom: "10px", fontWeight: 'bold' }}>
        {location.state.customer} Order Details
      </div>
      <hr />
      <h3 style={{ display: "flex" }}>
        Order ID:{" "}
        <h3 style={{ fontWeight: "bold" }}>{location.state.order_id}</h3>
      </h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "1270px" }} aria-label="simple table">
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
                  <TextField
                    id="outlined-textarea"
                    label="Enter Your Review"
                    placeholder="Starts here.."
                    multiline
                    InputProps={{
                        inputProps: {
                            style: { justifyContents: "center" },
                        }
                    }}
                    style={{width: '100%',}}
                    onChange={(e)=>{setReview(e.target.value)}}
                  />
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
                      addReview(row.proName)
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
