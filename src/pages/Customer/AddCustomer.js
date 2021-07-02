import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddCustomer = (props) => {
  const [customer_name, setName] = useState("");
  let history = useHistory();

  const add = async () => {
    await axios
      .post("http://127.0.0.1:3333/api/customers", { customer_name })
      .then((response) => {
        console.log("From TextField : " + customer_name);
        history.push("/customers/get-all");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = async () => {
    if (props.id) {
      const data = await axios.get("http://127.0.0.1:3333/api/customers");
      console.log(data);
    }
  };

  useEffect(() => {
    getData(); //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="h-screen flex bg-blue-200">
        <div className="m-auto flex flex-col">
          <h1 className="mb-4 p-4 text-5xl">Add Customer</h1>
          <input
            type="text"
            value={customer_name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Customer Name"
            className="p-3 rounded-md outline-none"
          ></input>
          <button
            onClick={add}
            className="p-2 mt-4 focus:outline-none rounded-lg text-lg btn btn-primary"
          >
            Add Customer
          </button>
        </div>
      </div>
    </>
  );
};

export default AddCustomer;
