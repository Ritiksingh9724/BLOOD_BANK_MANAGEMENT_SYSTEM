import React from "react";
import MainLayout from "../layouts/MainLayout";
import DashboardChart from "../components/DashboardChart";

import {
  FaUsers,
  FaTint,
  FaClipboardList,
  FaHospital,
  FaArrowUp,
  FaHeartbeat,
} from "react-icons/fa";

import { motion } from "framer-motion";

function Dashboard() {

  // dashboard cards
  const cards = [

    {
      title: "Total Donors",
      value: "120",
      change: "+18%",
      icon: <FaUsers />,
      color: "#4F46E5",
      bg: "#EEF2FF",
    },

    {
      title: "Blood Units",
      value: "450",
      change: "+9%",
      icon: <FaTint />,
      color: "#DC2626",
      bg: "#FEE2E2",
    },

    {
      title: "Requests",
      value: "34",
      change: "+6%",
      icon: <FaClipboardList />,
      color: "#D97706",
      bg: "#FEF3C7",
    },

    {
      title: "Hospitals",
      value: "15",
      change: "+3%",
      icon: <FaHospital />,
      color: "#059669",
      bg: "#D1FAE5",
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

      <div className="mb-4">

        <h2 className="fw-bold">

          Analytics Overview

        </h2>

        <p className="text-muted mb-0">

          Monitor your blood bank in real-time.

        </p>

      </div>

      {/* dashboard cards */}

      <div className="row g-4">

        {

          cards.map((card, index) => (

            <motion.div

              key={index}

              className="col-xl-3 col-md-6"

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: index * .15 }}

            >

              <div

                className="card border-0 shadow rounded-4 h-100"

                style={{

                  overflow: "hidden"

                }}

              >

                <div className="card-body">

                  <div className="d-flex justify-content-between">

                    <div>

                      <p className="text-muted mb-2">

                        {card.title}

                      </p>

                      <h2 className="fw-bold">

                        {card.value}

                      </h2>

                      <span className="badge bg-success">

                        <FaArrowUp className="me-1" />

                        {card.change}

                      </span>

                    </div>

                    <div

                      style={{

                        width: 70,

                        height: 70,

                        borderRadius: "20px",

                        background: card.bg,

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "center",

                        fontSize: "30px",

                        color: card.color

                      }}

                    >

                      {card.icon}

                    </div>

                  </div>

                </div>

              </div>

            </motion.div>

          ))

        }

      </div>
{/* Blood Availability */}

<div className="row mt-2">

  <div className="col-lg-12">

    <div className="card border-0 shadow rounded-4 p-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h4 className="fw-bold">
            Blood Availability
          </h4>

          <small className="text-muted">
            Current Blood Stock
          </small>

        </div>

        <FaHeartbeat
          size={35}
          className="text-danger"
        />

      </div>

      {

        chartData.map((item,index)=>(

          <div
            key={index}
            className="mb-3"
          >

            <div className="d-flex justify-content-between">

              <strong>

                {item.bloodGroup}

              </strong>

              <span>

                {item.availableBlood} Units

              </span>

            </div>

            <div className="progress mt-2">

              <div

                className="progress-bar bg-danger"

                style={{

                  width:`${item.availableBlood*2}%`

                }}

              >

              </div>

            </div>

          </div>

        ))

      }

    </div>

  </div>


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