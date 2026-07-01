import React, { useState } from "react";
import axios from "axios";

const ResetPassword = () => {

    const email = localStorage.getItem("resetEmail");

    const [newPassword, setNewPassword] =
        useState("");

    const handleResetPassword =
        async (e) => {

            e.preventDefault();

            try {

                const res = await axios.post(
                    "https://blood-management-system-ivmq.onrender.com/api/v1/auth/reset-password",
                    {
                        email,
                        newPassword,
                    }
                );

                alert(res.data.message);

                // remove stored email
                localStorage.removeItem("resetEmail");

                // redirect to login page
                window.location.href = "/login";

            } catch (error) {

                console.log(error);

                alert("Failed to reset password");

            }
        };

    return (
        <div className="container mt-5">

            <h2>Reset Password</h2>

            <form onSubmit={handleResetPassword}>

                <input
                    type="email"
                    className="form-control mb-3"
                    value={email}
                    readOnly
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) =>
                        setNewPassword(e.target.value)
                    }
                />

                <button className="btn btn-danger">
                    Reset Password
                </button>

            </form>

        </div>
    );
};

export default ResetPassword;