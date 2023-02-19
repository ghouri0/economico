import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import JoditEditor from "jodit-react";
import striptags from "striptags";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditBlog() {
  const params = useParams();
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

  const [content, setContent] = useState("");
  const navigate = useNavigate();

  async function editBlog() {
    var date = new Date();
    date = date.getDate() + "/" + date.getDay() + "/" + date.getFullYear();
    console.log(date);
    const blog = {
      title: params.title,
      content: content,
      date: date,
    };

    console.log(blog);
    await fetch("/editBlog", {
      method: "put",
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
          alert("Successfully Updated");
        }
      });
  }

  return (
    <div className="container">
      <div
        className="titleContainer"
        style={{ height: "max-content", width: "" }}
      >
        <h1>{params.title}</h1>
        <JoditEditor
          value={params.content}
          config={config}
          onChange={(content) => {
            setContent(striptags(content));
          }}
        />
        <Button
          variant="contained"
          color="error"
          onClick={editBlog}
          style={{ marginTop: "10px", width: "max-content", height: "40px" }}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
