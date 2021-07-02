import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
const Header = () => {
  return (
    <AppBar className="bg-dark">
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          style={{ flexGrow: 1 }}
          component={Link}
          to="/"
        >
          Epistic Technologies
        </Typography>

        <div>
          <Button color="inherit" component={Link} to="/multiple-images/dashboard">
            Multi Files
          </Button>

          <Button color="inherit" component={Link} to="/customers/get-all">
            Customers
          </Button>

          <Button color="inherit" component={Link} to="/products/get-all">
            Products
          </Button>

          <Button color="inherit" component={Link} to="/orders/get-all">
            Orders
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/product-image/dashboard"
          >
            Items
          </Button>

          <Button color="inherit" component={Link} to="/dashboard">
            <DashboardIcon />
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
