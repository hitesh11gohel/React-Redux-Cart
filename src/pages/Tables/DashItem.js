import axios from "axios";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const ProductData = (props) => {
  const [productData, setProductData] = useState([]);
  const getProducts = async () => {
    await axios
      .get(`http://127.0.0.1:3333/api/products/${props.id}`)
      .then((res) => {
        setProductData(res.data.product);
      });
  };

  useEffect(() => {
    getProducts(); //eslint-disable-next-line
  }, []);

  return (
    <>
      <div>Name : {productData.product_name}</div>
    </>
  );
};

const DashItem = (props) => {
  let id = props.match.params.id;
  const history = useHistory();
  const [OrderData, setOrderData] = useState([]);
  const [cName, setCName] = useState("");

  const [Load, setLoad] = React.useState(true);
  const Message = () => {
    return (
      <div className="text-dark p-4">
        <h3>Item Data Not Available .......... </h3>
      </div>
    );
  };

  const loadItems = async () => {
    await axios
      // .get(`http://127.0.0.1:3333/api/orders/items/${id}`)
      .get(`http://127.0.0.1:3333/api/three-joins/${id}`)
      .then((res) => {
        if (res.status === 201) {
          setLoad(true);
        } else {
          setLoad(false);
          console.log("Item Data :", res.data);
          setCName(res.data.Data[0].customer_name);
          setOrderData(res.data.Data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadItems(); //eslint-disable-next-line
  }, []);

  const onDelete = async (id) => {
    alert(`Item ${id} Deleted `);
    await axios.delete(`http://127.0.0.1:3333/api/items/delete/${id}`);
  };

  return (
    <>
      <div className="container" style={{ padding: "5rem" }}>
        {Load ? (
          Message()
        ) : (
          <>
            <div>
              <button
                type="button"
                onClick={() => history.push("/orders/get-all")}
                className="btn btn-outline-light text-dark my-3"
              >
                <ArrowBackIosIcon />
              </button>
            </div>
            <h3 className="mx-3 text-right">Customer Name : {cName}</h3>
            <div className="container ... flex">
              <table className="table table-fixed">
                <thead className="table-dark">
                  <tr className="text-center">
                    <th scope="col" width="10">
                      {" "}
                    </th>
                    <th scope="col" width="25">
                      Order No
                    </th>
                    <th scope="col" width="25">
                      Item No
                    </th>
                    <th scope="col" width="30">
                      Product Id
                    </th>
                    <th scope="col" width="50">
                      Product Info
                    </th>
                    <th scope="col" width="30">
                      Price
                    </th>
                    <th scope="col" width="25">
                      Quantity
                    </th>
                    <th scope="col" width="40">
                      Total Price
                    </th>
                    <th scope="col" width="50">
                      Customer
                    </th>
                    <th scope="col" width="25"></th>
                  </tr>
                </thead>
                {OrderData.map((item, i) => (
                  <tbody key={i}>
                    <tr className="text-center">
                      <th scope="row">{i + 1}</th>
                      <td>{item.order_no}</td>
                      <td>{item.item_no}</td>
                      <td>{item.product_id}</td>
                      <td>
                        Product Id : {item.product_id}
                        <ProductData id={item.product_id} />
                      </td>
                      <td>Rs. {item.price_per_item}</td>
                      <td>{item.quantity}</td>
                      <td>Rs. {item.total_amount}.00</td>
                      <td>{item.customer_name}</td>
                      <td>
                        <button onClick={() => onDelete(item.item_no)}>
                          <DeleteForeverIcon className="text-danger" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DashItem;
