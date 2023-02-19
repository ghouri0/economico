import React, { useState, useEffect } from "react";
import "./chart.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  // {
  //   name: 'Jan',
  //   sale: 4000,
  // },
  // {
  //   name: 'Feb',
  //   sale: 7000,
  // },
  // {
  //   name: 'Mar',
  //   sale: 2000,
  // },
  // {
  //   name: 'Apr',
  //   sale: 2780,
  // },
  // {
  //   name: 'May',
  //   sale: 1890,
  // },
  // {
  //   name: 'June',
  //   sale: 8090,
  // },
];

export default function Chart() {
  const [orders, setOrders] = useState([]);
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthlySales = [];

 

  function getMonthData(mon) {
    let thisMonth = 0;
    orders &&
      orders.forEach((e) => {
        console.log(e.date);
        const orderMonth = new Date(e.date);
        console.log(orderMonth.toLocaleString("default", { month: "long" }));
        if (orderMonth.toLocaleString("default", { month: "long" }) === mon) {
          console.log(e.Total);
          thisMonth += e.Total;
        }
      });
    return thisMonth;
  }

  function getSales() {
    let monthlySales = [];
    var i = 0;
    labels.map((name) => {
      console.log(name);
      const sale = getMonthData(name);
      if (i > 5) {
        monthlySales.push({ name, sale });
      }
      i++;
    });
    return monthlySales;
  }

  async function getOrders() {
    await fetch("/getorders", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].date);
        setOrders(data);
      });
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="chart">
      <h2
        className="title"
        style={{ textAlign: "center", padding: "10px", color: "grey" }}
      >
        Total Sales Last 6 Months
      </h2>

      <AreaChart
        width={600}
        height={350}
        data={getSales()}
        margin={{
          top: 20,
          right: 30,
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="1 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="sale" stroke="grey" fill="#b3b3ff" />
      </AreaChart>
    </div>
  );
}
