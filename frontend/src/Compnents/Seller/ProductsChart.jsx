import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: "Page B",
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: "Page C",
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: "Page D",
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: "Page E",
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: "Page F",
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
];

export default function ProductsChart() {
    const [products, setProducts] = useState([])
  async function getProducts() {
    await fetch(`/getSellerProducts/${localStorage.getItem('SellerEmail')}`, { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
      });
  }
  useEffect((e)=>{
    getProducts()
  }, [])
  return (
    <div>
      <ComposedChart width={750} height={450} data={products.length>0 ? products: ''} margin="auto">
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="price" barSize={20} fill="#3a5afc" />
        <Line type="monotone" dataKey="price" stroke="#fc4103" />
      </ComposedChart>
    </div>
  );
}
