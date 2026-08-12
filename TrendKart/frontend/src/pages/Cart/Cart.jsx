import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        if (item.quantity < item.stock) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
      }

      return item;
    });

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // Remove product
  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // Clear cart
  const clearCart = () => {
    localStorage.removeItem("cart");

    setCart([]);
  };

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) * item.quantity,
    0
  );

  // Delivery charge
  const delivery =
    subtotal >= 999 ? 0 : 50;

  // Total
  const total = subtotal + delivery;

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="cart-page">

        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h1>
            Your Cart is Empty
          </h1>

          <p>
            Looks like you haven't added
            anything to your cart yet.
          </p>

          <button
            className="continue-shopping"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="cart-page">

      {/* Header */}

      <div className="cart-header">

        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Continue Shopping
        </button>

        <h1>
          Shopping Cart
        </h1>

        <span>
          {cart.length}{" "}
          {cart.length === 1
            ? "Item"
            : "Items"}
        </span>

      </div>


      <div className="cart-container">

        {/* Cart Items */}

        <div className="cart-items">

          {cart.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              {/* Product Image */}

              <div className="cart-product-image">

                {item.image ? (
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `/images/${item.image}`
                    }
                    alt={item.name}
                  />
                ) : (
                  <div className="image-placeholder">
                    👕
                  </div>
                )}

              </div>


              {/* Product Information */}

              <div className="cart-product-info">

                <p className="cart-category">
                  {item.category || "Fashion"}
                </p>

                <h2>
                  {item.name}
                </h2>

                <p className="cart-description">
                  {item.description ||
                    "Premium quality fashion product"}
                </p>

                <p className="cart-price">
                  ₹
                  {Number(item.price).toFixed(2)}
                </p>

              </div>


              {/* Quantity */}

              <div className="cart-quantity">

                <span>
                  Quantity
                </span>

                <div className="quantity-control">

                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                    disabled={
                      item.quantity >= item.stock
                    }
                  >
                    +
                  </button>

                </div>

              </div>


              {/* Item Total */}

              <div className="cart-item-total">

                <strong>
                  ₹
                  {(
                    Number(item.price) *
                    item.quantity
                  ).toFixed(2)}
                </strong>

                <button
                  className="remove-button"
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          ))}


          {/* Clear Cart */}

          <button
            className="clear-cart"
            onClick={clearCart}
          >
            Clear Cart
          </button>

        </div>


        {/* Order Summary */}

        <div className="cart-summary">

          <h2>
            Order Summary
          </h2>


          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <strong>
              ₹{subtotal.toFixed(2)}
            </strong>

          </div>


          <div className="summary-row">

            <span>
              Delivery
            </span>

            <strong>
              {delivery === 0
                ? "FREE"
                : `₹${delivery}`}
            </strong>

          </div>


          {subtotal < 999 && (
            <p className="delivery-message">
              Add ₹
              {(999 - subtotal).toFixed(2)}
              {" "}
              more for FREE delivery
            </p>
          )}


          <hr />


          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              ₹{total.toFixed(2)}
            </strong>

          </div>


          {/* Checkout */}

          <button
            className="checkout-button"
            onClick={() =>
              navigate("/checkout")
            }
          >
            Proceed to Checkout
          </button>


          <button
            className="continue-button"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>

        </div>

      </div>

    </div>
  );
}

export default Cart;