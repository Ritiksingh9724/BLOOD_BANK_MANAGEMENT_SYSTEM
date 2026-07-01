import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import MainLayout from "../layouts/MainLayout";

import toast from "react-hot-toast";

function Hospitals() {

  const [hospitalName, setHospitalName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [hospitals, setHospitals] =
    useState([]);

  // add hospital
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(

        "https://blood-management-system-ivmq.onrender.com/api/v1/hospital/create-hospital",

        {
          hospitalName,
          email,
          phone,
          address,
        }
      );

      if (res.data.success) {

        toast.success(res.data.message);

        getHospitals();

        setHospitalName("");
        setEmail("");
        setPhone("");
        setAddress("");

      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Error Adding Hospital"
      );

    }
  };

  // get hospitals
  const getHospitals = async () => {

    try {

      const res = await axios.get(
        "https://blood-management-system-ivmq.onrender.com/api/v1/hospital/get-hospitals"
      );

      if (res.data.success) {

        setHospitals(
          res.data.hospitals
        );

      }

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    getHospitals();

  }, []);

  return (
    <MainLayout>

      <h2 className="fw-bold mb-4">
        Hospital Management
      </h2>

      {/* form */}

      <div className="card shadow border-0 rounded-4 p-4 mb-5">

        <h4 className="mb-4">
          Add New Hospital
        </h4>

        <form onSubmit={handleSubmit}>

          <div className="row">

            {/* hospital name */}

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Hospital Name
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Hospital Name"
                value={hospitalName}
                onChange={(e) =>
                  setHospitalName(
                    e.target.value
                  )
                }
              />

            </div>

            {/* email */}

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

            {/* phone */}

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Phone
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Phone"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />

            </div>

            {/* address */}

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Address
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Address"
                value={address}
                onChange={(e) =>
                  setAddress(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          <button className="btn btn-danger">

            Add Hospital

          </button>

        </form>

      </div>

      {/* hospital table */}

      <div className="card shadow border-0 rounded-4 p-4">

        <h4 className="mb-4">
          Hospital List
        </h4>

        <table className="table table-bordered">

          <thead>

            <tr>

              <th>Hospital Name</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Address</th>

            </tr>

          </thead>

          <tbody>

            {
              hospitals.map((hospital) => (

                <tr key={hospital._id}>

                  <td>
                    {hospital.hospitalName}
                  </td>

                  <td>
                    {hospital.email}
                  </td>

                  <td>
                    {hospital.phone}
                  </td>

                  <td>
                    {hospital.address}
                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}

export default Hospitals;