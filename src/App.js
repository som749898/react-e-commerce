import Mockman from "mockman-js";
import {Routes, Route} from "react-router-dom";

import "./App.css";
import {HomePage} from "./Pages/01. HomePage/HomePage"
import { Signup } from "./Pages/02. Signup/Signup";
import { Login } from "./Pages/08. Login/Login";
import {ProductList} from "./Pages/03. ProductList/ProductList";
import {ProductDetail} from "./Pages/04. ProductDetail/ProductDetail";
import {WishList} from "./Pages/05. WishList/WishList";
import { Cart } from "./Pages/06. Cart/Cart";
import {Checkout} from "./Pages/07. Checkout/Checkout";
import { Profile } from "./Pages/09. Profile/Profile";
import {OrderSummary} from "./Pages/10. OrderSummary/OrderSummary";
import { RequireAuth } from "./Components/10. RequireAuth/RequireAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList/>} />
        <Route path="/products/:categorySelected" element={<ProductList/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/book/:id" element={<ProductDetail/>} />
        <Route path="/wishlist" element={
        <RequireAuth>
          <WishList/>
        </RequireAuth>
        } />
        <Route path="/cart" element={
        <RequireAuth>
          <Cart/>
        </RequireAuth>
        } />
        <Route path="/checkout" element={
        <RequireAuth>
          <Checkout/>
        </RequireAuth>
        } />
        <Route path="/profile" element={
        <RequireAuth>
          <Profile/>
        </RequireAuth>
        } />
        <Route path="/order/summary" element={<OrderSummary/>} />
      </Routes>
    </div>
  );
}

export default App;
