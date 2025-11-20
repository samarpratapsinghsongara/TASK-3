import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./NavBar";
import Footer from "./Footer";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import PostDetails from "./Pages/PostDetails";
import ProductDetails from "./Pages/ProductDetails";
import Product from "./Pages/Product";
import Login from "./Pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
  }

  return (
    <>
      <ResponsiveAppBar />
      { !isLoggedIn ? (<Login onLogin={handleLoginSuccess}/>) : (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<ProductDetails/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
      )}
      <Footer />
    </>
  );
}

export default App;
