import React, {
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

import MainLayout from "../layouts/MainLayout";

import toast from "react-hot-toast";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

function Donors() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  // form states

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [bloodGroup, setBloodGroup] =
    useState("A+");

  const [age, setAge] =
    useState("");

  const [city, setCity] =
    useState("");

  // donor data

  const [donors, setDonors] =
    useState([]);

  const [search, setSearch] =
    useState("");

  // pagination

  const [currentPage, setCurrentPage] =
    useState(1);

  const donorsPerPage = 5;

  // =========================
  // ADD DONOR
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const res = await axios.post(
        "https://blood-bank-management-system-backend-sotl.onrender.com/api/v1/donor/add-donor",
        {
          name,
          phone,
          bloodGroup,
          age,
          city,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {

        toast.success(
          "Donor Added Successfully"
        );

        // refresh donors

        getDonors();

        // clear form

        setName("");

        setPhone("");

        setBloodGroup("A+");

        setAge("");

        setCity("");

      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Something Went Wrong"
      );

    }
  };

  // =========================
  // GET DONORS
  // =========================

  const getDonors = useCallback(async () => {

    try {

      const res = await axios.get(
        "https://blood-bank-management-system-backend-sotl.onrender.com/api/v1/donor/all-donors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {

        setDonors(
          res.data.donors
        );

      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Error Fetching Donors"
      );

    }
}, [token]);

  // =========================
  // DELETE DONOR
  // =========================

  const deleteDonor = async (id) => {
    try {
      const res = await axios.delete(
        `https://blood-bank-management-system-backend-sotl.onrender.com/api/v1/donor/delete-donor/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Donor Deleted Successfully");
        getDonors();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Deleting Donor");
    }
  };

  // =========================
  // EXPORT PDF
  // =========================

  const exportPDF = () => {

    const doc =
      new jsPDF();

    doc.text(
      "Blood Bank Donor Report",
      14,
      15
    );

    const tableColumn = [

      "Name",

      "Phone",

      "Blood Group",

      "Age",

      "City",

    ];

    const tableRows = [];

    donors.forEach((donor) => {

      const donorData = [

        donor.name,

        donor.phone,

        donor.bloodGroup,

        donor.age,

        donor.city,

      ];

      tableRows.push(
        donorData
      );

    });

    autoTable(doc, {

      head: [tableColumn],

      body: tableRows,

      startY: 25,

    });

    doc.save(
      "donor-report.pdf"
    );

    toast.success(
      "PDF Exported Successfully"
    );

  };

  // =========================
  // SEARCH
  // =========================

  const filteredDonors = donors.filter((donor) =>

    donor.name?.toLowerCase().includes(search.toLowerCase()) ||

    donor.phone?.includes(search) ||

    donor.bloodGroup?.toLowerCase().includes(search.toLowerCase()) ||

    donor.city?.toLowerCase().includes(search.toLowerCase())

  );

  // =========================
  // PAGINATION
  // =========================

  const indexOfLastDonor =
    currentPage *
    donorsPerPage;

  const indexOfFirstDonor =
    indexOfLastDonor -
    donorsPerPage;

  const currentDonors =
    filteredDonors.slice(

      indexOfFirstDonor,

      indexOfLastDonor
    );

  const totalPages =
    Math.ceil(

      filteredDonors.length /
      donorsPerPage
    );

  // =========================
  // USE EFFECT
  // =========================
useEffect(() => {
  getDonors();
}, [getDonors]);
  return (

    <MainLayout>

      <h2 className="fw-bold mb-4">

        Donor Management

      </h2>

      {/* form */}

      <div className="card shadow border-0 rounded-4 p-4 mb-5">

        <h4 className="mb-4">

          Add New Donor

        </h4>

        <form onSubmit={handleSubmit}>

          <div className="row">

            {/* name */}

            <div className="col-md-4 mb-3">

              <label className="form-label">

                Name

              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* phone */}

            <div className="col-md-4 mb-3">

              <label className="form-label">

                Phone

              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Phone"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* city */}

            <div className="col-md-4 mb-3">

              <label className="form-label">

                City

              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter City"
                value={city}
                onChange={(e) =>
                  setCity(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* blood group */}

            <div className="col-md-4 mb-3">

              <label className="form-label">

                Blood Group

              </label>

              <select
                className="form-select"
                value={bloodGroup}
                onChange={(e) =>
                  setBloodGroup(
                    e.target.value
                  )
                }
              >

                <option>A+</option>
                <option>B+</option>
                <option>AB+</option>
                <option>O+</option>
                <option>A-</option>
                <option>B-</option>
                <option>AB-</option>
                <option>O-</option>

              </select>

            </div>

            {/* age */}

            <div className="col-md-4 mb-3">

              <label className="form-label">

                Age

              </label>

              <input
                type="number"
                className="form-control"
                placeholder="Enter Age"
                value={age}
                onChange={(e) =>
                  setAge(
                    e.target.value
                  )
                }
                required
              />

            </div>

          </div>

          <button className="btn btn-danger">

            Add Donor

          </button>

        </form>

      </div>

      {/* search + export */}

      <div className="card shadow border-0 rounded-4 p-4 mb-4">

        <div className="row align-items-center">

          <div className="col-md-6 mb-2">

            <input
              type="text"
              className="form-control"
              placeholder="Search Donor By Name..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

          <div className="col-md-6 text-md-end">

            <button
              className="btn btn-success"
              onClick={exportPDF}
            >

              Export PDF

            </button>

          </div>

        </div>

      </div>

      {/* donor table */}

      <div className="card shadow border-0 rounded-4 p-4">

        <h4 className="mb-4">

          Donor List

        </h4>

        <div className="table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-dark">

              <tr>

                <th>Name</th>

                <th>Phone</th>

                <th>Blood Group</th>

                <th>Age</th>

                <th>City</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {
                currentDonors.map(

                  (donor) => (

                    <tr key={donor._id}>

                      <td>
                        {donor.name}
                      </td>

                      <td>
                        {donor.phone}
                      </td>

                      <td>
                        {donor.bloodGroup}
                      </td>

                      <td>
                        {donor.age}
                      </td>

                      <td>
                        {donor.city}
                      </td>

                      <td>

                        {user.role === "admin" && (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteDonor(donor._id)}
                          >
                            Delete
                          </button>
                        )}

                      </td>

                    </tr>

                  )
                )
              }

            </tbody>

          </table>

        </div>

        {/* pagination */}

        <div className="d-flex justify-content-center mt-4">

          <button
            className="btn btn-secondary me-2"
            disabled={
              currentPage === 1
            }
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
          >

            Previous

          </button>

          <span className="align-self-center mx-3">

            Page {currentPage} of {totalPages || 1}

          </span>

          <button
            className="btn btn-secondary"
            disabled={
              currentPage === totalPages ||
              totalPages === 0
            }
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
          >

            Next

          </button>

        </div>

      </div>

    </MainLayout>
  );
}

export default Donors;