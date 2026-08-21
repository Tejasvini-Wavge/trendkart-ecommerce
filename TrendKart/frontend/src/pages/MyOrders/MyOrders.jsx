import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";

function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/orders/my-orders",
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
          data.message || "Failed to fetch orders"
        );
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error("My Orders Error:", error);
      setError(error.message || "Unable to load orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="orders-loading">
        <div className="loading-spinner"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-error">
        <h2>Unable to load orders</h2>
        <p>{error}</p>

        <button onClick={fetchMyOrders}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="my-orders-page">

      <div className="my-orders-header">

        <button
          className="back-home-btn"
          onClick={() => navigate("/")}
        >
          ← Continue Shopping
        </button>

        <h1>My Orders</h1>

        <p>
          Track and view your TrendKart orders
        </p>

      </div>


      {orders.length === 0 ? (

        <div className="no-orders">

          <div className="no-orders-icon">
            📦
          </div>

          <h2>
            No Orders Yet
          </h2>

          <p>
            You haven't placed any orders yet.
          </p>

          <button
            onClick={() => navigate("/")}
          >
            Start Shopping
          </button>

        </div>

      ) : (

        <div className="orders-list">

          {orders.map((order) => (

            <div
              className="order-card"
              key={order.id}
            >

              <div className="order-top">

                <div>
                  <p className="order-label">
                    Order ID
                  </p>

                  <h3>
                    #{order.id}
                  </h3>
                </div>

                <span className="order-status">
                  {order.status || "Order Placed"}
                </span>

              </div>


              <div className="order-middle">

                <div>
                  <p className="order-label">
                    Order Date
                  </p>

                  <strong>
                    {new Date(
                      order.created_at
                    ).toLocaleDateString()}
                  </strong>
                </div>


                <div>
                  <p className="order-label">
                    Payment
                  </p>

                  <strong>
                    {order.payment_method ||
                      "Cash on Delivery"}
                  </strong>
                </div>


                <div>
                  <p className="order-label">
                    Total
                  </p>

                  <strong>
                    ₹
                    {Number(
                      order.total_amount
                    ).toFixed(2)}
                  </strong>
                </div>

              </div>


              <div className="order-bottom">

                <p>
                  Delivered to{" "}
                  <strong>
                    {order.city},{" "}
                    {order.state}
                  </strong>
                </p>

                <button
                  onClick={() =>
                    navigate(
                      `/orders/${order.id}`
                    )
                  }
                >
                  View Details →
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyOrders;