import React, { useState } from "react";
import axios from "axios";

const VerifyOTP = () => {

  const email = localStorage.getItem("resetEmail");

  const [otp, setOtp] = useState("");

  const handleVerifyOTP = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://blood-bank-management-system-backend-sotl.onrender.com/api/v1/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      alert(res.data.message);

      window.location.href = "/reset-password";

    } catch (error) {

      alert(
        error?.response?.data?.message ||
        "OTP Verification Failed"
      );

    }
  };

  return (
    <div className="container mt-5">

      <h2>Verify OTP</h2>

      <form onSubmit={handleVerifyOTP}>

        <input
          type="email"
          className="form-control mb-3"
          value={email}
          readOnly
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value)
          }
        />

        <button
          type="submit"
          className="btn btn-success"
        >
          Verify OTP
        </button>

      </form>

    </div>
  );
};

export default VerifyOTP;