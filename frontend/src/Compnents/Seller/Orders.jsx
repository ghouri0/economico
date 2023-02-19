import React, {useState, useEffect} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  async function getOrders(seller) {
    await fetch(`/getSellerOrders/${seller}`, { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        setOrders(data);
      });
  }

  useEffect(() => {
    getOrders(localStorage.getItem("SellerEmail"));
  }, []);
  return (
    <div className="carosal" style={{width: '100%'}}>
      <div className="title" style={{ marginBottom: "10px" }}>
        Recent Orders
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="simple table">
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
              <TableCell className="tableCell">Customer</TableCell>
              <TableCell className="tableCell">Total Bill</TableCell>
              <TableCell className="status">Payment Method</TableCell>
              <TableCell className="status">Status</TableCell>
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
                <TableCell className="status">{row.customer}</TableCell>
                <TableCell className="status">{row.Total}</TableCell>
                <TableCell className="tableCell">{row.pay_meth}</TableCell>
                <TableCell className="tableCell">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
