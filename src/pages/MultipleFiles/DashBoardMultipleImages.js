import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useHistory } from "react-router-dom";

const ProductImages = (props) => {
  const [image, setImage] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  const loadImage = async () => {
    await axios
      .get(`http://127.0.0.1:3333/api/multiple-images/mayurs/${props.id}`)
      .then((res) => {
        setImage(res.data.result);
        setIsLoad(true);
      });
  };

  useState(() => {
    loadImage();
  }, []);

  return (
    <>
      {isLoad && (
        <img
          src={`http://127.0.0.1:3333/productImages/${image}`}
          alt="newImage"
        />
      )}
    </>
  );
};

const DashBoardMultipleImages = () => {
  let history = useHistory();
  const [data, setData] = useState([]);

  const [Loading, setLoading] = useState(true);
  const LoadingMessage = () => {
    return (
      <>
        <div style={{ margin: "4rem" }}>
          <h1>Loading ...</h1>
          <p>Fetching data from Server ...</p>
        </div>
      </>
    );
  };

  const editProduct = async (id) => {
    history.push(`/multiple-images/view-all-files/${id}`);
  };

  const deleteProduct = async (id) => {
    await axios
      .delete(`http://127.0.0.1:3333/api/multiple-images/product/${id}`)
      .then(() => {
        getData();
        history.push("/multiple-images/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = async () => {
    await axios
      .get(`http://127.0.0.1:3333/api/multiple-images/get`)
      .then((res) => {
        if (res.data.length > 0) {
          setLoading(false);
          setData(res.data);
        } else {
          setLoading(true);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData(); // eslint-disable-next-line
  }, []);

  return (
    <>
      <div style={{ paddingTop: "5rem" }}>
        {Loading ? (
          LoadingMessage()
        ) : (
          <>
            <button
              className="btn btn-primary float-end px-3"
              onClick={() => history.push("/multiple-images/add")}
              style={{ margin: "10px 65px" }}
            >
              + Create New
            </button>
            <div className="container">
              <table className="table table-bordered table-fixed table-hover">
                <thead className="table-dark text-center">
                  <tr>
                    <th scope="col" width="5">
                      ID
                    </th>
                    <th scope="col" width="40" className="text-left">
                      Product Name
                    </th>
                    <th scope="col" width="10">
                      Product Image
                    </th>
                    <th scope="col" width="10">
                      Product Price
                    </th>
                    <th scope="col" width="10">
                      Action
                    </th>
                  </tr>
                </thead>
                {data.map((item, i) => (
                  <tbody key={i}>
                    <tr>
                      <th scope="row" className="text-center">
                        {item.product_id}
                      </th>
                      <td>
                        <b>{item.product_name}</b>
                        <p>
                          Description :
                          <span className="text-gray-500">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vestibulum eget tortor eu libero sollicitudin
                            lobortis. Donec pellentesque erat non blandit
                            ornare. Morbi magna justo, efficitur eu imperdiet
                            at, fermentum vulputate nunc. Vestibulum malesuada
                            ipsum eget dui venenatis feugiat. Vestibulum nec
                            varius nisi.
                          </span>
                        </p>
                      </td>

                      <td className="text-center">
                        <ProductImages id={item.product_id} />
                      </td>

                      <td className="text-center">
                        <b>Rs. {item.product_price}.00</b>
                      </td>

                      <td className="text-center">
                        <button
                          className="px-3 m-1"
                            onClick={() => editProduct(item.product_id)}
                        >
                          <VisibilityIcon />
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
          </>
        )}
      </div>
    </>
  );
};

export default DashBoardMultipleImages;
