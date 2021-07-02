import React from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const Update = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [product_name, setProduct_name] = React.useState("");
  const [product_price, setProduct_price] = React.useState("");

  const onSubmit = async () => {
    await axios.patch(`http://127.0.0.1:3333/api/products/${id}`, {product_name, product_price})
    history.push("/products/get-all");
  };

  const loadProduct = async () => {
    const result = await axios.get(`http://127.0.0.1:3333/api/products/${id}`);
    console.log(result.data.product.product_name);
    setProduct_name(result.data.product.product_name)
    setProduct_price(result.data.product.product_price)
  };

  React.useEffect(() => {
    loadProduct(); // eslint-disable-next-line
  }, []);

  return (
    <div className="h-screen flex bg-blue-200">
      <div className="m-auto flex flex-col">
        <h1 className="mb-3 p-4 text-5xl">Edit Product</h1>
        <input
          type="text"
          name="product_name"
          placeholder="Update Product"
          className="p-3 m-1 rounded-md outline-none"
          value={product_name}
          onChange={(e) => setProduct_name(e.target.value)}
        />
        <input
          type="text"
          name="product_name"
          placeholder="Update Product"
          className="p-3 m-1 rounded-md outline-none"
          value={product_price}
          onChange={(e) => setProduct_price(e.target.value)}
        />
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

const EditProduct = () => {
  return (
    <>
      <Update />
    </>
  );
};

export default EditProduct;
