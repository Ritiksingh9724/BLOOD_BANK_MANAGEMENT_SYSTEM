import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import MainLayout from "../layouts/MainLayout";

import toast from "react-hot-toast";

function Availability() {

  const [inventoryData, setInventoryData] =
    useState([]);

  // =========================
  // GET INVENTORY
  // =========================

  const getInventory = async () => {

    try {

      const res = await axios.get(

        "https://blood-management-system-6cgc.onrender.com/api/v1/inventory/all-inventory"
      );

      if (res.data.success) {

        setInventoryData(
          res.data.inventory
        );

      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Error Fetching Blood Data"
      );

    }
  };

  // =========================
  // CALCULATE BLOOD
  // =========================

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

  const calculateBlood = (
    group
  ) => {

    let totalIn = 0;

    let totalOut = 0;

    inventoryData.forEach(
      (item) => {

        if (
          item.bloodGroup === group
        ) {

          if (
            item.inventoryType === "in"
          ) {

            totalIn +=
              Number(
                item.quantity
              );

          }

          if (
            item.inventoryType === "out"
          ) {

            totalOut +=
              Number(
                item.quantity
              );

          }

        }

      }
    );

    return totalIn - totalOut;

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

        Blood Availability

      </h2>

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
                      calculateBlood(
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

export default Availability;