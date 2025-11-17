import { useState, useEffect } from "react";
import "./Product.css";
import { Link } from "react-router-dom";

export default function Product() { 
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [sortProduct, setSortProduct] = useState("default");

  const url = "http://localhost:3000/api/v1/products";

  const fetchApi = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      console.log(result)
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  let filterProducts = data.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase()) ||
    product.description.toLowerCase().includes(searchText.toLowerCase()) ||
    product.category.toLowerCase().includes(searchText.toLowerCase())
  );

  if (sortProduct === "ASC") {
    filterProducts = [...filterProducts].sort((a, b) => a.price - b.price);
  } else if (sortProduct === "DESC") {
    filterProducts = [...filterProducts].sort((a, b) => b.price - a.price);
  }

  if (loading) return <p className="loading">Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="home-page">
      <h1 className="title">🛍️ Product Store</h1>

      <div className="filterDiv">
        <input
          type="text"
          placeholder="Search Product"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />

        <select
          value={sortProduct}
          onChange={(e) => setSortProduct(e.target.value)}
          className="sort-select"
        >
          <option value="default">Sort By</option>
          <option value="ASC">Price: Low to High</option>
          <option value="DESC">Price: High to Low</option>
        </select>
      </div>

      <div className="card-container">
        {filterProducts.length > 0 ? (
          filterProducts.map((item) => (
            <div key={item.id} className="card">
              <img src={item.thumbnail} alt={item.title} className="product-img" />
              <div className="card-content">
                <h3>{item.title}</h3>
                <p className="category">{item.category}</p>
                <p className="desc">{item.description.substring(0, 60)}...</p>
                <p className="price">₹ {item.price}</p>
                <Link to={`/product/${item.id}`} className="view-btn">View Details</Link>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">No products found</p>
        )}
      </div>
    </div>
  );
}
