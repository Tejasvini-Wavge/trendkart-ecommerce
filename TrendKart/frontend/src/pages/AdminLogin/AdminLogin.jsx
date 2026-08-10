import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/admin/login",
        {
          email,
          password
        }
      );

      // Save Admin JWT
      localStorage.setItem(
        "adminToken",
        response.data.token
      );

      // Save Admin information
      localStorage.setItem(
        "admin",
        JSON.stringify(response.data.admin)
      );

      alert("Admin login successful");

      navigate("/admin/dashboard");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Admin login failed"
      );
    }
  };

  return (
    <div>

      <h1>Admin Login 👨‍💼</h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Admin Login
        </button>

      </form>

    </div>
  );
}

export default AdminLogin;