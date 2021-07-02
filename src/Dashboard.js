import React from "react";
import { Link } from "react-router-dom";
import { Grid} from "@material-ui/core";
import { Bar, Line } from "react-chartjs-2";

const CustomerComponent = () => {
  const state = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Customers",
        fill: false,
        lineTension: 0.5,
        backgroundColor: [
          "pink",
          "lightgreen",
          "lightblue",
          "lightgrey",
          "lightcyan",
        ],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  return (
    <div style={{ paddingTop: "3rem" }} className="row m-3 text-center">
      <div className="col-sm m-4 p-2 bg-gray-100">
        <div className="p-3">
          <Bar
            data={state}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
        <Link
          className="btn btn-primary px-5 py-10"
          style={{ margin: "10px 65px" }}
          to="/customers/get-all"
        >
          Customers
        </Link>
      </div>
    </div>
  );
};

const ProductComponent = () => {
  const state = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Products",
        fill: false,
        lineTension: 0.5,
        backgroundColor: [
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
        ],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [4, 12, 8, 3, 15],
      },
    ],
  };

  return (
    <div style={{ paddingTop: "3rem" }} className="row m-3 text-center">
      <div className="col-sm m-4 p-2 bg-gray-100">
        <div className="p-3">
          <Line
            data={state}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
        <Link
          className="btn btn-primary px-5 py-10"
          style={{ margin: "10px 65px" }}
          to="/products/get-all"
        >
          Products
        </Link>
      </div>
    </div>
  );
};

const OrderComponent = () => {
  const state = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Orders",
        fill: false,
        lineTension: 0.5,
        backgroundColor: [
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
        ],
        borderColor: "rgba(10,10,10,0.1)",
        borderWidth: 2,
        data: [125, 70, 80, 81, 95],
      },
    ],
  };

  return (
    <div style={{ paddingTop: "1rem" }} className="row m-3 text-center">
      <div className="col-sm m-4 p-2 bg-gray-100">
        <div className="p-3">
          <Bar
            data={state}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
        <Link
          className="btn btn-primary px-5 py-10"
          style={{ margin: "10px 65px" }}
          to="/orders/get-all"
        >
          Orders
        </Link>
      </div>
    </div>
  );
};

const ItemComponent = () => {
  const state = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Items",
        fill: false,
        lineTension: 0.5,
        backgroundColor: [
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
        ],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [95, 80, 44, 23, 45],
      },
    ],
  };

  return (
    <div style={{ paddingTop: "1rem" }} className="row m-3 text-center">
      <div className="col-sm m-4 p-2 bg-gray-100">
        <div className="p-3">
          <Line
            data={state}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
        <Link
          className="btn btn-primary px-5 py-10"
          style={{ margin: "10px 65px" }}
          to="/items/get-all"
        >
          Items
        </Link>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <>
      <Grid container justify="center">
        <Grid item lg={5}>
          <CustomerComponent />
        </Grid>

        <Grid item lg={5}>
          <ProductComponent />
        </Grid>

        <Grid item lg={5}>
          <ItemComponent />
        </Grid>

        <Grid item lg={5}>
          <OrderComponent />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
