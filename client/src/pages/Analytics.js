import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import MainLayout from "../layouts/MainLayout";

import toast from "react-hot-toast";

function Analytics() {

  const [inventoryData, setInventoryData] =
    useState([]);

  // =========================
  // GET INVENTORY
  // =========================

  const getInventory = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/v1/inventory/all-inventory"
      );

      if (res.data.success) {

        setInventoryData(
          res.data.inventory
        );

      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Error Fetching Analytics"
      );

    }
  };

  // =========================
  // CALCULATIONS
  // =========================

  const totalIn =
    inventoryData
      .filter(
        (item) =>
          item.inventoryType === "in"
      )
      .reduce(
        (acc, item) =>
          acc +
          Number(item.quantity),
        0
      );

  const totalOut =
    inventoryData
      .filter(
        (item) =>
          item.inventoryType === "out"
      )
      .reduce(
        (acc, item) =>
          acc +
          Number(item.quantity),
        0
      );

  const totalAvailable =
    totalIn - totalOut;

  // blood groups

  const bloodGroups = [

    "A+",
    "A-",

    "B+",
    "B-",

    "AB+",
    "AB-",

    "O+",
    "O-",

  ];

  // calculate by group

  const calculateGroup =
    (group) => {

      const totalInGroup =
        inventoryData

          .filter(

            (item) =>

              item.bloodGroup === group &&

              item.inventoryType === "in"
          )

          .reduce(

            (acc, item) =>

              acc +
              Number(item.quantity),

            0
          );

      const totalOutGroup =
        inventoryData

          .filter(

            (item) =>

              item.bloodGroup === group &&

              item.inventoryType === "out"
          )

          .reduce(

            (acc, item) =>

              acc +
              Number(item.quantity),

            0
          );

      return (
        totalInGroup -
        totalOutGroup
      );
    };

  // =========================
  // USE EFFECT
  // =========================

  useEffect(() => {

    getInventory();

  }, []);

  return (

    <MainLayout>

      <h2 className="fw-bold mb-4">

        Blood Stock Analytics

      </h2>

      {/* summary cards */}

      <div className="row mb-5">

        <div className="col-md-4 mb-3">

          <div className="card shadow border-0 rounded-4 p-4 text-center">

            <h4 className="text-success">

              Total Blood IN

            </h4>

            <h1 className="fw-bold">

              {totalIn}

            </h1>

          </div>

        </div>

        <div className="col-md-4 mb-3">

          <div className="card shadow border-0 rounded-4 p-4 text-center">

            <h4 className="text-danger">

              Total Blood OUT

            </h4>

            <h1 className="fw-bold">

              {totalOut}

            </h1>

          </div>

        </div>

        <div className="col-md-4 mb-3">

          <div className="card shadow border-0 rounded-4 p-4 text-center">

            <h4 className="text-primary">

              Available Stock

            </h4>

            <h1 className="fw-bold">

              {totalAvailable}

            </h1>

          </div>

        </div>

      </div>

      {/* blood group cards */}

      <div className="row">

        {
          bloodGroups.map(

            (group, index) => (

              <div
                className="col-lg-3 col-md-4 col-sm-6 mb-4"
                key={index}
              >

                <div className="card shadow border-0 rounded-4 p-4 text-center">

                  <h3 className="fw-bold text-danger">

                    {group}

                  </h3>

                  <h1 className="fw-bold">

                    {
                      calculateGroup(
                        group
                      )
                    }

                  </h1>

                  <p className="text-muted">

                    Units Available

                  </p>

                </div>

              </div>

            )
          )
        }

      </div>

    </MainLayout>
  );
}

export default Analytics;