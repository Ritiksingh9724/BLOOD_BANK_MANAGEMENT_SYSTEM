import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSendOTP = async (e) => {
        e.preventDefault();

        await axios.post(
            "https://blood-management-system-6cgc.onrender.com/api/v1/auth/send-otp",
            { email }
        );

        localStorage.setItem("resetEmail", email);
        window.location.href = "/verify-otp";
    };

    return (
        <div className="container mt-5">
            <h2>Forgot Password</h2>

            <form onSubmit={handleSendOTP}>
                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button className="btn btn-primary">
                    Send OTP
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;