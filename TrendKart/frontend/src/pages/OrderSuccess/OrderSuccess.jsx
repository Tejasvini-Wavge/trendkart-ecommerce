import { useLocation, useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location.state?.orderId;
  const total = location.state?.total;

  return (
    <div className="order-success-page">

      {/* 
          SUCCESS CARD
      */}

      <div className="success-card">

        {/* SUCCESS ICON */}

        <div className="success-icon">
          ✓
        </div>


        {/* TITLE */}

        <h1>
          Order Placed Successfully!
        </h1>


        {/* MESSAGE */}

        <p className="success-message">
          Thank you for shopping with TrendKart.
          Your order has been successfully placed.
        </p>


        {/* ========================================
            ORDER INFORMATION
        ======================================== */}

        {orderId && (

          <div className="order-info">

            {/* ORDER ID */}

            <div>
              <span>
                Order ID
              </span>

              <strong>
                #{orderId}
              </strong>
            </div>


            {/* TOTAL */}

            {total !== undefined && (

              <div>
                <span>
                  Total Amount
                </span>

                <strong>
                  ₹{Number(total).toFixed(2)}
                </strong>
              </div>

            )}


            {/* PAYMENT */}

            <div>
              <span>
                Payment
              </span>

              <strong>
                Cash on Delivery
              </strong>
            </div>


            {/* STATUS */}

            <div>
              <span>
                Status
              </span>

              <strong className="status">
                Order Placed
              </strong>
            </div>

          </div>

        )}


        {/* ========================================
            ACTION BUTTONS
        ======================================== */}

        <div className="success-actions">

          {/* CONTINUE SHOPPING */}

          <button
            onClick={() => navigate("/")}
            className="shop-button"
          >
            Continue Shopping
          </button>


          {/* VIEW MY ORDERS */}

          <button
            onClick={() => navigate("/my-orders")}
            className="orders-button"
          >
            View My Orders
          </button>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;