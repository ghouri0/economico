import React, { useState, useEffect } from "react";
import "./chart.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Jane",
    sales: 10000,
  },
  {
    name: "Asad",
    sales: 10050,
  },
  {
    name: "Waqas",
    sales: 34000,
  },
  {
    name: "Jawad",
    sales: 10500,
  },
  {
    name: "John",
    sales: 16000,
  },
  {
    name: "Hasham",
    sales: 30000,
  },
  {
    name: "smith",
    sales: 59000,
  },
  {
    name: "Essa",
    sales: 10600,
  },
  {
    name: "Haseeb",
    sales: 10100,
  },
  {
    name: "Qasim",
    sales: 40000,
  },
  {
    name: "Jae",
    sales: 12000,
  },
  {
    name: "Rafay",
    sales: 18000,
  },
  {
    name: "Kamal",
    sales: 34000,
  },
  {
    name: "Tariq",
    sales: 16000,
  },
];

export default function Chart2() {
  const [sales, setSales] = useState([]);

  function getSales() {
    var seller = [];
    sales.map((sale) => {
      seller.push(sale);
    });
    return seller;
  }

  async function getSellerSales() {
    await fetch("/sellerSales", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSales(data);
      });
  }

  useEffect(() => {
    getSellerSales();
  },[]);
  return (
    <div className="chart">
      <h2
        className="title"
        style={{ textAlign: "center", padding: "10px", color: "grey" }}
      >
        Sellers Sales
      </h2>
      <BarChart
        width={550}
        height={350}
        data={getSales()}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#e4c868" strokeWidth={1} />
      </BarChart>
    </div>
  );
}
