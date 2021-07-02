import Login from "./pages/Main/Login";
import Register from "./pages/Main/Register";
import Home from "./pages/Main/Home";
import Header from "./HnF/Header";
import Footer from "./HnF/Footer";

import AddProduct from "./pages/Product/AddProducts";
import ProductTable from "./pages/Product/DashProduct";
import EditProduct from "./pages/Product/EditProduct";

import AddOrder from "./pages/Order/AddOrder";
import OrdersTable from "./pages/Order/DashOrders";
import EditOrder from "./pages/Order/EditOrder";

import Dashboard from "./Dashboard";

import AddCustomer from "./pages/Customer/AddCustomer";
import CustomersTable from "./pages/Customer/DashCustomers";
import EditCustomer from "./pages/Customer/EditCustomer";

import AddItem from "./pages/Tables/AddItem";
import ItemsTable from "./pages/Tables/DashItem";

import ProductWithImage from "./pages/ImageFiles/ProductWithImage";
import DashboardOfProducts from "./pages/ImageFiles/DashboardProducts";
import UpdateProduct from "./pages/ImageFiles/UpdateProduct"

import MultipleImagesUpload from "./pages/MultipleFiles/MultipleImagesUpload";
import DashBoardMultipleImages from "./pages/MultipleFiles/DashBoardMultipleImages";
import ViewAllFiles from "./pages/ImageFiles/ViewAllFiles";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <div className="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          
          <Route exact path="/dashboard" component={Dashboard} />

          <Route exact path="/item/add" component={AddItem} />
          <Route exact path="/customer/items/:id" component={ItemsTable} />
          <Route exact path="/orders/items/:id" component={ItemsTable} />
          <Route exact path="/items/:id" component={ItemsTable} />
          
          <Route exact path="/customers/get-all" component={CustomersTable} />
          <Route exact path="/customers/add" component={AddCustomer} />
          <Route exact path="/customers/edit/:id" component={EditCustomer} />

          <Route exact path="/products/get-all" component={ProductTable} />
          <Route exact path="/product/add" component={AddProduct} />
          <Route exact path="/product/edit/:id" component={EditProduct} />

          <Route exact path="/orders/get-all" component={OrdersTable} />
          <Route exact path="/orders/add" component={AddOrder} />
          <Route exact path="/orders/edit/:id" component={EditOrder} />
          
          <Route exact path="/product-image/add" component={ProductWithImage} />
          <Route exact path="/product-image/dashboard" component={DashboardOfProducts} />
          <Route exact path="/product-image/edit/:id" component={UpdateProduct} />

          <Route exact path="/multiple-images/add"  component={MultipleImagesUpload} />
          <Route exact path="/multiple-images/dashboard"  component={DashBoardMultipleImages} />
          <Route exact path="/multiple-images/view-all-files/:id"  component={ViewAllFiles} />

        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
