import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const Update = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImg, setProductImg] = useState("");
  const [cover_image, setCover_image] = useState("");

  const onSubmit = async () => {
    console.log("Data", { productName, productPrice, productImg });

    const productData = new FormData();

    if (productImg) {
      productData.append("productImg", productImg);
      productData.append("productName", productName);
      productData.append("productPrice", productPrice);
      await axios
        .patch(
          `http://localhost:3333/api/image/product/update/${id}`,
          productData
        )
        .then((res) => {
          console.log("Success :", res);
          console.log("Name :", productName);
          history.push("/product-image/dashboard");
        })
        .catch((err) => {
          console.log("Error : ", err);
        });
    } else {
      productData.append("productName", productName);
      productData.append("productPrice", productPrice);
      await axios
        .patch(
          `http://localhost:3333/api/image/product/update/${id}`,
          productData
        )
        .then((res) => {
          console.log("Success :", res);
          history.push("/product-image/dashboard");
        })
        .catch((err) => console.log(err));
    }
  };

  const loadProduct = async () => {
    const result = await axios.get(
      `http://localhost:3333/api/image/product/get/${id}`
    );
    console.log(result.data);
    setProductName(result.data.product_name);
    setProductImg(result.data.product_img);
    setCover_image(result.data.product_img);
    setProductPrice(result.data.product_price);

  };

  useEffect(() => {
    loadProduct(); // eslint-disable-next-line
  }, []);


  const [imageState, setImageState] = React.useState();
  const [display, setDisplay] = React.useState("");
  return (
    <>
      <div style={{ margin: "10rem 5rem" }} className="bg-gray-200 p-5">
        <div className="m-auto" style={{ width: "450px" }}>
          <h1 className="text-center my-4">Update Product</h1>
          <div className="form-group row my-4">
            <label
              htmlFor="inputProductName1"
              className="col-sm-2 col-form-label"
            >
              Name :
            </label>
            <div className="col-sm-10">
              <input
                type="name"
                className="form-control"
                id="inputName1"
                placeholder="Enter Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row my-4">
            <label
              htmlFor="inputProductPrice1"
              className="col-sm-2 col-form-label"
            >
              Price :
            </label>
            <div className="col-sm-10">
              <input
                type="price"
                required
                className="form-control"
                id="inputName1"
                placeholder="Enter Product Price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row my-4">
            <label
              htmlFor="inputProductFile1"
              className="col-sm-2 col-form-label"
            >
              Image :
            </label>
            <div className="col-sm-6">
              <input
                type="file"
                required 
                onChange={(e) => {
                  setProductImg(e.target.files[0]);
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (reader.readyState === 2) {
                      setImageState(reader.result);
                      setDisplay("none");
                    }
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }}
              />
            </div>
            <div className="col-sm-4">
              <img
                style={{ display: `${display}` }}
                src={`http://127.0.0.1:3333/images/${cover_image}`}
                alt="cover_image"
                width="100px"
                height="100px"
              />
              <img src={imageState} alt="" className="mt-2" width="100px" />
            </div>
          </div>

          <div className="form-group row my-4">
            <div className="col-sm-12">
              <button
                type="submit"
                className="btn w-full btn-primary"
                onClick={() => onSubmit()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

const UpdateProduct = () => {
  return (
    <>
      <Update />
    </>
  );
};

export default UpdateProduct;
