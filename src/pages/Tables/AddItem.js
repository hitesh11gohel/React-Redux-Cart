import axios from "axios";
import React, { useEffect, useState, memo } from "react";
import { useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
// import EditIcon from "@material-ui/icons/Edit";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";

const Demo = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  // const [order_no, setOrder_no] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customer_id, setCustomer_id] = useState("");

  const [data, setData] = useState([]);

  const [customer, setCustomer] = useState([]);
  const loadCustomer = async () => {
    await axios.get("http://127.0.0.1:3333/api/customers").then((res) => {
      if (res.status === 201) {
        setIsLoading(true);
      } else {
        setCustomer(res.data.all_Customer);
        setIsLoading(false);
      }
    });
  };

  const [product, setProduct] = useState([]);
  const loadProduct = async () => {
    await axios.get("http://127.0.0.1:3333/api/products").then((res) => {
      if (res.status === 201) {
        setIsLoading(true);
      } else {
        setProduct(res.data.products);
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    loadCustomer();
    loadProduct();
  }, []);

  const deleteItem = async (product_no, total_amount) => {
    setData([...data.filter((id) => id.product_no !== product_no)]);
    setItemsTotal(itemsTotal - total_amount);
  };

  const message = () => {
    return (
      <div style={{margin: '5rem 2rem'}}>
        <h3 className='text-3xl'>Please Wait ...........</h3>
      </div>
    );
  };

  const [product_id, setProduct_id] = useState("");
  const [price, setPrice] = useState(0);
  const [total_amount, setTotalAmount] = useState(0);
  const [Product_name, setProduct_name] = useState("");

  const AddItem = async () => {
    console.log("AddItem", data);
    setData([
      ...data,
      {
        product_no: product_id,
        Product_name: Product_name,
        quantity: quantity,
        price: price,
        total_amount: total_amount,
      },
    ]);
    setQuantity(1);
    setPrice(0);
    setTotalAmount(0);
    loadCustomer();
    setItemsTotal(itemsTotal + total_amount);
  };

  const [itemsTotal, setItemsTotal] = React.useState(0);
  const [errorMessage, setErrorMassage] = React.useState("");
  const AddOrder = async () => {
    if (customer === "") {
      setErrorMassage("Select Customer .........................");
    } else {
      setErrorMassage("");
      console.log(errorMessage);
      await axios
        .post(`http://127.0.0.1:3333/api/orders`, {
          total_amount: itemsTotal,
          customer_id: customer_id,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("res.data : ", res.data);
            data.map((data, index) =>
              axios
                .post(
                  "http://127.0.0.1:3333/api/item/add",
                  {
                    order_no: res.data.order_no,
                    product_id: data.product_no,
                    quantity: data.quantity,
                    price_per_item: data.price,
                    amount: data.total_amount,
                  },
                  console.log('Product Id : ',product_id)
                )
                .then((res) => history.push("/orders/get-all"))
            );
            // history.push("/orders/get-all");
          }
        });
    }
  };

  const addQuantity = () => {
    if (quantity === 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const handleChange = (event) => {
    setProduct_id(JSON.parse(event.target.value).product_id);
    setProduct_name(JSON.parse(event.target.value).product_name);
    setTotalAmount(JSON.parse(event.target.value).product_price);
    setPrice(JSON.parse(event.target.value).product_price);
    setQuantity(1);
  };

  const handleChangeCustomer = (event) => {
    setCustomer_id(JSON.parse(event.target.value).customer_id);
  };

  useEffect(() => {
    setTotalAmount(price * quantity); // eslint-disable-next-line
  }, [quantity]); 
  
  return (
    <div className="h-screen pt-10 flex">
      <div className="container">
        {isLoading ? (
          message()
        ) : (
          <div
            style={{ marginTop: "50px" }}
            className="p-5 border border-secondary"
          >
            <div className="row">
              <select
                className="form-select form-select-lg"
                aria-label=".form-select-lg example"
                onChange={handleChangeCustomer}
              >
                <option defaultValue="">Customer</option>
                {customer.map((data, index) => (
                  <option
                    // value={data.customer_id}
                    key={index}
                    value={JSON.stringify(data)}
                  >
                    {data.customer_name}
                  </option>
                ))}
              </select>

              {/* <div className="row"> */}
              <div className="col-6 my-3" style={{marginLeft: '-12px'}}>
                <select
                  className="form-select form-select-lg"
                  defaultValue=""
                  onChange={handleChange}
                  aria-label=".form-select-lg example"
                >
                  <option defaultValue="">Product</option>
                  {product.map((data, index) => (
                    <option value={JSON.stringify(data)} key={index}>
                      {data.product_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-6">
                <div className="flex p-3">
                  <div
                    className="w-1/5 rounded-l-md border-1 text-center p-2.5 bg-white"
                    onClick={() => addQuantity()}
                  >
                    <RemoveIcon />
                  </div>
                  <div className="w-1/5 border-1 text-center p-2.5 bg-white">
                    {quantity}
                  </div>
                  <div
                    className="w-1/5 rounded-r-md border-1 p-2.5 bg-white text-center"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <AddIcon />
                  </div>
                </div>
              </div>
              {/* </div> */}

              <div className="text-dark pb-3">
                Product Price : {price} Rs
                <br></br>
                Total Amount : {total_amount}.00 Rs
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={AddItem}>
              <AddIcon /> Add Product
            </button>
          </div>
        )}

        <div className="my-5 p-3 border border-secondary">
          <div className="table-responsive">
            <h3 className="text-center">Total Products</h3>

            <table className="table table-fixed">
              <thead className="table-dark">
                <tr>
                  <td width="40">Product No</td>
                  <td width="20">Quantity</td>
                  <td width="20">Price</td>
                  <td width="20">Total Price</td>
                  <td width="20" className="text-center">
                    Action
                  </td>
                </tr>
              </thead>
              <tbody className="table-light">
                {data.map((item, index) => (
                  <tr key={index} className="text-dark">
                    <td>
                      <div>Product ID: {item.product_no}</div>
                      <div>Product Name: {item.Product_name}</div>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.total_amount}.00</td>
                    <td className="text-center">
                      {/* <button
                        className="px-3 mx-2"
                        // onClick={() => deleteOrder(item.order_no)}
                      >
                        <EditIcon className="text-blue-500" />
                      </button> */}

                      <button
                        className="px-3 mx-2"
                        onClick={() => deleteItem(item.product_no, item.total_amount)}
                      >
                        <DeleteIcon className="text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="my-1">
          <h3 className="text-end">Total Amount : {itemsTotal}</h3>
          <div className="flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary"
              onClick={AddOrder}
            >
              <AddIcon /> Add Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Demo);
