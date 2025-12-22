import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetails.css";

export default function ProductDetails({addToCart}) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      if (!response.ok) throw new Error("Failed to fetch product details");
      const result = await response.json();
      setProduct(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  if (loading) return <p className="loading">Loading product details...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!product) return <p className="no-product">No product found</p>;

  return (
    <div className="product-details-container">
      <div className="product-card">
        <img src={product.thumbnail} alt={product.title} className="product-image" />

        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-category">{product.category}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-price">₹ {product.price}</p>
          <Link to="/" className="back-btn">← Back to Products</Link> <Link className="back-btn" onClick={()=>addToCart(product)}>Add to Cart</Link>
        </div>
      </div>
    </div>
  );
}
