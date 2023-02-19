import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../table/table.css";
import { useNavigate } from "react-router-dom";

export default function SellerTable() {
  var i = 0;
  const [seller, setSeller] = useState([]);
  const navigate = useNavigate();

  async function handleSeller(email) {
    await fetch("/delSeller", {
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "delete",
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert(data.message)
        navigate('/sellers');
      });
  }

  async function getSell() {
    await fetch("/getSellers", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        if (i === 0) {
          setSeller((seller) => [...seller, data]);
        }
        i += 1;
      });
  }
  console.log(seller);
  useEffect(() => {
    getSell();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Seller Name</TableCell>
            <TableCell className="tableCell">Store Name</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Phone</TableCell>
            <TableCell className="status"></TableCell>
            <TableCell className="status"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {seller.map((row) =>
            row.map((entry) => (
              <TableRow key={entry.emailID}>
                <TableCell className="tableCell" component="th" scope="row">
                  {entry.sellerName}
                </TableCell>
                <TableCell className="tableCell">{entry.storeName}</TableCell>
                <TableCell className="status">{entry.emailID}</TableCell>
                <TableCell className="status">{entry.phoneNo}</TableCell>
                <TableCell className="tableCell">
                  <button
                     onClick={() => {
                      navigate("/profile", {
                        state: {
                          name: entry.sellerName,
                          email: entry.emailID,
                          phone: entry.phoneNo,
                          store: entry.storeName,
                          image: 'https://source.unsplash.com/random/?electronics/'
                        },
                      });
                    }}
                    style={{
                      backgroundColor: "goldenrod",
                      border: "none",
                      borderRadius: "5px",
                      color: "white",
                      width: "80%",
                      height: "35px",
                      padding: "5px",
                      margin: "auto",
                      fontSize: "12px",
                      fontWeight: "bold",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    View Profile
                  </button>
                </TableCell>
                <TableCell className="tableCell">
                  <button
                    onClick={() => {
                      console.log(entry.emailID);
                      handleSeller(entry.emailID);
                    }}
                    style={{
                      backgroundColor: "crimson",
                      border: "none",
                      borderRadius: "5px",
                      color: "white",
                      width: "80%",
                      height: "35px",
                      padding: "5px",
                      margin: "auto",
                      fontSize: "12px",
                      fontWeight: "bold",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    Delete Profile
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
