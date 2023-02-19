import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Stack, Divider } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import { styled } from "@mui/material/styles";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import toast, { Toaster } from 'react-hot-toast';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Products() {
  const navigate = useNavigate();
  var i = 0;

  async function delProduct(title) {
    await fetch(`/delProduct/${title}`, {
      mode: "cors",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          toast(data.message);
          navigate("/seller");
        } else {
          toast("Not Deleted");
        }
      });
  }

  const [products, setProducts] = useState([]);
  var i = 0;
  async function getProducts(sellerEmail) {
    // console.log(sellerEmail);
    await fetch(`/getProducts/${sellerEmail}`, { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        setProducts(data);
      });
    // console.log(products);
  }
  // console.log(products);
  useEffect(() => {
    getProducts(localStorage.getItem("SellerEmail"));
  }, []);
  return (
    <div
      className="carosal"
      style={{
        width: "1300px",
        margin: "auto",
        marginTop: "20px",
        marginBottom: "10px",
      }}
    >
      <div className="container">
        <div className="titleContainer">
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={8}
            style={{ display: "flex" }}
          >
            <Item>
              <InventoryIcon
                style={{ padding: "10px", color: "orange", fontSize: "150px" }}
              />
            </Item>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div className="">
                <h3 style={{ color: "black", margin: "15px" }}>
                  Products Management
                </h3>
              </div>
              <Link to="/seller/addProduct" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="warning"
                  style={{ width: "max-content", height: "50px" }}
                >
                  <AddToPhotosOutlinedIcon /> Add New
                </Button>
              </Link>
            </div>
          </Stack>
        </div>
      </div>
      <TableContainer component={Paper} style={{ backgroundColor: "" }}>
        <Table aria-label="simple table">
          <TableHead
            sx={{
              "& th": {
                backgroundColor: "black",
                color: "white",
              },
            }}
          >
            <TableRow>
              <TableCell className="tableCelsl">Product ID</TableCell>
              <TableCell className="tableCell">Product Title</TableCell>
              <TableCell className="tableCell"></TableCell>
              <TableCell className="tableCell">Price</TableCell>
              <TableCell className="tableCell">Brand</TableCell>
              <TableCell className="tableCell">Category</TableCell>
              <TableCell className="tableCell"></TableCell>
              <TableCell className="tableCell"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow key={row.name}>
                <TableCell className="tableCell">{i++}</TableCell>
                <TableCell className="tableCell" scope="row">
                  {row.name}
                </TableCell>
                <TableCell className="tableCell">
                  <img src={row.image} alt="" />
                </TableCell>
                <TableCell
                  className="tableCell"
                  style={{ width: "max-content" }}
                >
                  {row.price}
                </TableCell>
                <TableCell className="tableCell">{row.brand}</TableCell>
                <TableCell className="tableCell">{row.category}</TableCell>
                <TableCell className="tableCell">
                  {/* <Link to= "/seller/editProduct/row.name/row.image/row.Price/row.description/row.category/row.brand"> */}
                  <button
                    onClick={() => {
                      navigate("/seller/editProduct", {
                        state: {
                          name: row.name,
                          image: row.image,
                          price: row.Price,
                          des: "",
                          cat: row.category,
                          brand: row.brand,
                        },
                      });
                    }}
                    style={{
                      backgroundColor: "goldenrod",
                      border: "none",
                      borderRadius: "5px",
                      color: "white",
                      width: "150px",
                      height: "35px",
                      padding: "5px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    Edit Details
                  </button>
                  {/* </Link> */}
                </TableCell>
                <TableCell className="tableCell">
                  <button
                    style={{
                      backgroundColor: "crimson",
                      border: "none",
                      borderRadius: "5px",
                      color: "white",
                      width: "150px",
                      height: "35px",
                      padding: "5px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      var title = row.name;
                      delProduct(title);
                    }}
                  >
                    Delete Product
                  </button>
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
            backgroundColor: "crimson",
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
