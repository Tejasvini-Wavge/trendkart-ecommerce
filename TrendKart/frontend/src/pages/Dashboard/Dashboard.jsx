import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {

    // Remove JWT token
    localStorage.removeItem("token");

    // Remove user information
    localStorage.removeItem("user");

    // Go to Login page
    navigate("/login");
  };

  return (
    <div>

      <h1>Welcome to TrendKart 🎉</h1>

      <p>You are logged in successfully.</p>

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}

export default Dashboard;