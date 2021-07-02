import {
    AppBar,
    Button,
    IconButton,
    makeStyles,
    Toolbar,
    Typography,
  } from "@material-ui/core";
  import React from "react";
  import MenuIcon from "@material-ui/icons/Menu";
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  
  const Header = () => {
    const classes = useStyles();
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Epistic
            </Typography>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Register</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  };
  
  export default Header;

// ----------------------------------------------------------------------------------------------------------------------


  import React from "react";
  import axios from "axios";
  import { useHistory } from "react-router-dom";
  
  const Customer = (props) => {
    const [customer_name, setName] = React.useState("");
    let history = useHistory();
    
    const addCustomer = async () => {
      await axios
        .post("http://127.0.0.1:3333/api/customber", { name: customer_name })
        .then((response) => {
          history.push("/customers");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    
    React.useEffect(() => {
      const getData = async () => {
        if (props.id) {
          const data = await axios.get("http://127.0.0.1:3333/api/customber/");
          console.log(data);
        }
      };
    }, []);

    return (
      <>
        <div className="h-screen flex bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 ...">
          <div className="m-auto flex flex-col">
            <h1 className="mb-4 p-4 text-5xl">Add Customer</h1>
            <input
              type="text"
              value={customer_name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Customer Name"
              className="p-4 rounded-lg outline-none"
            ></input>
            <button
              onClick={addCustomer}
              className="p-4 mt-4 focus:outline-none rounded-lg text-lg font-extrabold"
            >
              Add Customer
            </button>
          </div>
        </div>
      </>
    );
  };
  
  export default Customer;
  
// ----------------------------------------------------------------------------------------------------------------------
  
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router";
import Customer from "./Customer";

const Customers = () => {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  
  const editCustomer = async (id) => {
    <Customer id={id} />;
  };

  const deleteCustomer = async (id) => {
    const delete1 = await axios
      .delete(`http://127.0.0.1:3333/api/customer/${id}`)
      .then((res) => {
        setError("Customber Is delete");
        getData();
        history.push("/customers");
      })
      .catch((err) => {
        setError(id + "is not delete <br>" + err);
      });
  };

  const getData = async () => {
    const data = await axios.get("http://127.0.0.1:3333/api/customer");
    console.log(data.data.customer);
    setData(data.data.customer);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-gradient-to-r h-screen from-green-400 to-blue-500 ... flex">
      <table className="m-auto table-auto border-collapse">
        <tr>
          <td colSpan="5">{error}</td>
        </tr>
        <tr className="text-2xl">
          <th>#</th>
          <th>Customer Name</th>
          <th align="right">Actions</th>
        </tr>

        {data.map((item, i) => (
          <tr key={i} className="mt-4 p-2 text-white text-center text-xl">
            <td>{item.customer_id}</td>
            <td>{item.customer_name}</td>
            <td
              onClick={() => editCustomer(item.customer_id)}
              className="text-blue-900"
            >
              <EditIcon />
            </td>
            <td
              onClick={() => deleteCustomer(item.customer_id)}
              className="text-red-900"
            >
              <DeleteIcon />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Customers;
