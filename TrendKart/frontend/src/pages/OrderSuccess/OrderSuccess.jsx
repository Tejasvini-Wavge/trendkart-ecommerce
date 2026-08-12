import { useLocation, useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location.state?.orderId;
  const total = location.state?.total;

  return (
    <div className="order-success-page">

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>
          Order Placed Successfully!
        </h1>

        <p className="success-message">
          Thank you for shopping with TrendKart.
          Your order has been successfully placed.
        </p>

        {orderId && (
          <div className="order-info">

            <div>
              <span>Order ID</span>
              <strong>#{orderId}</strong>
            </div>

            {total !== undefined && (
              <div>
                <span>Total Amount</span>
                <strong>
                  ₹{Number(total).toFixed(2)}
                </strong>
              </div>
            )}

            <div>
              <span>Payment</span>
              <strong>Cash on Delivery</strong>
            </div>

            <div>
              <span>Status</span>
              <strong className="status">
                Order Placed
              </strong>
            </div>

          </div>
        )}

        <div className="success-actions">

          <button
            onClick={() => navigate("/")}
            className="shop-button"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/dashboard")}
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