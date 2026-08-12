import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [placingOrder, setPlacingOrder] = useState(false);


  // ========================================
  // LOAD CART
  // ========================================

  useEffect(() => {

    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    if (savedCart.length === 0) {

      navigate("/cart");

      return;
    }

    setCart(savedCart);

  }, [navigate]);


  // ========================================
  // HANDLE INPUT
  // ========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

  };


  // ========================================
  // CALCULATE TOTAL
  // ========================================

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        Number(item.quantity),
    0
  );


  const delivery =
    subtotal >= 999 ? 0 : 50;


  const total =
    subtotal + delivery;


  // ========================================
  // PLACE ORDER
  // ========================================

  const handlePlaceOrder = async (e) => {

    e.preventDefault();


    if (cart.length === 0) {

      alert("Your cart is empty");

      navigate("/cart");

      return;
    }


    setPlacingOrder(true);


    try {

      const orderData = {

        user_id: null,

        customer_name: form.name,

        email: form.email,

        phone: form.phone,

        address: form.address,

        city: form.city,

        state: form.state,

        pincode: form.pincode,

        total_amount: total,

        payment_method:
          "Cash on Delivery",

        items: cart,

      };


      console.log(
        "Sending Order:",
        orderData
      );


      const response = await fetch(
        "http://localhost:5000/orders",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            orderData
          ),
        }
      );


      const data =
        await response.json();


      console.log(
        "Order Response:",
        data
      );


      if (!response.ok) {

        throw new Error(
          data.message ||
            "Failed to place order"
        );

      }


      // ========================================
      // ORDER SUCCESS
      // ========================================

      localStorage.removeItem("cart");


      navigate(
        "/order-success",
        {
          state: {
            orderId:
              data.orderId,

            total: total,
          },
        }
      );


    } catch (error) {

      console.error(
        "Order Error:",
        error
      );


      alert(
        error.message ||
          "Something went wrong while placing the order"
      );


    } finally {

      setPlacingOrder(false);

    }

  };


  // ========================================
  // PAGE
  // ========================================

  return (
    <div className="checkout-page">


      {/* ========================================
          HEADER
      ======================================== */}

      <div className="checkout-header">

        <button
          className="checkout-back"
          onClick={() =>
            navigate("/cart")
          }
        >
          ← Back to Cart
        </button>


        <h1>
          Checkout
        </h1>

      </div>



      <div className="checkout-container">


        {/* ========================================
            DELIVERY INFORMATION
        ======================================== */}

        <div className="checkout-form-section">

          <h2>
            Delivery Information
          </h2>


          <form
            onSubmit={
              handlePlaceOrder
            }
          >


            {/* NAME + EMAIL */}

            <div className="form-row">


              <div className="form-group">

                <label>
                  Full Name
                </label>


                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your full name"
                  required
                />

              </div>



              <div className="form-group">

                <label>
                  Email
                </label>


                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your email"
                  required
                />

              </div>


            </div>



            {/* PHONE */}

            <div className="form-group">

              <label>
                Phone Number
              </label>


              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={
                  handleChange
                }
                placeholder="Enter 10 digit phone number"
                pattern="[0-9]{10}"
                maxLength="10"
                required
              />

            </div>



            {/* ADDRESS */}

            <div className="form-group">

              <label>
                Address
              </label>


              <textarea
                name="address"
                value={form.address}
                onChange={
                  handleChange
                }
                placeholder="House number, street, area"
                rows="4"
                required
              />

            </div>



            {/* CITY + STATE + PINCODE */}

            <div className="form-row">


              <div className="form-group">

                <label>
                  City
                </label>


                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={
                    handleChange
                  }
                  placeholder="City"
                  required
                />

              </div>



              <div className="form-group">

                <label>
                  State
                </label>


                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={
                    handleChange
                  }
                  placeholder="State"
                  required
                />

              </div>



              <div className="form-group">

                <label>
                  Pincode
                </label>


                <input
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={
                    handleChange
                  }
                  placeholder="6 digit pincode"
                  pattern="[0-9]{6}"
                  maxLength="6"
                  required
                />

              </div>


            </div>



            {/* ========================================
                PAYMENT
            ======================================== */}

            <div className="payment-section">

              <h2>
                Payment Method
              </h2>


              <div className="payment-option">

                <input
                  type="radio"
                  checked
                  readOnly
                />


                <span>
                  💵 Cash on Delivery
                </span>

              </div>


              <p>
                Online payment will be
                added later.
              </p>

            </div>



            {/* ========================================
                PLACE ORDER
            ======================================== */}

            <button
              type="submit"
              className="place-order-button"
              disabled={placingOrder}
            >

              {placingOrder
                ? "Placing Order..."
                : `Place Order · ₹${total.toFixed(2)}`}

            </button>


          </form>

        </div>



        {/* ========================================
            ORDER SUMMARY
        ======================================== */}

        <div className="checkout-summary">

          <h2>
            Order Summary
          </h2>



          {/* PRODUCTS */}

          {cart.map((item) => (

            <div
              className="checkout-item"
              key={item.id}
            >


              {/* IMAGE */}

              <div className="checkout-item-image">

                {item.image ? (

                  <img
                    src={
                      item.image.startsWith(
                        "http"
                      )
                        ? item.image
                        : `/images/${item.image}`
                    }
                    alt={item.name}
                  />

                ) : (

                  <span>
                    👕
                  </span>

                )}

              </div>



              {/* PRODUCT INFO */}

              <div className="checkout-item-info">

                <h3>
                  {item.name}
                </h3>


                <p>
                  Qty:{" "}
                  {item.quantity}
                </p>


                <strong>
                  ₹
                  {(
                    Number(item.price) *
                    Number(item.quantity)
                  ).toFixed(2)}
                </strong>

              </div>


            </div>

          ))}



          {/* SUBTOTAL */}

          <div className="summary-line">

            <span>
              Subtotal
            </span>


            <strong>
              ₹
              {subtotal.toFixed(2)}
            </strong>

          </div>



          {/* DELIVERY */}

          <div className="summary-line">

            <span>
              Delivery
            </span>


            <strong>

              {delivery === 0
                ? "FREE"
                : `₹${delivery}`}

            </strong>

          </div>



          {/* FREE DELIVERY MESSAGE */}

          {subtotal < 999 && (

            <p
              style={{
                fontSize: "12px",
                color: "#777",
                marginTop: "10px",
              }}
            >
              Add ₹
              {(999 - subtotal).toFixed(
                2
              )}{" "}
              more for FREE delivery.
            </p>

          )}



          <hr />



          {/* TOTAL */}

          <div className="checkout-total">

            <span>
              Total
            </span>


            <strong>
              ₹
              {total.toFixed(2)}
            </strong>

          </div>


        </div>


      </div>

    </div>
  );
}


export default Checkout;