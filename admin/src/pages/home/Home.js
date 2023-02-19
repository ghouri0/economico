import React from "react";
import "./home.css";
import Widget from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";
import Table1 from "../../components/table/Table";
import Chart1 from "../../components/chart/Chart1";
import Chart2 from "../../components/chart/Chart2";
import "../../App.css";
import Chart3 from "../../components/chart/Chart3";
import { useEffect, useState } from "react";

export default function Home() {
  const [cust, setCust] = useState(0);
  const [sell, setSell] = useState(0);
  const [ord, setOrd] = useState(0);
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState(0);
  var sale = 0;
  async function getData() {
    await fetch("/getAllCustomers", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCust(data.count);
      });
    await fetch("/getAllSellers", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSell(data.count);
      });
    await fetch("/getAllOrders", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrd(data.count);
      });
  }

  async function getOrdersData() {
    await fetch("/getOrders", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      });
  }

  function getSales() {
    console.log(orders);
    let sale=0
    orders.map((order) => {
      console.log(order.Total);
      sale += order.Total
    });
    return sale
  }

  useEffect(() => {
    getData();
    getOrdersData();
  }, []);
  return (
    <div style={{ width: "max-content" }}>
      <div className="" style={{ height: "max-content", width: "" }}>
        <div className="widgets">
          <Widget array={["Customer", "#7163e9", "#191070", cust]} />
          <Widget array={["Sellers", "#4da8ff", "#004180", sell]} />
          <Widget array={["Orders", "#fab91f", "#ae7904", ord]} />
          <Widget array={["Sales", "#e13837", "#9b1817", sale]} />
        </div>
        <div className="charts">
          <Chart />
          <Chart2 />
        </div>
        <div className="charts">
          <Chart1 />
          <Chart3 />
        </div>
        <div className="tableContainer">
          <div className="tableTitle">Recent Orders</div>
          <Table1 />
        </div>
      </div>
    </div>
  );
}
