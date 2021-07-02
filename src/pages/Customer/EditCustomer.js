import React, { useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditCustomer = (props) => {
  let history = useHistory();
  const { id } = useParams();
  const [customer_name, setCustomer_name] = React.useState("");

  const loadUser = async () => {
    const result = await axios.get(`http://127.0.0.1:3333/api/customers/${id}`);
    // console.log(result.data.Customer_Info);
    setCustomer_name(result.data.Customer_Info.customer_name);
  };

  useEffect(() => {
    loadUser(); // eslint-disable-next-line
  }, []);

  const handleSubmit = async () => {
    await axios
      .put(`http://127.0.0.1:3333/api/customers/${id}`, {customer_name})
      .then((response) => {
        console.log("From TextField : " + customer_name);
        history.push("/customers/get-all");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="h-screen flex bg-blue-200">
        <div className="m-auto flex flex-col">
          <h1 className="mb-3 p-4 text-5xl">Update Customer</h1>

          <input
            type="text"
            name="name"
            value={customer_name}
            onChange={(e) => setCustomer_name(e.target.value)}
            placeholder="Enter Customer Name"
            className="p-3 m-1 rounded-md outline-none"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="p-2 mt-4 focus:outline-none rounded-lg text-lg btn btn-primary"
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default EditCustomer;
