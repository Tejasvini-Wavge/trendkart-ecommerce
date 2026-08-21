import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        alert("Admin token not found. Please login again.");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Orders:", response.data);

      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);

      alert(
        error.response?.data?.message ||
          "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    window.location.href = "/admin/login";
  };

  return (
    <div className="admin-orders-page">

      {/*  SIDEBAR */}

      <aside className="orders-sidebar">

        <div className="orders-logo">
          🛍️ TrendKart
        </div>

        <p className="orders-panel-title">
          ADMIN PANEL
        </p>

        <nav>

          <Link to="/admin/dashboard">
            📊 Dashboard
          </Link>

          <Link to="/admin/products">
            🛍️ Products
          </Link>

          <Link to="/admin/users">
            👥 Users
          </Link>

          <Link
            to="/admin/orders"
            className="active"
          >
            📦 Orders
          </Link>

          <Link to="/admin/settings">
            ⚙️ Settings
          </Link>

          <button
            className="orders-logout"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>

        </nav>
      </aside>


      {/*  MAIN  */}

      <main className="orders-main">

        {/* HEADER */}

        <header className="orders-header">

          <div>
            <p>ORDER MANAGEMENT</p>

            <h1>
              Orders
            </h1>
          </div>

          <div className="orders-count">
            {orders.length} Orders
          </div>

        </header>


        {/*  SUMMARY  */}

        <div className="orders-summary">

          <div className="summary-card">

            <div className="summary-icon">
              📦
            </div>

            <div>
              <p>Total Orders</p>

              <h2>
                {orders.length}
              </h2>
            </div>

          </div>


          <div className="summary-card">

            <div className="summary-icon">
              💰
            </div>

            <div>
              <p>Total Revenue</p>

              <h2>
                ₹
                {orders
                  .reduce(
                    (total, order) =>
                      total +
                      Number(order.total_amount || 0),
                    0
                  )
                  .toFixed(2)}
              </h2>
            </div>

          </div>


          <div className="summary-card">

            <div className="summary-icon">
              🚚
            </div>

            <div>
              <p>Order Placed</p>

              <h2>
                {
                  orders.filter(
                    (order) =>
                      order.status === "Order Placed"
                  ).length
                }
              </h2>
            </div>

          </div>

        </div>


        {/*  ORDERS  */}

        <section className="orders-section">

          <div className="orders-section-header">

            <div>

              <p>RECENT ORDERS</p>

              <h2>
                All Orders
              </h2>

            </div>

            <button
              className="refresh-btn"
              onClick={fetchOrders}
            >
              ↻ Refresh
            </button>

          </div>


          {loading ? (

            <div className="orders-loading">
              Loading orders...
            </div>

          ) : orders.length === 0 ? (

            <div className="orders-empty">

              <div>
                📦
              </div>

              <h3>
                No Orders Found
              </h3>

              <p>
                Customer orders will appear here.
              </p>

            </div>

          ) : (

            <div className="orders-table-wrapper">

              <table className="orders-table">

                <thead>

                  <tr>

                    <th>
                      Order
                    </th>

                    <th>
                      Customer
                    </th>

                    <th>
                      Contact
                    </th>

                    <th>
                      Amount
                    </th>

                    <th>
                      Payment
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Date
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {orders.map((order) => (

                    <tr key={order.id}>

                      {/* ORDER */}

                      <td>

                        <div className="order-id">
                          #{order.id}
                        </div>

                      </td>


                      {/* CUSTOMER */}

                      <td>

                        <div className="customer-cell">

                          <div className="customer-avatar">

                            {order.customer_name
                              ? order.customer_name
                                  .charAt(0)
                                  .toUpperCase()
                              : "U"}

                          </div>

                          <div>

                            <strong>
                              {order.customer_name}
                            </strong>

                            <small>
                              User ID:{" "}
                              {order.user_id || "Guest"}
                            </small>

                          </div>

                        </div>

                      </td>


                      {/* CONTACT */}

                      <td>

                        <div className="contact-cell">

                          <span>
                            {order.email}
                          </span>

                          <small>
                            {order.phone}
                          </small>

                        </div>

                      </td>


                      {/* AMOUNT */}

                      <td>

                        <strong className="order-amount">
                          ₹{Number(
                            order.total_amount
                          ).toFixed(2)}
                        </strong>

                      </td>


                      {/* PAYMENT */}

                      <td>

                        <span className="payment-badge">
                          {order.payment_method}
                        </span>

                      </td>


                      {/* STATUS */}

                      <td>

                        <span className="order-status">
                          {order.status}
                        </span>

                      </td>


                      {/* DATE */}

                      <td>
                        {formatDate(
                          order.created_at
                        )}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default AdminOrders;