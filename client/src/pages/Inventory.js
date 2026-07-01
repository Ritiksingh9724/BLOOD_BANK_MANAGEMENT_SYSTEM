import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import MainLayout from "../layouts/MainLayout";

import toast from "react-hot-toast";

function Inventory() {

  // =========================
  // STATES
  // =========================

  const [inventoryType, setInventoryType] =
    useState("in");

  const [bloodGroup, setBloodGroup] =
    useState("A+");

  const [quantity, setQuantity] =
    useState("");

  const [inventoryData, setInventoryData] =
    useState([]);

  // logged in user

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // =========================
  // ADD INVENTORY
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(

        "https://blood-management-system-ivmq.onrender.com/api/v1/inventory/add-inventory",

        {

          inventoryType,

          bloodGroup,

          quantity,

          email: user?.email,

          organisation: user?._id,

        }
      );

      if (res.data.success) {

        toast.success(
          "Inventory Added Successfully"
        );

        // refresh inventory

        getInventory();

        // clear quantity

        setQuantity("");

      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Something Went Wrong"
      );

    }
  };

  // =========================
  // GET INVENTORY
  // =========================

  const getInventory = async () => {

    try {

      const res = await axios.get(

        "https://blood-management-system-ivmq.onrender.com/api/v1/inventory/all-inventory"
      );

      if (res.data.success) {

        setInventoryData(
          res.data.inventory
        );

      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Error Fetching Inventory"
      );

    }
  };

  // =========================
  // DELETE INVENTORY
  // =========================

  const deleteInventory = async (id) => {

    try {

      const res =
        await axios.delete(

          `
https://blood-management-system-ivmq.onrender.com/api/v1/inventory/delete-inventory/${id}`

        );

      if (res.data.success) {

        toast.success(
          "Inventory Deleted Successfully"
        );

        getInventory();

      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Error Deleting Inventory"
      );

    }
  };

  // =========================
  // USE EFFECT
  // =========================

  useEffect(() => {

    getInventory();

  }, []);

  return (

    <MainLayout>

      <h2 className="mb-4 fw-bold">

        Blood Inventory

      </h2>

      {/* form */}

      <div className="card shadow border-0 rounded-4 p-4 mb-5">

        <h4 className="mb-4">

          Add Blood Inventory

        </h4>

        <form onSubmit={handleSubmit}>

          <div className="row">

            {/* inventory type */}

            <div className="col-md-3 mb-3">

              <label className="form-label">

                Inventory Type

              </label>

              <select
                className="form-select"
                value={inventoryType}
                onChange={(e) =>
                  setInventoryType(
                    e.target.value
                  )
                }
              >

                <option value="in">

                  IN

                </option>

                <option value="out">

                  OUT

                </option>

              </select>

            </div>

            {/* blood group */}

            <div className="col-md-3 mb-3">

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

            <div className="col-md-3 mb-3">

              <label className="form-label">

                Quantity

              </label>

              <input
                type="number"
                className="form-control"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* button */}

            <div className="col-md-3 d-flex align-items-end">

              <button className="btn btn-danger w-100">

                Add Inventory

              </button>

            </div>

          </div>

        </form>

      </div>

      {/* inventory table */}

      <div className="card shadow border-0 rounded-4 p-4">

        <h4 className="mb-4">

          Blood Inventory History

        </h4>

        <div className="table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-dark">

              <tr>

                <th>Type</th>

                <th>Blood Group</th>

                <th>Quantity</th>

                <th>Email</th>

                <th>Date</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {
                inventoryData.map(

                  (item) => (

                    <tr key={item._id}>

                      <td>

                        {
                          item.inventoryType
                        }

                      </td>

                      <td>

                        {
                          item.bloodGroup
                        }

                      </td>

                      <td>

                        {
                          item.quantity
                        }

                      </td>

                      <td>

                        {
                          item.email
                        }

                      </td>

                      <td>

                        {
                          new Date(
                            item.createdAt
                          ).toLocaleDateString()
                        }

                      </td>

                      <td>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            deleteInventory(
                              item._id
                            )
                          }
                        >

                          Delete

                        </button>

                      </td>

                    </tr>

                  )
                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>
  );
}

export default Inventory;