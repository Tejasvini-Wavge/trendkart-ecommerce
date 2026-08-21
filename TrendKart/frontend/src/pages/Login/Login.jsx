import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      // Login API
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        {
          email: email,
          password: password,
        }
      );

      console.log("Login Response:", response.data);

      // Save JWT token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert(
        response.data.message || "Login successful!"
      );

      // Go to Home after successful login
      navigate("/");

    } catch (error) {
      console.error("Login Error:", error);

      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >

        {/* Heading */}

        <h1 className="text-3xl font-bold text-center mb-2">
          🛍️ TrendKart
        </h1>

        <p className="text-center text-gray-500 mb-6">
          User Login
        </p>


        {/* Email */}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border border-gray-300 rounded-md p-3 mb-4"
        />


        {/* Password */}

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border border-gray-300 rounded-md p-3 mb-6"
        />


        {/* Login Button */}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
        >
          Login
        </button>


        {/* Register */}

        <p className="text-center mt-5 text-gray-600">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;