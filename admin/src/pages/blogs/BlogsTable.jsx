import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

export default function BlogsTable() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  var i = 0;
  async function getBlog() {
    await fetch("/getBlogs", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        if (i === 0) {
          setBlogs((blogs) => [...blogs, data]);
        }
        i += 1;
      });
  }
  async function delBlog(title) {
    console.log(title);
    await fetch(`/delBlogs/${title}`, {
      mode: "cors",
      method: "delete",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          alert("Not found");
        }
      });
  }
  console.log(BlogsTable);

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <TableContainer component={Paper} style={{ backgroundColor: "" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ background: "grey", fontWeight: "bold" }}>
          <TableRow>
            <TableCell className="tableCelsl">Title</TableCell>
            <TableCell className="tableCell">Date Modified</TableCell>
            <TableCell className="tableCell"></TableCell>
            <TableCell className="tableCell"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map((row) =>
            row.map((entry) => (
              <TableRow key={entry.title}>
                <TableCell className="tableCell" component="th" scope="row">
                  {entry.title}
                </TableCell>
                <TableCell className="tableCell">{entry.date}</TableCell>
                <TableCell className="tablesCell">
                  <button
                    onClick={() => {
                      navigate(`/editBlog/${entry.title}/${entry.content}`);
                    }}
                    style={{
                      backgroundColor: "goldenrod",
                      border: "none",
                      borderRadius: "5px",
                      color: "white",
                      width: "150px",
                      height: "35px",
                      padding: "5px",
                      margin: "auto",
                      fontSize: "12px",
                      fontWeight: "bold",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    Edit Blog Post
                  </button>
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
                      margin: "auto",
                      fontSize: "12px",
                      fontWeight: "bold",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick= {()=>{
                      var title =  entry.title
                      delBlog(title)
                    }}
                  >
                    Delete
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
