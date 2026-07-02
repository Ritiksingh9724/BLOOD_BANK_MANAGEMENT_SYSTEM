import React, {
  useState,
} from "react";

import axios from "axios";

import { toast } from "react-toastify";

import {
  useNavigate,
  Link,
} from "react-router-dom";

function Login() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      email: "",

      password: "",

    });

  // handle input

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  // handle submit

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await axios.post(

            
"https://blood-bank-management-system-backend-sotl.onrender.com/api/v1/auth/login",

            formData
          );

        if (res.data.success) {

          toast.success(
            res.data.message
          );

          // save token

          localStorage.setItem(

            "token",

            res.data.token
          );

          // save user

          localStorage.setItem(

            "user",

            JSON.stringify(
              res.data.user
            )
          );

          // role based redirect

          if (
            res.data.user.role ===
            "admin"
          ) {

            navigate("/dashboard");

          }

          else if (
            res.data.user.role ===
            "hospital"
          ) {

            navigate("/requests");

          }

          else {

            navigate("/donors");

          }

        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Invalid Email or Password"
        );

      }

    };

  return (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{
      minHeight: "100vh",
      background:
        "linear-gradient(135deg,#348296,#1e293b)",
    }}
  >
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7">

          <div
            className="card border-0 shadow-lg p-5"
            style={{
              borderRadius: "20px",
              background: "#1f2937",
            }}
          >
            <div className="text-center mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2966/2966484.png"
                alt="blood"
                width="80"
              />

              <h2
                className="fw-bold mt-3"
                style={{ color: "#fff" }}
              >
                Blood Bank
              </h2>

              <p style={{ color: "#cbd5e1" }}>
                Login to continue
              </p>
            </div>

            <form onSubmit={handleSubmit}>

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="form-control mb-3"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  height: "50px",
                  borderRadius: "12px",
                }}
              />

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="form-control mb-3"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  height: "50px",
                  borderRadius: "12px",
                }}
              />

              <button
                className="btn btn-danger w-100 mb-3"
                style={{
                  height: "50px",
                  borderRadius: "12px",
                  fontWeight: "600",
                }}
              >
                Login
              </button>

              <div className="d-flex justify-content-between">

                <Link
                  to="/forgot-password"
                  style={{
                    color: "#60a5fa",
                    textDecoration: "none",
                  }}
                >
                  Forgot Password?
                </Link>

                <Link
                  to="/register"
                  style={{
                    color: "#60a5fa",
                    textDecoration: "none",
                  }}
                >
                  Register
                </Link>

              </div>

            </form>

          </div>

        </div>
      </div>
    </div>
  </div>
);
}
export default Login;