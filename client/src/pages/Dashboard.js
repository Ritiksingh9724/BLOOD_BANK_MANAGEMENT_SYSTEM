import React from "react";

import MainLayout from "../layouts/MainLayout";

import DashboardChart from "../components/DashboardChart";

import {
  FaUsers,
  FaTint,
  FaClipboardList,
  FaHospital,
} from "react-icons/fa";

function Dashboard() {

  // dashboard cards

  const cards = [

    {
      title: "Total Donors",
      value: 120,
      icon: <FaUsers />,
      color: "primary",
    },

    {
      title: "Blood Units",
      value: 450,
      icon: <FaTint />,
      color: "danger",
    },

    {
      title: "Requests",
      value: 34,
      icon: <FaClipboardList />,
      color: "warning",
    },

    {
      title: "Hospitals",
      value: 15,
      icon: <FaHospital />,
      color: "success",
    },

  ];

  // chart data

  const chartData = [

    {
      bloodGroup: "A+",
      availableBlood: 40,
    },

    {
      bloodGroup: "B+",
      availableBlood: 30,
    },

    {
      bloodGroup: "O+",
      availableBlood: 50,
    },

    {
      bloodGroup: "AB+",
      availableBlood: 20,
    },

    {
      bloodGroup: "A-",
      availableBlood: 15,
    },

    {
      bloodGroup: "B-",
      availableBlood: 10,
    },

    {
      bloodGroup: "O-",
      availableBlood: 18,
    },

    {
      bloodGroup: "AB-",
      availableBlood: 8,
    },

  ];

  return (

    <MainLayout>

      <h2 className="mb-4 fw-bold">

        Dashboard Analytics

      </h2>

      {/* dashboard cards */}

      <div className="row">

        {
          cards.map((card, index) => (

            <div
              className="col-lg-3 col-md-6 mb-4"
              key={index}
            >

              <div
                className="card shadow border-0 rounded-4 p-4"
              >

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <h6 className="text-muted">

                      {card.title}

                    </h6>

                    <h1
                      className={`fw-bold text-${card.color}`}
                    >

                      {card.value}

                    </h1>

                  </div>

                  <div
                    className={`fs-1 text-${card.color}`}
                  >

                    {card.icon}

                  </div>

                </div>

              </div>

            </div>

          ))
        }

      </div>

      {/* chart section */}

      <DashboardChart
        data={chartData}
      />

      {/* overview section */}

      <div
        className="card shadow border-0 rounded-4 p-4 mt-4"
      >

        <h4 className="mb-3 fw-bold">

          System Overview

        </h4>

        <p className="mb-2">

          This Blood Management System helps hospitals and donors manage:

        </p>

        <ul>

          <li>
            Blood Inventory Management
          </li>

          <li>
            Donor Information Tracking
          </li>

          <li>
            Blood Requests Handling
          </li>

          <li>
            Hospital Blood Records
          </li>

          <li>
            Analytics and Reporting
          </li>

        </ul>

      </div>

    </MainLayout>
  );
}

export default Dashboard;