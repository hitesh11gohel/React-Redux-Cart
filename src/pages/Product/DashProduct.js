import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router";
// import EditProduct from "./../Services/EditProduct";

const DashProduct = () => {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  console.log(error);

  const editProduct = async (id) => {
    // <EditProduct id={id} />
    console.log("from DashProducts and P-Id is : ", id);
    history.push(`/product/edit/${id}`);
  };

  const deleteProduct = async (id) => {
    await axios
      .delete(`http://127.0.0.1:3333/api/products/${id}`)
      .then((res) => {
        setError("Product Is delete");
        getData();
        alert("Product Deleted");
        history.push("/products/get-all");
      })
      .catch((err) => {
        setError(id + "is not delete <br>" + err);
      });
    console.log("Customer is deleted ");
  };

  const getData = async () => {
    const result = await axios.get("http://127.0.0.1:3333/api/products");
    console.log(result.data.products);
    setData(result.data.products);
  };

  useEffect(() => {
    getData(); // eslint-disable-next-line
  }, [getData()]);

  return (
    <>
      <div style={{ paddingTop: "5rem" }}>
        <button
          className="btn btn-primary float-end px-3"
          onClick={() => history.push("/product/add")}
          style={{ margin: "10px 65px" }}
        >
          + Create New
        </button>
        <div className="container ... flex">
          <table className="table table-bordered ">
            <thead className="table-dark">
              <tr>
                <th scope="col" width="50">
                  #
                </th>
                <th scope="col" width="70">
                  Product Id
                </th>
                <th scope="col" width="200">
                  Product Name
                </th>
                <th scope="col" width="200">
                  Product Price
                </th>
                <th scope="col" width="50" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            {data.map((item, i) => (
              <tbody key={i}>
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{item.product_id}</td>
                  <td>{item.product_name}</td>
                  <td>Rs. {item.product_price}.00</td>
                  <td>
                    <button
                      className="px-3 m-1"
                      onClick={() => editProduct(item.product_id)}
                    >
                      <EditIcon className="text-success" />
                    </button>
                    <button
                      className="px-3 m-1"
                      onClick={() => deleteProduct(item.product_id)}
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

export default DashProduct;
