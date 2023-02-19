import React from "react";
import Table1 from "../../components/table/Table";

export default function Order() {
  return (
    <div>
      <div
        className="titleContainer"
        style={{ width: "98%", height: "max-content", margin: "15px" }}
      >
        <div className="title" style={{color: 'grey'}}>Recent Orders</div>
        <Table1 />
      </div>
    </div>
  );
}
