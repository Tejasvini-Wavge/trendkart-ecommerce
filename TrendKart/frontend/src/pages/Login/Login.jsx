
import { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          password: password
        }
      );

      console.log(response.data);

localStorage.setItem("token", response.data.token);

localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

alert(response.data.message);

    } catch (error) {

      console.log(error);

      // Error message
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

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>


        {/* Email */}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 mb-4"
        />


        {/* Password */}

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 mb-6"
        />


        {/* Login Button */}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;

