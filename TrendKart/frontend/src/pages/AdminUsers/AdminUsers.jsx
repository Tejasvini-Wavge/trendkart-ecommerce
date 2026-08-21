import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AdminUsers.css";

function AdminUsers() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // IMPORTANT:
  // Get ADMIN token, not user token
  const token = localStorage.getItem("adminToken");


 
  // GET ALL USERS


  const fetchUsers = async () => {

    try {

      setLoading(true);

      if (!token) {
        alert("Admin token not found. Please login again.");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(
        "Users API Response:",
        response.data
      );

      setUsers(
        response.data.users || []
      );

    } catch (error) {

      console.error(
        "Error fetching users:",
        error
      );

      if (error.response?.status === 401) {

        alert(
          "Admin token is invalid or expired. Please login again."
        );

      } else if (error.response?.status === 403) {

        alert(
          "Admin access required. Please login as admin."
        );

      } else {

        alert(
          error.response?.data?.message ||
          "Failed to fetch users"
        );

      }

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchUsers();

  }, []);



  // BLOCK / UNBLOCK USER
  

  const handleStatusChange = async (user) => {

    const currentStatus =
      user.status || "active";

    const newStatus =
      currentStatus === "blocked"
        ? "active"
        : "blocked";


    const confirmAction =
      window.confirm(
        `Are you sure you want to ${
          newStatus === "blocked"
            ? "block"
            : "unblock"
        } ${user.name}?`
      );


    if (!confirmAction) {
      return;
    }


    try {

      await axios.put(
        `http://localhost:5000/admin/user/${user.id}/status`,
        {
          status: newStatus
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      alert(
        newStatus === "blocked"
          ? "User blocked successfully 🚫"
          : "User unblocked successfully ✅"
      );


      fetchUsers();


    } catch (error) {

      console.error(
        "Status update error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Failed to update user status"
      );

    }

  };


  
  // LOGOUT


  const handleLogout = () => {

    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    navigateToLogin();

  };


  const navigateToLogin = () => {
    window.location.href = "/admin/login";
  };


  return (

    <div className="admin-users-page">


      {/* 
          SIDEBAR
   */}

      <aside className="users-sidebar">

        <div className="users-logo">
          🛍️ TrendKart
        </div>


        <p className="users-sidebar-label">
          ADMIN PANEL
        </p>


        <nav>

          <Link to="/admin/dashboard">
            📊 Dashboard
          </Link>


          <Link to="/admin/products">
            🛍️ Products
          </Link>


          <Link
            to="/admin/users"
            className="active"
          >
            👥 Users
          </Link>


          <Link to="/admin/orders">
            📦 Orders
          </Link>


          <Link to="/admin/settings">
            ⚙️ Settings
          </Link>


          <button
            className="logout-button"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>

        </nav>

      </aside>


      {/* 
          MAIN
       */}

      <main className="users-main">


        {/* HEADER */}

        <header className="users-header">

          <div>

            <p>
              CUSTOMER MANAGEMENT
            </p>

            <h1>
              Users
            </h1>

          </div>


          <div className="users-count">
            {users.length} Users
          </div>

        </header>


        {/* 
            USERS TABLE
         */}

        <section className="users-table-section">


          <div className="users-table-heading">

            <div>

              <p>
                CUSTOMERS
              </p>

              <h2>
                All Users
              </h2>

            </div>

          </div>


          {loading ? (

            <div className="users-loading">
              Loading users...
            </div>

          ) : users.length === 0 ? (

            <div className="users-empty">

              <div>
                👥
              </div>

              <h3>
                No Users Found
              </h3>

              <p>
                Registered customers will appear here.
              </p>

            </div>

          ) : (

            <div className="users-table-wrapper">

              <table className="users-table">

                <thead>

                  <tr>

                    <th>
                      User
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      Verification
                    </th>

                    <th>
                      Joined
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {users.map((user) => {

                    const userStatus =
                      user.status || "active";


                    return (

                      <tr key={user.id}>


                        {/* USER */}

                        <td>

                          <div className="user-cell">

                            <div className="user-avatar">

                              {user.name
                                ? user.name
                                    .charAt(0)
                                    .toUpperCase()
                                : "U"}

                            </div>


                            <div>

                              <strong>
                                {user.name || "User"}
                              </strong>

                              <small>
                                ID: #{user.id}
                              </small>

                            </div>

                          </div>

                        </td>


                        {/* EMAIL */}

                        <td>
                          {user.email}
                        </td>


                        {/* VERIFICATION */}

                        <td>

                          {Number(
                            user.is_verified
                          ) === 1 ? (

                            <span className="verified">
                              ✓ Verified
                            </span>

                          ) : (

                            <span className="not-verified">
                              Not Verified
                            </span>

                          )}

                        </td>


                        {/* JOINED */}

                        <td>

                          {user.created_at
                            ? new Date(
                                user.created_at
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "-"
                          }

                        </td>


                        {/* STATUS */}

                        <td>

                          {userStatus === "blocked" ? (

                            <span className="user-status blocked">
                              Blocked
                            </span>

                          ) : (

                            <span className="user-status active">
                              Active
                            </span>

                          )}

                        </td>


                        {/* ACTION */}

                        <td>

                          <button
                            className={
                              userStatus === "blocked"
                                ? "unblock-btn"
                                : "block-btn"
                            }
                            onClick={() =>
                              handleStatusChange(user)
                            }
                          >

                            {userStatus === "blocked"
                              ? "✓ Unblock"
                              : "🚫 Block"}

                          </button>

                        </td>


                      </tr>

                    );

                  })}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

    </div>

  );
}

export default AdminUsers;