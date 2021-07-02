import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
// import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
// import DashItem from "./../../Tables/DashItem";

const Customer = (props) => {
  const [Customer, setCustomer] = useState([]);
  const getCustomers = async () => {
    const allData = await axios.get(
      `http://127.0.0.1:3333/api/customers/${props.id}`
    );
    // console.log("Customers : ", allData.data);
    setCustomer(allData.data.Customer_Info);
  };

  useEffect(() => {
    getCustomers(); // eslint-disable-next-line
  }, []);

  return (
    <>
      <div>Customer Name : {Customer.customer_name}</div>
    </>
  );
};

const DashOrders = () => {
  const [data, setData] = React.useState([]);
  let history = useHistory();

  const [Load, setLoad] = React.useState(true);
  const Message = () => {
    return (
      <div className="text-dark p-4">
        <h3>Data Not Available .......... </h3>
      </div>
    );
  };

  const getItemsByCustomer = async (id) => {
    history.push(`/customer/items/${id}`);
    console.log("id: ", id);
  };

  const getOrders = async () => {
    await axios.get("http://127.0.0.1:3333/api/orders").then((res) => {
      if (res.status === 201) {
        setLoad(true);
      } else {
        setLoad(false);
        setData(res.data.orders);
      }
    });
  };

  React.useEffect(() => {
    getOrders(); // eslint-disable-next-line
  }, [getOrders()]);

  // const updateOrder = async (id) => {
  //   history.push(`/orders/edit/${id}`);
  // };

  const deleteOrder = async (id) => {
    console.log("Deleted", id);
    await axios.delete(`http://127.0.0.1:3333/api/orders/${id}`);
    getOrders();
    alert(`Order Deleted of : ${id}`)
  };

  return (
    <div style={{ paddingTop: "5rem" }}>
      {Load ? (
        Message()
      ) : (
        <>
        {/* <button
            className="btn btn-primary float-end px-1"
            onClick={() => history.push("/orders/add")}
            style={{ margin: "10px 65px 0px 0px" }}
          >
            + Create Order
        </button> */}
          
          <button
            className="btn btn-primary float-end px-3"
            onClick={() => history.push("/item/add")}
            style={{ margin: "10px 65px" }}
          >
            + Create Item
          </button>
          <div className="container ... flex">
            <table className="table table-bordered table-fixed">
              <thead className="table-dark">
                <tr>
                  <th scope="col" width="10">
                    #
                  </th>
                  <th scope="col" width="20">
                    Order No
                  </th>
                  <th scope="col" width="30">
                    Order Date
                  </th>
                  <th scope="col" width="30">
                    Order Amount
                  </th>
                  <th scope="col" width="40">
                    Customer Info
                  </th>
                  <th scope="col" width="20" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              {data.map((item, i) => (
                <tbody key={i}>
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{item.order_no}</td>
                    <td>{item.order_date.substr(0, 10)}</td>
                    <td>Rs. {item.total_amount}.00</td>
                    <td>
                      Customer Id : {item.customer_id}
                      <Customer id={item.customer_id} />
                    </td>
                    <td className="text-center">
                      {/* <button
                        className="px-3 mx-2"
                        onClick={() => updateOrder(item.order_no)}
                      >
                        <EditIcon className="text-success" />
                      </button> */}

                      <button
                        className="px-3 mx-2"
                        onClick={() => {
                          getItemsByCustomer(item.order_no);
                        }}
                      >
                        <VisibilityIcon />
                      </button>

                      <button
                        className="px-3 mx-2"
                        onClick={() => deleteOrder(item.order_no)}
                      >
                        <DeleteIcon className="text-danger" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default DashOrders;
