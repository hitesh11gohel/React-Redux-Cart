import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const ViewAllFiles = (props) => {
  const id = props.match.params.id;
  const history = useHistory();
  const [data, setData] = useState([]);

  const loadData = async () => {
    await axios
      .get(`http://127.0.0.1:3333/api/multiple-images/joindata/${id}`)
      .then((res) => {
        // console.log(res.data);
        setData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData(); // eslint-disable-next-line
  }, []);

  return (
    <>
      <div style={{ margin: "10rem 5rem" }}>
        <button
          className="btn btn-light mb-5"
          onClick={() => history.push(`/multiple-images/dashboard`)}
        >
          <ArrowBackIosIcon />
        </button>
        <div className="flex">
          {data.map((item, i) => (
            <div key={i} className="p-auto mx-3 bg-gray-100 p-1">
              <p>Image No : {item.image_id}</p>
              <img
                src={`http://127.0.0.1:3333/productImages/${item.image}`}
                alt="newImageData"
                width="200"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewAllFiles;
