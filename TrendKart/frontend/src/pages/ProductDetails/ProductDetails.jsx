import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/admin/products/${id}`
      );

      if (!response.ok) {
        throw new Error("Product not found");
      }

      const data = await response.json();

      setProduct(data.product || data);
    } catch (error) {
      console.error(error);
      setError("Unable to load product");
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="product-loading">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-error">
        <h2>{error || "Product not found"}</h2>

        <button onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-page">

      {/* BACK */}

      <button
        className="product-back"
        onClick={() => navigate(-1)}
      >
        ← Back to Shopping
      </button>


      <div className="product-details-container">

        {/* IMAGE */}

        <div className="product-details-image">

          {product.image ? (
            <img
              src={
                product.image.startsWith("http")
                  ? product.image
                  : `/images/${product.image}`
              }
              alt={product.name}
            />
          ) : (
            <div className="product-image-placeholder">
              👕
            </div>
          )}

        </div>


        {/* INFORMATION */}

        <div className="product-details-info">

          <p className="details-category">
            {product.category || "Fashion"}
          </p>

          <h1>
            {product.name}
          </h1>

          <div className="details-rating">
            ⭐⭐⭐⭐⭐
            <span> 4.8 (120 Reviews)</span>
          </div>

          <h2 className="details-price">
            ₹{Number(product.price).toFixed(2)}
          </h2>

          <p className="details-description">
            {product.description ||
              "Premium quality fashion product designed for comfort and everyday style."}
          </p>


          {/* STOCK */}

          <div className="stock-info">

            {product.stock > 0 ? (
              <>
                <span className="in-stock">
                  ✓ In Stock
                </span>

                <span>
                  {product.stock} items available
                </span>
              </>
            ) : (
              <span className="out-stock">
                Out of Stock
              </span>
            )}

          </div>


          {/* QUANTITY */}

          {product.stock > 0 && (
            <div className="quantity-section">

              <span>
                Quantity
              </span>

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

                <span>
                  {quantity}
                </span>

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
          )}


          {/* BUTTONS */}

          <div className="details-buttons">

            <button
              className="add-to-cart"
              disabled={product.stock <= 0}
              onClick={addToCart}
            >
              🛒 Add to Cart
            </button>

            <button
              className="buy-now"
              disabled={product.stock <= 0}
              onClick={() => {
                addToCart();
              }}
            >
              Buy Now
            </button>

          </div>


          {/* FEATURES */}

          <div className="product-features">

            <div>
              🚚
              <span>
                Free delivery over ₹999
              </span>
            </div>

            <div>
              🔄
              <span>
                Easy 7-day returns
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