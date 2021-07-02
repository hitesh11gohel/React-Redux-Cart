import React from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const EditOrder = () => {
  const { id } = useParams();
  let history = useHistory();

  const [orderData, setOrderData] = React.useState({
    total_amount: "",
    customer_id: "",
  });

  const {total_amount, customer_id} = orderData;

  const onChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

 // Get All Order
  const loadOrder = async (req, res, next) => {
    const result = await axios.get(`http://127.0.0.1:3333/api/orders/${id}`);
    console.log(result.data.order_Info);
    setOrderData(result.data.order_Info);
  };

  React.useEffect(() => {
    loadOrder(); // eslint-disable-next-line
  }, []);

  const onSubmit = async () => {
    await axios.patch(`http://127.0.0.1:3333/api/orders/${id}`, {total_amount, customer_id });
    history.push("/orders/get-all");
  };

  return (
    <div className="h-screen flex bg-blue-200">
      <div className="m-auto flex flex-col">
        <h1 className="mb-3 p-4 text-5xl">Edit Order</h1>

        <div>
          <label className="mr-3 font-bold">Customer ID :</label>
          <input
            type="text"
            name="customer_id"
            value={orderData.customer_id}
            onChange={onChange}
            placeholder="Update Customer Id"
            className="p-2 m-1 rounded-md outline-none"
          />
        </div>

        <div>
          <label className="mr-1 font-bold">Total Amount : </label>
          <input
            type="text"
            name="total_amount"
            value={orderData.total_amount}
            onChange={onChange}
            placeholder="Update Total Amount"
            className="p-2 m-1 rounded-md outline-none"
          />
        </div>

        <button
          className="p-2 mt-4 focus:outline-none rounded-lg text-lg btn btn-primary"
          onClick={onSubmit}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditOrder;
