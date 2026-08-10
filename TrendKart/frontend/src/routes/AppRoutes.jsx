
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ================= USER PAGES =================

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import VerifyOTP from "../pages/VerifyOTP/VerifyOTP";
import Dashboard from "../pages/Dashboard/Dashboard";

import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";

// ================= ADMIN PAGES =================

import AdminLogin from "../pages/AdminLogin/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";

// ================= PROTECTED ROUTES =================

import ProtectedRoute from "../components/ProtectedRoute";
import AdminProtectedRoute from "../components/AdminProtectedRoute";


function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =========================================
            USER ROUTES
        ========================================= */}

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />


        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />


        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />


        {/* VERIFY OTP */}
        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />


        {/* USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* PRODUCT DETAILS */}
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />


        {/* CART */}
        <Route
          path="/cart"
          element={<Cart />}
        />


        {/* =========================================
            ADMIN ROUTES
        ========================================= */}

        {/* ADMIN LOGIN */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />


        {/* =========================================
            PAGE NOT FOUND
        ========================================= */}

        <Route
          path="*"
          element={
            <div
              style={{
                minHeight: "70vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <h1 style={{ fontSize: "70px", margin: 0 }}>
                404
              </h1>

              <h2>
                Page Not Found
              </h2>

              <p>
                The page you are looking for does not exist.
              </p>

              <a
                href="/"
                style={{
                  marginTop: "20px",
                  padding: "12px 25px",
                  background: "#111",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "5px",
                }}
              >
                Go to Home
              </a>
            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;

