import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router";
import Customer from "./Customer";

const AllCustomer = () => {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const editCustomer = async (id) => {
    <Customer id={id} />;
  };

  const deleteCustomer = async (id) => {
    const delete1 = await axios
      .delete(`http://127.0.0.1:3333/api/customers/${id}`)
      .then((res) => {
        setError("Customer Is delete");
        getData();
        history.push("/allCustomer");
      })
      .catch((err) => {
        setError(id + "is not delete <br>" + err);
      });
  };

  const getData = async () => {
    const data = await axios.get("http://127.0.0.1:3333/api/customers");
    console.log(data.data.all_Customer);
    setData(data.data.all_Customer);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-gradient-to-r h-screen from-green-400 to-blue-500 ... flex">
      <table className="m-auto table-auto border-collapse">
        <tr>
          <td colSpan="6">{error}</td>
        </tr>
        <tr className="text-2xl">
          <th>#</th>
          <th>C_Id</th>
          <th>Customer Name</th>
          <th align="right">Actions</th>
        </tr>

        {data.map((item, i) => (
          <tr key={i} className="mt-4 p-2 text-white text-center text-xl">
            <td>{i+1}</td>
            <td>{item.customer_id}</td>
            <td>{item.customer_name}</td>
            <td
              onClick={() => editCustomer(item.customer_id)}
              className="text-blue-900"
            >
              <EditIcon />
            </td>
            <td
              onClick={() => deleteCustomer(item.customer_id)}
              className="text-red-900"
            >
              <DeleteIcon />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default AllCustomer;
