import React, {useState, useEffect} from 'react'
import './chart.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';




export default function Chart3() {
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

  function getMonthlyOrder(mon) {
    let thisMonth = 0;
    orders &&
      orders.forEach((e) => {
        console.log(e.date);
        const orderMonth = new Date(e.date);
        console.log(orderMonth.toLocaleString("default", { month: "long" }));
        if (orderMonth.toLocaleString("default", { month: "long" }) === mon) {
          thisMonth += 1;
        }
      });
    return thisMonth;
  }

  function getOrder() {
    let monthlyOrder = [];
    var i = 0;
    labels.map((name) => {
      console.log(name);
      const order = getMonthlyOrder(name);
      if (i > 5) {
        monthlyOrder.push({ name, order });
      }
      i++;
    });
    return monthlyOrder;
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
  });
  return (
    <div className='chart'>
      <h2 className="title" style={{textAlign: 'center', padding: '10px', color: 'grey'}}>
        Last 6 months' Orders
      </h2>
      <LineChart
          width={600}
          height={400}
          data={getOrder()}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type= 'natural' dataKey="order" stroke="#2b5182" strokeWidth={2} activeDot={{ r: 8 }} strokeDasharray="55" />
        </LineChart>
    </div>
  )
}
