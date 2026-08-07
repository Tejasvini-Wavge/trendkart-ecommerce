import { useState } from "react";
import axios from "axios";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


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
          password
        }
      );


      alert(response.data.message);


      // clear form after successful registration
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");


    } catch (error) {

      console.log(error);

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

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>


        {/* Name */}

        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 mb-4"
        />


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


        <p className="text-center mt-4">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer">
            Login
          </span>
        </p>


      </form>

    </div>

  );
}



export default Register;