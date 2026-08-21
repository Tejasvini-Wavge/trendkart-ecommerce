import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./OrderDetails.css";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/orders/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load order"
        );
      }

      setOrder(data.order);
      setItems(data.items || []);
    } catch (error) {
      console.error("Order Details Error:", error);
      setError(
        error.message || "Unable to load order details"
      );
    } finally {
      setLoading(false);
    }
  };

  const subtotal = items.reduce(
    (total, item) =>
      total +
      Number(item.price) * Number(item.quantity),
    0
  );

  const delivery =
    Number(order?.total_amount || 0) - subtotal;

  if (loading) {
    return (
      <div className="order-details-loading">
        Loading order details...
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="order-details-error">
        <h2>Unable to load order</h2>
        <p>{error || "Order not found"}</p>

        <button onClick={() => navigate("/my-orders")}>
          Back to My Orders
        </button>
      </div>
    );
  }

  return (
    <div className="order-details-page">

      {/* HEADER */}

      <div className="order-details-header">
        <button
          className="back-orders-btn"
          onClick={() => navigate("/my-orders")}
        >
          ← Back to My Orders
        </button>

        <h1>Order Details</h1>

        <p>
          Order #{order.id}
        </p>
      </div>


      <div className="order-details-container">

        {/* ORDER STATUS */}

        <div className="order-status-card">

          <div>
            <span className="details-label">
              Order Status
            </span>

            <h2>
              {order.status || "Order Placed"}
            </h2>
          </div>

          <span className="status-badge">
            {order.status || "Order Placed"}
          </span>

        </div>


        {/* ORDER INFORMATION */}

        <div className="details-grid">

          <div className="details-card">

            <h3>Order Information</h3>

            <div className="details-row">
              <span>Order ID</span>
              <strong>#{order.id}</strong>
            </div>

            <div className="details-row">
              <span>Order Date</span>
              <strong>
                {new Date(
                  order.created_at
                ).toLocaleDateString()}
              </strong>
            </div>

            <div className="details-row">
              <span>Payment</span>
              <strong>
                {order.payment_method ||
                  "Cash on Delivery"}
              </strong>
            </div>

            <div className="details-row">
              <span>Total</span>
              <strong>
                ₹{Number(order.total_amount).toFixed(2)}
              </strong>
            </div>

          </div>


          <div className="details-card">

            <h3>Delivery Address</h3>

            <p>
              <strong>
                {order.customer_name}
              </strong>
            </p>

            <p>{order.address}</p>

            <p>
              {order.city}, {order.state}
            </p>

            <p>
              {order.pincode}
            </p>

            <p>
              Phone: {order.phone}
            </p>

          </div>

        </div>


        {/* PRODUCTS */}

        <div className="order-items-card">

          <h3>
            Ordered Products
          </h3>

          {items.length === 0 ? (

            <p className="no-items">
              No products found for this order.
            </p>

          ) : (

            <div className="order-items-list">

              {items.map((item) => (

                <div
                  className="order-item"
                  key={item.id}
                >

                  <div className="order-item-image">
                    👕
                  </div>

                  <div className="order-item-info">

                    <h4>
                      {item.product_name}
                    </h4>

                    <p>
                      Price: ₹
                      {Number(item.price).toFixed(2)}
                    </p>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                  </div>

                  <div className="order-item-subtotal">

                    ₹
                    {Number(
                      item.subtotal
                    ).toFixed(2)}

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* SUMMARY */}

        <div className="order-summary-card">

          <h3>
            Order Summary
          </h3>

          <div className="summary-row">
            <span>Subtotal</span>

            <strong>
              ₹{subtotal.toFixed(2)}
            </strong>
          </div>

          <div className="summary-row">
            <span>Delivery</span>

            <strong>
              {delivery <= 0
                ? "FREE"
                : `₹${delivery.toFixed(2)}`}
            </strong>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>

            <strong>
              ₹{Number(order.total_amount).toFixed(2)}
            </strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default OrderDetails;