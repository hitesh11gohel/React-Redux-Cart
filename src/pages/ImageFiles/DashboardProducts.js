import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box, Typography, Select, MenuItem } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router";
import { Pagination } from "@material-ui/lab";

export default function DashboardProducts() {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [page, setPage] = useState();
  const [pageNo, setPageNo] = useState("");
  const [limit, setLimit] = useState();

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
    console.log("from DashProducts and P-Id is : ", id);
    history.push(`/product-image/edit/${id}`);
  };

  const deleteProduct = async (id) => {
    console.log("Id : ", id);
    await axios
      .delete(`http://127.0.0.1:3333/api/image/product/${id}`)
      .then(() => {
        getData();
        alert("Product Deleted");
        history.push("/product-image/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("Customer is deleted ");
  };

  const getData = async () => {
    await axios
      .get(`http://localhost:3333/api/image/product/pagination/`)
      .then((res) => {
        console.log(res.data);
        if (res.data.result.data.length > 0) {
          setLoading(false);
          setData(res.data.result.data);
        } else {
          setLoading(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const ChangePage = async (page) => {
    const result = await axios.get(
      `http://localhost:3333/api/image/product/pagination/?page=${page}&limit=${limit}`
    );
    // console.log("TotalPage from ChangePage :", result.data.totalPage);
    setPageNo(result.data.totalPage);
    setData(result.data.result.data);
    // console.clear();
  };

  const FetchRows = async (limit) => {
    const result = await axios.get(
      `http://localhost:3333/api/image/product/pagination/?page=${pageNo}&limit=${limit}`
    );
    // console.log("FetchRows : ", result.data.result.meta.per_page);
    setLimit(result.data.result.meta.per_page);
    let total = result.data.result.meta.total;
    let rows = result.data.result.meta.per_page;
    let page = Math.ceil(total / rows);
    setPage(page);
    setData(result.data.result.data);
    // console.log(result.data)
    // console.log('Total : ',result.data.result.meta.total)
    // console.log('Per_Page : ',result.data.result.meta.per_page)
    // console.log('Total Page :',page)
    // console.clear();
  };

  useEffect(() => {
    if (ChangePage) {
      ChangePage(); // eslint-disable-next-line
    } else if (FetchRows) {
      FetchRows(); // eslint-disable-next-line
    }
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
              onClick={() => history.push("/product-image/add")}
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
                        <img
                          src={`http://127.0.0.1:3333/images/${item.product_img}`}
                          alt="ProductData"
                          style={{
                            width: "auto",
                            height: "100px",
                            margin: "auto auto",
                          }}
                        />
                      </td>
                      <td className="text-center">
                        <b>Rs. {item.product_price}.00</b>
                      </td>
                      <td className="text-center">
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
              <Pagination
                hideNextButton
                hidePrevButton
                size="large"
                color="primary"
                count={page}
                className="float-right"
                onChange={(page) => {
                  // console.log(page.target)
                  ChangePage(page.target.innerText);
                }}
              />
              <Box style={{ display: "flex" }}>
                <Typography variant="subtitle1">Rows per page :</Typography>
                <Select
                  number={limit}
                  onChange={(limit) => {
                    console.log("Limit : ", limit.target.value);
                    FetchRows(limit.target.value);
                  }}
                >
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="8">8</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                </Select>
              </Box>
            </div>
          </>
        )}
      </div>
    </>
  );
}
