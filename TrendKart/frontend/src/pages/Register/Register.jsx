
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(response.data.message);

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Go to login after successful registration
      navigate("/login");

    } catch (error) {
      console.log("Registration Error:", error);

      alert(
        error.response?.data?.message ||
          "Registration failed"
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

        <h1 className="text-3xl font-bold text-center mb-6">
          🛍️ TrendKart
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Create Account
        </p>


        {/* Name */}

        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border border-gray-300 rounded-md p-3 mb-4"
        />


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
          className="w-full border border-gray-300 rounded-md p-3 mb-4"
        />


        {/* Confirm Password */}

        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          className="w-full border border-gray-300 rounded-md p-3 mb-6"
        />


        {/* Register Button */}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
        >
          Register
        </button>


        {/* Login Link */}

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Register;

