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

            
"http://localhost:5000/api/v1/auth/login",

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

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow border-0 rounded-4 p-4">

            <h2 className="text-center mb-4 fw-bold">

              Login

            </h2>

            <form onSubmit={handleSubmit}>

              {/* email */}

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="form-control mb-3"
                value={formData.email}
                onChange={handleChange}
                required
              />

              {/* password */}

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="form-control mb-3"
                value={formData.password}
                onChange={handleChange}
                required
              />

              {/* login button */}

              <button className="btn btn-danger w-100 mb-3">

                Login

              </button>
              <p>
                <a href="/forgot-password">
                  Forgot Password?
                </a>
              </p>

              {/* register link */}

              <p className="text-center mb-0">

                Don't have an account?

                {" "}

                <Link to="/register">

                  Register

                </Link>

              </p>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;