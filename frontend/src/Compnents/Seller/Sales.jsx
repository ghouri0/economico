import React, { useState, useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Sales() {

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
      // if (i > 5) {
        monthlySales.push({ name, sale });
      // }
      i++;
    });
    return monthlySales;
  }

  async function getOrders(sellerName) {
    await fetch(`/getSellerOrders/${sellerName}`, { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      });
  }

  useEffect(() => {
    getOrders(localStorage.getItem('SellerEmail'));
  }, []);

  return (
    <LineChart
          width={1200}
          height={450}
          data={getSales()}
          margin={{
            top: 10,
            right: 30,
            left: 30,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sale" stroke="#02b54a" />
        </LineChart>
  );
}
