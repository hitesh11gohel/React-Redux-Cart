import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Products = (props) => {
  let history = useHistory();
  const [products, setProducts] = React.useState({
    product_name: "",
    product_price: "",
  });


  const onChange = (e) => {
    setProducts({ ...products, [e.target.name]: e.target.value });
  };

  const onSubmit = async (data) => {
    await axios
      .post(`http://127.0.0.1:3333/api/products`, products)
      .then((response) => {
        history.push('/products/get-all')
      })
      .catch((err) => {
        console.log(`Error : ${err}`);
      });
  };

  return (
    <>
      <div className="h-screen flex bg-blue-200">
        <div className="m-auto flex flex-col">
          <h1 className="mb-3 p-4 text-5xl">Add Product</h1>
          
          <input
            type="text"
            name="product_name"
            value={products.product_name}
            onChange={onChange}
            placeholder="Enter Product Name"
            className="p-3 m-1 rounded-md outline-none"
          />
          <input
            type="text"
            name="product_price"
            value={products.product_price}
            onChange={onChange}
            placeholder="Enter Product Price"
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

export default Products;
