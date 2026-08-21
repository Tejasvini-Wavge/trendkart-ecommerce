import { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminSettings.css";

function AdminSettings() {
  const [admin, setAdmin] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("admin")) || {};
    } catch {
      return {};
    }
  });

  const [name, setName] = useState(admin.name || "");
  const [email, setEmail] = useState(admin.email || "");

  const handleSave = (e) => {
    e.preventDefault();

    const updatedAdmin = {
      ...admin,
      name,
      email,
    };

    localStorage.setItem(
      "admin",
      JSON.stringify(updatedAdmin)
    );

    setAdmin(updatedAdmin);

    alert("Settings saved successfully ✅");
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    window.location.href = "/admin/login";
  };

  return (
    <div className="admin-settings-page">

      {/* SIDEBAR */}

      <aside className="settings-sidebar">

        <div className="settings-logo">
          🛍️ TrendKart
        </div>

        <p className="settings-panel-title">
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

          <Link to="/admin/orders">
            📦 Orders
          </Link>

          <Link
            to="/admin/settings"
            className="active"
          >
            ⚙️ Settings
          </Link>

          <button
            className="settings-logout"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>

        </nav>

      </aside>


      {/* MAIN */}

      <main className="settings-main">

        {/* HEADER */}

        <header className="settings-header">

          <div>
            <p>ADMIN PANEL</p>

            <h1>
              Settings
            </h1>
          </div>

        </header>


        {/* PROFILE */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon">
              👤
            </div>

            <div>
              <h2>
                Admin Profile
              </h2>

              <p>
                Manage your administrator information
              </p>
            </div>

          </div>


          <form onSubmit={handleSave}>

            <div className="settings-form-grid">

              {/* NAME */}

              <div className="settings-field">

                <label>
                  Admin Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter admin name"
                />

              </div>


              {/* EMAIL */}

              <div className="settings-field">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter email"
                />

              </div>

            </div>


            <button
              type="submit"
              className="save-settings-btn"
            >
              Save Changes
            </button>

          </form>

        </section>


        {/* ACCOUNT */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon">
              🔐
            </div>

            <div>
              <h2>
                Account
              </h2>

              <p>
                Manage your admin account
              </p>
            </div>

          </div>


          <div className="account-info">

            <div>

              <span>
                Login Role
              </span>

              <strong>
                Administrator
              </strong>

            </div>


            <div>

              <span>
                Account Email
              </span>

              <strong>
                {email || "Not available"}
              </strong>

            </div>

          </div>

        </section>


        {/* TRENDKART INFO */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon">
              🛍️
            </div>

            <div>
              <h2>
                TrendKart
              </h2>

              <p>
                Ecommerce administration panel
              </p>
            </div>

          </div>


          <div className="system-info">

            <div>
              <span>
                Application
              </span>

              <strong>
                TrendKart
              </strong>
            </div>

            <div>
              <span>
                Panel
              </span>

              <strong>
                Admin Panel
              </strong>
            </div>

            <div>
              <span>
                Version
              </span>

              <strong>
                1.0.0
              </strong>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminSettings;