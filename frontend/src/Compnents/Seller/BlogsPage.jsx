import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./blogs.css";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);

  async function getBlogs() {
    await fetch("/getBlogs", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
      });
  }

  useEffect((e) => {
    getBlogs();
  }, blogs);

  return blogs.map((blog) => (
    <div class="blog_post">
      <div class="img_pod">
        <img
          className="imgAvatar"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkmuCS4ywKmexUJFLMSY0-bzko8fqlTxzoCQ&usqp=CAU"
          alt="random image"
        />
      </div>
      <div class="container_copy">
        <h3>
          {blog.date}
        </h3>
        <h1>{blog.title}</h1>
        <p className="des">{blog.content}</p>
      </div>
    </div>
  ));
}
