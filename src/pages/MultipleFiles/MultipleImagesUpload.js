import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const MultipleImagesUpload = () => {
  let history = useHistory();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImg, setProductImg] = useState([]);

  const onSubmit = async () => {
    // alert("clicked");
    console.log("Data :", { productName, productPrice, productImg });
    console.log(productImg);

    debugger;
    const productData = new FormData();
    // productData.append("image", productImg);
    productData.append('productName', productName);
    productData.append('productPrice', productPrice);
    for (var i1 = 0; i1 < productImg.length; i1++) {
      productData.append('productImages[]', productImg[i1])
    }
    console.log("Product Info : ", productData);

    await axios
      .post(`http://127.0.0.1:3333/api/multiple-images/add`, productData)
      .then(() => {
        console.log(productData);
        history.push('/multiple-images/dashboard')
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  return (
    <>
      <div style={{ margin: "10rem 5rem " }}>
        <div className="m-auto" style={{ width: "450px" }}>
          <h1 className="text-center my-4">Add Multiple Images</h1>
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
            <div className="col-sm-10">
              <input
                type="file"
                multiple
                className="form-control"
                id="inputProductFile1"
                placeholder="Upload"
                onChange={(e) => setProductImg(e.target.files)}
              />
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

export default MultipleImagesUpload;
