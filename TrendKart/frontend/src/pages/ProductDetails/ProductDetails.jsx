
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/admin/products/${id}`
      );

      setProduct(response.data.product);
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  const addToCart = () => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = existingCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert("Product added to cart 🛒");

    navigate("/cart");
  };

  if (!product) {
    return (
      <div className="product-loading">
        Loading product...
      </div>
    );
  }

  return (
    <div className="product-details-page">

      <div className="product-details-container">

        {/* IMAGE */}

        <div className="details-image">

          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
            />
          ) : (
            <div className="details-placeholder">
              👕
            </div>
          )}

        </div>

        {/* DETAILS */}

        <div className="details-content">

          <p className="details-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <div className="details-rating">
            ⭐⭐⭐⭐⭐
            <span> 4.8 (24 Reviews)</span>
          </div>

          <h2 className="details-price">
            ₹{product.price}
          </h2>

          <p className="details-description">
            {product.description ||
              "Stylish and comfortable fashion product from TrendKart."}
          </p>

          <div className="details-stock">
            {product.stock > 0
              ? `✓ ${product.stock} items available`
              : "✕ Out of stock"}
          </div>

          {/* QUANTITY */}

          <div className="quantity-section">

            <span>Quantity</span>

            <div className="quantity-control">

              <button
                onClick={() =>
                  setQuantity(
                    Math.max(1, quantity - 1)
                  )
                }
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  setQuantity(
                    Math.min(
                      product.stock,
                      quantity + 1
                    )
                  )
                }
              >
                +
              </button>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="details-actions">

            <button
              className="add-to-cart-large"
              onClick={addToCart}
              disabled={product.stock <= 0}
            >
              🛒 Add to Cart
            </button>

            <button className="wishlist-large">
              ♡
            </button>

          </div>

          <div className="product-features">

            <div>
              🚚
              <span>
                Free delivery on orders above ₹999
              </span>
            </div>

            <div>
              ↩️
              <span>
                Easy returns
              </span>
            </div>

            <div>
              🔒
              <span>
                Secure payment
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;

