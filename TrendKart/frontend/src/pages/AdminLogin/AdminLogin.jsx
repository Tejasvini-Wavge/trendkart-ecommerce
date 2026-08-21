import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/login",
        {
          email: email,
          password: password
        }
      );

      console.log("Admin Login Response:", response.data);

      // IMPORTANT:
      // Admin token is stored separately
      localStorage.setItem(
        "adminToken",
        response.data.token
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(response.data.admin)
      );

      alert(response.data.message);

      // Go to Admin Dashboard
      navigate("/admin/dashboard");

    } catch (error) {
      console.error("Admin Login Error:", error);

      alert(
        error.response?.data?.message ||
        "Admin login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-center mb-2">
          🛍️ TrendKart
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Admin Login
        </p>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Enter admin email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border border-gray-300 rounded-md p-3 mb-4"
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border border-gray-300 rounded-md p-3 mb-6"
        />

        {/* LOGIN */}

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
        >
          Admin Login
        </button>

      </form>

    </div>
  );
}

export default AdminLogin;