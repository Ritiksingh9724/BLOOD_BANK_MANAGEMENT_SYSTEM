import React, {
  useState,
} from "react";

import axios from "axios";

import { toast } from "react-toastify";

import {
  useNavigate,
} from "react-router-dom";

function Register() {

  const navigate =
    useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role: "donor",
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

            "https://blood-bank-management-system-backend-sotl.onrender.com/api/v1/auth/register",

            formData
          );

        if (res.data.success) {

          toast.success(
            res.data.message
          );

          navigate("/login");

        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Something Went Wrong"
        );

      }
    };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card p-4 shadow border-0 rounded-4">

            <h2 className="text-center mb-4 fw-bold">

              Register

            </h2>

            <form onSubmit={handleSubmit}>

              {/* name */}

              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                className="form-control mb-3"
                value={formData.name}
                onChange={handleChange}
                required
              />

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
              <input
                type="text"
                name="phone"
                placeholder="Enter Phone Number"
                className="form-control mb-3"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Enter Hospital Address"
                className="form-control mb-3"
                value={formData.address}
                onChange={handleChange}
                required={formData.role === "hospital"}
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

              {/* role */}

              <div className="mb-3">

                <label className="form-label fw-bold">

                  Select Role

                </label>

                <select
                  className="form-select"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >

                  <option value="donor">

                    Donor

                  </option>

                  <option value="hospital">

                    Hospital

                  </option>

                  <option value="admin">

                    Admin

                  </option>

                </select>

              </div>

              {/* button */}

              <button className="btn btn-success w-100">

                Register

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;