import "./Home.css";
import { Link } from "react-router-dom";
import {products} from "../data/products.js";

export default function Home() {

  return (
    <div className="home-container">
      <h1 className="home-title">🛍️ Trending Products</h1>
      <p className="home-subtitle">Discover the latest and most popular items of the season</p>

      <div className="product-grid">
        {products.map((item) => (
          <div key={item.id} className="product-card">
            <div className="image-wrapper">
              <img src={item.image} alt={item.title} className="product-image" />
            </div>
            <div className="product-content">
              <h3 className="product-title">{item.title}</h3>
              <p className="product-category">{item.category}</p>
              <p className="product-description">{item.description}</p>
              <p className="product-price">₹ {item.price}</p>
              <Link to={`/product/${item.id}`} className="view-btn">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
  