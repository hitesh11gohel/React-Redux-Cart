import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router";
// import EditCustomer from "./../Services/EditCustomer";

const Customers = () => {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const editCustomer = async (id) => {
    // <EditCustomer id={id} />;
    console.log("from All Customer : ", id);
    history.push(`/customers/edit/${id}`);
  };

  const deleteCustomer = async (id) => {
    await axios
      .delete(`http://127.0.0.1:3333/api/customers/${id}`)
      .then((res) => {
        setError("Customer Is delete");
        getData();
        alert("Customer Deleted");
        history.push("/customers/get-all");
      })
      .catch((err) => {
        setError(id + "is not delete <br>" + err);
        console.log(error);
      });
    console.log("Customer is deleted ");
  };

  const getData = async () => {
    const result = await axios.get("http://127.0.0.1:3333/api/customers");
    console.log(result.data.all_Customer);
    setData(result.data.all_Customer);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div style={{ paddingTop: "5rem" }}>
        <button
          className="btn btn-primary float-end px-3"
          onClick={() => history.push("/customers/add")}
          style={{ margin: "10px 55px" }}
        >
          + Create New
        </button>
        <div className="container ... flex">
          <table className="table table-bordered table-fixed ">
            <thead className="table-dark">
              <tr>
                <th scope="col" width="20">
                  #
                </th>
                <th scope="col" width="30">
                  Customer Id
                </th>
                <th scope="col" width="70">
                  Customer Name
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
                  <td>{item.customer_id}</td>
                  <td>{item.customer_name}</td>
                  <td>
                    <button
                      onClick={() => editCustomer(item.customer_id)}
                      className="px-3 mx-2 my-1 "
                    >
                      <EditIcon className="text-success" />
                    </button>
                    <button
                      onClick={() => deleteCustomer(item.customer_id)}
                      className="px-3 mx-2 my-1"
                    >
                      <DeleteIcon className="text-danger" />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default Customers;
