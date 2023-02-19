import React, { useState } from "react";
import "./blog.css";
import { Button, TextField } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import JoditEditor from "jodit-react";
import BlogsTable from "./BlogsTable";
import { useNavigate } from "react-router-dom";
import striptags from "striptags";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const config = {
  buttons: [
    "source",
    "|",
    "bold",
    "italic",
    "underline",
    "ul",
    "ol",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "left",
    "center",
    "right",
    "justify",
    "|",
    "undo",
    "redo",
    "|",
    "hr",
    "eraser",
    "fullsize",
  ],
};

export default function Blogs() {
  const [value, setValue] = React.useState(0);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  async function handleBlog() {
    var date = new Date();
    date = date.getDate()+ '/' + date.getDay()+ '/'+ date.getFullYear()
    console.log(date);
    const blog = {
      title: title,
      content: content,
      date: date,
    };

    console.log(blog);
    await fetch("/addBlog", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blog,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          alert(data.message);
          navigate("/blogs");
        } else {
          alert('Successfully Added')
        }
      });
  }

  console.log(content);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="container">
      <div
        className="titleContainer"
        style={{ height: "max-content", width: "" }}
      >
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              width="100%"
            >
              <Tab label="Blog Posts" {...a11yProps(0)} />
              <Tab label="Add New Blog-Post" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <BlogsTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TextField
              id="outlined-name fullwidth"
              label="Enter Title of Post"
              placeholder="Enter Title of Post"
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              style={{
                textAlign: "center",
                alignItems: "center",
                width: "200px",
              }}
            />
            <br />
            <br />
            <JoditEditor
              value="Hello There!"
              onChange={(content) => {
                setContent(striptags(content));
              }}
              config={config}
            />
            <Button
              variant="contained"
              color="error"
              style={{ marginTop: "10px", width: "10%", height: "40px" }}
              onClick={handleBlog}
            >
              Submit
            </Button>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}
