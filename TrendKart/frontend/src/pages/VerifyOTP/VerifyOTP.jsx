import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyOTP() {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !otp) {
    alert("Please enter email and OTP");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/auth/verify-otp",
      {
        email: email,
        otp: otp
      }
    );

  alert(response.data.message);

navigate("/login");

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "OTP verification failed"
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
          Verify OTP
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Enter the OTP sent to your email
        </p>


        {/* Email */}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 mb-4"
        />


        {/* OTP */}

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength="6"
          className="w-full border border-gray-300 rounded-md p-3 mb-6"
        />


        {/* Button */}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
        >
          Verify OTP
        </button>

      </form>

    </div>
  );
}


export default VerifyOTP;