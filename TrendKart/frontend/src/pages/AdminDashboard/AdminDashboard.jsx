import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  // ========================================
  // FETCH PRODUCTS
  // ========================================

  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/admin/products"
      );

      setProducts(response.data.products || []);

    } catch (error) {

      console.error(
        "Error fetching products:",
        error
      );

    }

  };


  // ========================================
  // FETCH USERS
  // ========================================

  const fetchUsers = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers(response.data.users || []);

    } catch (error) {

      console.error(
        "Error fetching users:",
        error
      );

    }

  };


  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/admin/login");

  };


  return (

    <div className="admin-dashboard">


      {/* ========================================
          SIDEBAR
      ======================================== */}

      <aside className="admin-sidebar">

        <div className="admin-logo">
          🛍️ TrendKart
        </div>

        <p className="admin-label">
          ADMIN PANEL
        </p>


        <nav>

          <Link
            to="/admin/dashboard"
            className="active"
          >
            📊 Dashboard
          </Link>

          <Link to="/admin/products">
            🛍️ Products
          </Link>

          <Link to="/admin/users">
            👥 Users
          </Link>

          <Link to="/admin/orders">
            📦 Orders
          </Link>

          <Link to="/admin/settings">
            ⚙️ Settings
          </Link>

        </nav>


        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </aside>


      {/* ========================================
          MAIN CONTENT
      ======================================== */}

      <main className="admin-main">


        {/* HEADER */}

        <header className="admin-header">

          <div>

            <p className="dashboard-small">
              ADMIN DASHBOARD
            </p>

            <h1>
              Welcome back 👋
            </h1>

          </div>


          <div className="admin-profile">

            <div className="admin-avatar">
              A
            </div>

            <div>

              <strong>
                Admin
              </strong>

              <span>
                Administrator
              </span>

            </div>

          </div>

        </header>


        {/* ========================================
            STATISTICS
        ======================================== */}

        <section className="stats-grid">


          <div className="stat-card">

            <div className="stat-icon">
              🛍️
            </div>

            <div>

              <p>
                Total Products
              </p>

              <h2>
                {products.length}
              </h2>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              👥
            </div>

            <div>

              <p>
                Total Users
              </p>

              <h2>
                {users.length}
              </h2>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              📦
            </div>

            <div>

              <p>
                Total Orders
              </p>

              <h2>
                0
              </h2>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              💰
            </div>

            <div>

              <p>
                Revenue
              </p>

              <h2>
                ₹0
              </h2>

            </div>

          </div>


        </section>


        {/* ========================================
            QUICK ACTIONS
        ======================================== */}

        <section className="dashboard-section">

          <div className="section-header">

            <div>

              <p>
                QUICK ACTIONS
              </p>

              <h2>
                Manage TrendKart
              </h2>

            </div>

          </div>


          <div className="quick-actions">


            <Link
              to="/admin/products"
              className="quick-card"
            >

              <span>
                🛍️
              </span>

              <div>

                <h3>
                  Manage Products
                </h3>

                <p>
                  Add, edit and delete products
                </p>

              </div>

              <strong>
                →
              </strong>

            </Link>


            <Link
              to="/admin/users"
              className="quick-card"
            >

              <span>
                👥
              </span>

              <div>

                <h3>
                  Manage Users
                </h3>

                <p>
                  View and manage customers
                </p>

              </div>

              <strong>
                →
              </strong>

            </Link>


            <Link
              to="/admin/orders"
              className="quick-card"
            >

              <span>
                📦
              </span>

              <div>

                <h3>
                  Manage Orders
                </h3>

                <p>
                  View customer orders
                </p>

              </div>

              <strong>
                →
              </strong>

            </Link>


          </div>

        </section>


        {/* ========================================
            RECENT PRODUCTS
        ======================================== */}

        <section className="dashboard-section">

          <div className="section-header">

            <div>

              <p>
                PRODUCT OVERVIEW
              </p>

              <h2>
                Recent Products
              </h2>

            </div>


            <Link
              to="/admin/products"
              className="view-link"
            >
              View All →
            </Link>

          </div>


          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    Product
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Price
                  </th>

                  <th>
                    Stock
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                {products.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="empty-table"
                    >
                      No products available
                    </td>

                  </tr>

                ) : (

                  products
                    .slice(0, 5)
                    .map((product) => (

                      <tr key={product.id}>

                        <td>

                          <div className="table-product">

                            <div className="table-image">

                              {product.image ? (

                                <img
                                  src={product.image}
                                  alt={product.name}
                                />

                              ) : (

                                "👕"

                              )}

                            </div>

                            <strong>
                              {product.name}
                            </strong>

                          </div>

                        </td>


                        <td>
                          {product.category}
                        </td>


                        <td>
                          ₹{product.price}
                        </td>


                        <td>
                          {product.stock}
                        </td>


                        <td>

                          {product.stock > 0 ? (

                            <span className="status active-status">
                              In Stock
                            </span>

                          ) : (

                            <span className="status inactive-status">
                              Out of Stock
                            </span>

                          )}

                        </td>

                      </tr>

                    ))

                )}

              </tbody>

            </table>

          </div>

        </section>


      </main>

    </div>

  );

}

export default AdminDashboard;