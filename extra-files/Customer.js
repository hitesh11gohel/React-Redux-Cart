import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Customer = (props) => {
  const [customer_name, setName] = React.useState("");
  let history = useHistory();
  
  const addCustomer = async () => {
    await axios
      .post("http://127.0.0.1:3333/api/customers", { customer_name })
      .then((response) => {
        console.log('From TextField : ' + customer_name);
        history.push("/allCustomer");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    const getData = async () => {
      if (props.id) {
        const data = await axios.get("http://127.0.0.1:3333/api/customers/");
        console.log(data.data.customer_name);
      }
    };
  }, []);

  return (
    <>
      <div className="h-screen flex">
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
            onClick={addCustomer}
            className="p-2 mt-4 focus:outline-none rounded-lg text-lg bg-blue-200"
          >
            Add Customer
          </button>
        </div>
      </div>
    </>
  );
};

export default Customer;
