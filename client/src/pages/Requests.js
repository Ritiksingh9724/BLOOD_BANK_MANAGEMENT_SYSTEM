import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import MainLayout from "../layouts/MainLayout";

import toast from "react-hot-toast";

function Requests() {

  // logged in user

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // states

  const [hospitalName, setHospitalName] =
    useState("");

  const [bloodGroup, setBloodGroup] =
    useState("A+");

  const [quantity, setQuantity] =
    useState("");

  const [requests, setRequests] =
    useState([]);
  const [search, setSearch] = useState("");
  // ============================
  // CREATE REQUEST
  // ============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(

        "http://localhost:5000/api/v1/request/create-request",

        {
          hospitalId: user._id,
          hospitalName,
          bloodGroup,
          quantity,
          email: user.email,
        }

      );

      if (res.data.success) {

        toast.success(
          res.data.message
        );

        // refresh requests

        getRequests();

        // clear form

        setHospitalName("");

        setQuantity("");

      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Error Sending Request"
      );

    }
  };

  // ============================
  // GET REQUESTS
  // ============================
  const getRequests = async () => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.get(
        `http://localhost:5000/api/v1/request/get-requests?hospitalId=${user._id}&role=${user.role}`
      );

      if (res.data.success) {

        setRequests(res.data.requests);

      }

    } catch (error) {

      console.log(error);

    }
  };
  // ============================
  // UPDATE STATUS
  // ============================

  const updateStatus =
    async (id, status) => {

      try {

       const res = await axios.put(
  `http://localhost:5000/api/v1/request/update-status/${id}`,
          { status }

        );

        if (res.data.success) {

          toast.success(
            "Request Updated"
          );

          getRequests();

        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Error Updating Request"
        );

      }
    };
  // ============================
  // PAYMENT FUNCTION
  // ============================

  const handlePayment = async (request) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/payment/create-order",
        {
          units: Number(request.quantity),
        }
      );

      const order = res.data.order;

      const options = {
        key: "rzp_test_T3U6Emm2cOvLxZ",
        amount: order.amount,
        currency: order.currency,
        name: "Blood Bank Management",
        description: `${request.quantity} Unit Blood Payment`,
        order_id: order.id,

        handler: async function () {
          try {
            await axios.put(
              `http://localhost:5000/api/v1/request/payment/${request._id}`
            );

            toast.success("Payment Successful");
            getRequests();
          } catch (error) {
            console.log(error);
            toast.error("Error Updating Payment Status");
          }
        },

        prefill: {
          name: hospitalName,
          email: user?.email,
        },

        theme: {
          color: "#dc3545",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (error) {
      console.log(error);
      toast.error("Payment Failed");
    }
  };
  // ============================
  // LOAD REQUESTS
  // ============================

  useEffect(() => {

    getRequests();

  }, []);
  const filteredRequests = requests.filter((request) =>

    request.hospitalName
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    request.bloodGroup
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    request.status
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    request.paymentStatus
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    request.quantity
      ?.toString()
      .includes(search)

  );
  return (

    <MainLayout>

      {/* heading */}

      <h2 className="fw-bold mb-4">

        Blood Requests

      </h2>

      {/* ============================
          REQUEST FORM
      ============================ */}

      {
        user?.role === "hospital" && (

          <div className="card shadow border-0 rounded-4 p-4 mb-5">

            <h4 className="mb-4">

              Send Blood Request

            </h4>

            <form onSubmit={handleSubmit}>

              <div className="row">

                {/* hospital name */}

                <div className="col-md-4 mb-3">

                  <label className="form-label">

                    Hospital Name

                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={hospitalName}
                    onChange={(e) =>
                      setHospitalName(
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

                {/* quantity */}

                <div className="col-md-4 mb-3">

                  <label className="form-label">

                    Quantity

                  </label>

                  <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

              </div>

              <button className="btn btn-danger">

                Send Request

              </button>

            </form>

          </div>

        )
      }

      {/* ============================
          REQUEST TABLE
      ============================ */}

      <div className="card shadow border-0 rounded-4 p-4">

        <h4 className="mb-4">

          Request List

        </h4>
        <div className="mb-4">

          <input
            type="text"
            className="form-control"
            placeholder="Search Hospital, Blood Group, Status, Payment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>
        <div className="table-responsive">

          <table className="table table-bordered align-middle">

            <thead className="table-dark">

              <tr>

                <th>Hospital</th>

                <th>Blood Group</th>

                <th>Quantity</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {
                requests.length > 0 ? (

                  filteredRequests.map((request) => (

                    <tr key={request._id}>

                      <td>
                        {request.hospitalName}
                      </td>

                      <td>
                        {request.bloodGroup}
                      </td>

                      <td>
                        {request.quantity}
                      </td>

                      {/* status */}

                      <td>

                        <span
                          className={`badge px-3 py-2

                          ${request.status === "Approved"
                              ? "bg-success"

                              : request.status === "Rejected"
                                ? "bg-danger"

                                : "bg-warning text-dark"
                            }`}
                        >

                          {request.status}

                        </span>

                      </td>

                      {/* actions */}

                      <td>

                        {
                          user?.role === "admin" && (

                            <>

                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() =>
                                  updateStatus(
                                    request._id,
                                    "Approved"
                                  )
                                }
                              >

                                Approve

                              </button>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  updateStatus(
                                    request._id,
                                    "Rejected"
                                  )
                                }
                              >

                                Reject

                              </button>

                            </>

                          )
                        }

                        {
                          user?.role === "hospital" &&
                          request.status === "Pending" && (

                            <span className="text-muted">

                              Waiting For Admin

                            </span>

                          )
                        }

                        {user?.role === "hospital" &&
                          request.status === "Approved" && (

                            request.paymentStatus === "Paid" ? (

                              <button
                                className="btn btn-success btn-sm"
                                disabled
                              >
                                Paid ✅
                              </button>

                            ) : (

                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handlePayment(request)}
                              >
                                Pay
                              </button>

                            )
                          )}

                        {
                          user?.role === "hospital" &&
                          request.status === "Rejected" && (

                            <span className="text-danger">

                              Request Rejected

                            </span>

                          )
                        }
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center"
                    >

                      No Requests Found

                    </td>

                  </tr>

                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>
  );
}

export default Requests;