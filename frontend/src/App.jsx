import { Routes, Route, Router } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductListScreen from "./screens/Admin/ProductListScreen";
import ProductAddScreen from "./screens/Admin/ProductAddScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoute from "./screens/PrivateRoute";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrder";
import OrderListScreen from "./screens/Admin/OrderListScreen";
import UserListScreen from "./screens/Admin/UserListScreen";
import ProductEditScreen from "./screens/Admin/ProductEditScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserEditScreen from './screens/Admin/UserEditScreen'

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/page/:pageNumber" element={<HomeScreen />} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              element={<HomeScreen />}
            />

            <Route path="/product/:id" element={<ProductScreen />} />

            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />



        { /*privete Route*/}
            <Route path="" element={<PrivateRoute />}>
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
            </Route>

            {/*Admin Route*/}
            <Route path="/admin/productlist" element={<ProductListScreen />} />
            <Route path="/admin/addproduct" element={<ProductAddScreen />} />
            <Route path="/admin/orderlist" element={<OrderListScreen/>}/>
            <Route path="/admin/userlist" element={<UserListScreen/>}/>
            <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
             <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
          </Routes>
        </Container>
      </main>

      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;
