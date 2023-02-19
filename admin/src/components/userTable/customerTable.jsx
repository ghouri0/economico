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

export default function CustomerTable() {
  const navigate = useNavigate();
  var i = 0;
  const [customer, setCustomer] = useState([]);
  async function getCust() {
    await fetch("/getCustomer", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        if (i === 0) {
          setCustomer((customer) => [...customer, data]);
        }
        i += 1;
      });
  }

  async function handleDelete(email) {
    await fetch("/delCustomer", {
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
        alert(data.message);
        navigate("/customers");
      });
  }

  console.log(customer);
  useEffect(() => {
    getCust();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Phone</TableCell>
            <TableCell className="status"></TableCell>
            <TableCell className="status"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customer.map((row) =>
            row.map((entry) => (
              <TableRow key={entry.email}>
                <TableCell className="tableCell" component="th" scope="row">
                  {entry.name}
                </TableCell>
                <TableCell className="tableCell">{entry.email}</TableCell>
                <TableCell className="status">{entry.phoneNo}</TableCell>
                <TableCell className="tableCell">
                  <button
                    onClick={() => {
                      navigate("/profile", {
                        state: {
                          name: entry.name,
                          email: entry.email,
                          phone: entry.phone,
                          image: 'https://source.unsplash.com/random/?customers/'
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
                      var email = entry.email;
                      handleDelete(email);
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
