import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AddOrder = (props) => {
  let history = useHistory();
  const [cData, setCData] = React.useState([]);

  const [customer_id, setCustomer_id] = React.useState("");
  const [total_amount, setTotal_amount] = React.useState("");

  const getCustomers = async () => {
    const result = await axios.get(`http://127.0.0.1:3333/api/customers`);
    console.log(result.data.all_Customer);
    setCData(result.data.all_Customer);
  };

  React.useEffect(() => {
    getCustomers();
  }, []);

  // const [cId, setCId] = React.useState("");

  // const [order, setOrder] = React.useState({
  //   customer_id: "",
  //   // order_date: "",
  //   total_amount: "",
  // });

  // const onChange = (e) => {
  //   setOrder({ ...order, [e.target.name]: e.target.value });
  // };

  const onSubmit = async () => {
    console.log(customer_id, total_amount);
    axios
      .post(`http://127.0.0.1:3333/api/orders`, {customer_id, total_amount})
      .then((response) => {
        history.push("/orders/get-all");
      })
      .catch((err) => {
        console.log(`Error : ${err}`);
      });
  };

  return (
    <>
      <div className="h-screen flex bg-blue-200">
        <div className="m-auto flex flex-col">
          <h1 className="mb-3 p-4 text-5xl">Add Order</h1>

          <select
            className="p-3 m-1 rounded-md outline-none"
            aria-label="Customer Id"
            onChange={(e) => setCustomer_id(e.target.value)}

            >
            <option defaultValue="">Customer Name</option>
            {cData.map((item, i) => (
              <option
                key={item.customer_id}
                value={item.customer_id}
              >
                {item.customer_name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="total_amount"
            value={total_amount}
            onChange={(e) => setTotal_amount(e.target.value)}
            // onChange={onChange}
            placeholder="Enter Total Amount"
            className="p-3 m-1 rounded-md outline-none"
          />

          <button
            className="p-2 mt-4 focus:outline-none rounded-lg text-lg btn btn-primary"
            onClick={onSubmit}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default AddOrder;
