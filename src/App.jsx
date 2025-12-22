import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./NavBar";
import Footer from "./Footer";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import PostDetails from "./Pages/PostDetails";
import ProductDetails from "./Pages/ProductDetails";
import Product from "./Pages/Product";
// import Login from "./Pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cart, setCart] = useState([])

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
  }

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart cart = {cart}/>} />
        <Route path="/product/:productId" element={<ProductDetails addToCart={addToCart}/>}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
