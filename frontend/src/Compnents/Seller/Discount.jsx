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
import DiscountIcon from "@mui/icons-material/Discount";
import { styled } from "@mui/material/styles";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import toast, { Toaster } from "react-hot-toast";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Discount() {
  const navigate = useNavigate();

  async function delSale(code) {
    await fetch(`/delSale/${code}`, {
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

  const [sales, setSales] = useState([]);
  async function getSales(sellerEmail) {
    // console.log(sellerEmail);
    await fetch(`/getSales/${sellerEmail}`, { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        setSales(data);
      });
    // console.log(products);
  }
  // console.log(products);
  useEffect(() => {
    getSales(localStorage.getItem("SellerEmail"));
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
              <DiscountIcon
                style={{ padding: "10px", color: "blue", fontSize: "150px" }}
              />
            </Item>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div className="">
                <h3 style={{ color: "black", margin: "15px" }}>
                  Discount and Sales
                </h3>
              </div>
              <Link to="/seller/addSale" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="info"
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
              <TableCell className="tableCelsl">Sale code</TableCell>
              <TableCell className="tableCell">Sale Title</TableCell>
              <TableCell className="tableCell">Products</TableCell>
              <TableCell className="tableCell">Disount</TableCell>
              <TableCell className="tableCell">Start Date</TableCell>
              <TableCell className="tableCell">End Date</TableCell>
              <TableCell className="tableCell"></TableCell>
              <TableCell className="tableCell"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((row) => (
              <TableRow key={row.code}>
                <TableCell className="tableCell">{row.code}</TableCell>
                <TableCell className="tableCell" scope="row">
                  {row.title}
                </TableCell>
                <TableCell className="tableCell">
                  {row.products.length}
                </TableCell>
                <TableCell
                  className="tableCell"
                  style={{ width: "max-content" }}
                >
                  {row.discount_per} %
                </TableCell>
                <TableCell className="tableCell">{row.startDate}</TableCell>
                <TableCell className="tableCell">{row.endDate}</TableCell>
                <TableCell className="tableCell">
                  <button
                    onClick={() => {
                      navigate("/seller/editSale", {
                        state: {
                          title: row.title,
                          code: row.code,
                          price: row.price,
                          products: row.products,
                          discount: row.discount_per,
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
                      var code = row.code;
                      delSale(code);
                    }}
                  >
                    Delete Sale
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
