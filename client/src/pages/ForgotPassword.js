import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSendOTP = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "https://blood-bank-management-system-backend-sotl.onrender.com/api/v1/auth/send-otp",
                { email }
            );

            console.log(res.data);

            localStorage.setItem("resetEmail", email);
            window.location.href = "/verify-otp";
        } catch (error) {
            console.log(error.response?.data);
            console.log(error);
        }
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