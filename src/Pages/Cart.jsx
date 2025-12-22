import { useState } from "react"
import "./Cart.css"
import { Link } from "react-router-dom"

export default function Cart({cart}){

  const [count, setCount] = useState(0)

  return(
    <>
      <div className="cart-details-container">
        {cart.map((cart)=>(
            <div key={cart.id} className="cart-card">
              <img src={cart.thumbnail} alt={cart.title} className="cart-image" />

              <div className="cart-info">
                <h1 className="cart-title">{cart.title}</h1>
                <p className="cart-category">{cart.category}</p>
                <p className="cart-description">{cart.description}</p>
                <p className="cart-price"> {cart.price}</p>
                <p onClick= {() => (setCount(count+1))} style={{ cursor: "pointer" }}>Quantity: {count} </p>
                <Link to={`/product/${cart.id}`} >Product Details</Link>
              </div>
            </div>
          )
        )}
      </div>
    </>
  )
}
