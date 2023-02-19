import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Notifications() {
  const [notification, setNotification] = useState([]);
  const [message, setMessage] = useState("");
  async function getNotification(seller) {
    let data2 = await axios.post("/getOrderNotifications", {
      seller: seller,
    });
    if (!data2.data.message) {
      console.log(data2.data);
      setNotification(data2.data);
    }
    if (data2.data.message) {
      console.log(data2.data.message);
      setMessage(data2.data.message);
    }
  }

  async function deleteNotify(notifyID) {
    await fetch(
      `/deleteNotifications/${notifyID}/${localStorage.getItem("SellerEmail")}`,
      {
        mode: "cors",
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.success);
          let notifications = [];
          notification.forEach((element) => {
            if (element.notifyID !== notifyID) {
              notifications.push(element);
            }
          });
          setNotification(notifications);
        } else {
          alert(data.error);
        }
      });
  }

  useEffect(() => {
    getNotification(localStorage.getItem("SellerEmail"));
  }, notification);
  return notification.length > 0 ? (
    <div className="carosal" style={{ width: "max-content", margin: "auto" }}>
      <div className="title" style={{ marginBottom: "10px" }}>
        Recent Orders Booked
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{ width: "800px", margin: "auto" }}
          aria-label="simple table"
        >
          <TableHead
            sx={{
              "& th": {
                backgroundColor: "black",
                color: "white",
              },
            }}
          >
            <TableRow>
              <TableCell className="tableCell">ID</TableCell>
              <TableCell className="tableCell">Notification</TableCell>
              <TableCell className="status"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notification.map((row) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                style={{ backgroundColor: "white" }}
              >
                <TableCell className="tableCell" scope="row">
                  {row.notifyID}
                </TableCell>
                <TableCell className="tableCell">{row.message}</TableCell>
                <TableCell className="status">
                  <DeleteIcon
                    style={{ fontSize: "25px", marginRight: "50px" }}
                    onClick={() => {
                      deleteNotify(row.notifyID);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) : (
    <h4 style={{ margin: "50px", fontWeight: "bold", fontSize: "50px" }}>
      {message !== "" ? message : ""}
    </h4>
  );
}
