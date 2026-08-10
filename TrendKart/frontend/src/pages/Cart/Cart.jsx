
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      return;
    }

    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: quantity,
          }
        : item
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const removeProduct = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const getSubtotal = () => {
    return cart.reduce(
      (total, item) =>
        total +
        Number(item.price) * item.quantity,
      0
    );
  };

  const subtotal = getSubtotal();

  const delivery = subtotal >= 999 || subtotal === 0
    ? 0
    : 50;

  const total = subtotal + delivery;

  return (
    <div className="cart-page">

      {/* HEADER */}

      <div className="cart-header">

        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Continue Shopping
        </button>

        <h1>
          Shopping Cart 🛒
        </h1>

      </div>


      {cart.length === 0 ? (

        /* EMPTY CART */

        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h2>
            Your cart is empty
          </h2>

          <p>
            Looks like you haven't added
            anything to your cart yet.
          </p>

          <button
            onClick={() => navigate("/")}
          >
            Start Shopping
          </button>

        </div>

      ) : (

        /* CART */

        <div className="cart-container">

          {/* PRODUCTS */}

          <div className="cart-products">

            <h2>
              Your Items
            </h2>

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                {/* IMAGE */}

                <div className="cart-item-image">

                  {item.image ? (

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                  ) : (

                    <span>
                      👕
                    </span>

                  )}

                </div>


                {/* INFO */}

                <div className="cart-item-info">

                  <p className="cart-category">
                    {item.category || "Fashion"}
                  </p>

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    ₹{item.price}
                  </p>

                </div>


                {/* QUANTITY */}

                <div className="cart-quantity">

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity - 1
                      )
                    }
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>

                </div>


                {/* PRICE */}

                <div className="cart-item-total">

                  ₹
                  {(
                    Number(item.price) *
                    item.quantity
                  ).toFixed(2)}

                </div>


                {/* DELETE */}

                <button
                  className="remove-button"
                  onClick={() =>
                    removeProduct(item.id)
                  }
                >
                  🗑️
                </button>

              </div>

            ))}

          </div>


          {/* ORDER SUMMARY */}

          <div className="order-summary">

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


            <hr />


            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{total.toFixed(2)}
              </strong>

            </div>


            <button
              className="checkout-button"
              onClick={() =>
                alert(
                  "Checkout coming soon 🚀"
                )
              }
            >
              Proceed to Checkout
            </button>


            <p className="free-delivery">

              {subtotal < 999
                ? `Add ₹${(
                    999 - subtotal
                  ).toFixed(2)} more for FREE delivery`
                : "🎉 You got FREE delivery!"}

            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;

