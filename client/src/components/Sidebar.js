import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaHome,
  FaUser,
  FaTint,
  FaUsers,
  FaHospital,
  FaClipboardList,
  FaChartBar,
  FaMoon,
  FaSun,
  FaHeartbeat,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

import "../styles/sidebar.css";
import { ThemeContext } from "../context/ThemeContext";

function Sidebar() {

  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const { darkMode, setDarkMode } = useContext(ThemeContext);
<button
    className="theme-btn"
    onClick={() => setDarkMode(!darkMode)}
>
    {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
</button>
  const [open, setOpen] = useState(false);

  const menuItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },

    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },

    ...(user?.role === "donor" || user?.role === "admin"
      ? [
        {
          name: "Donors",
          path: "/donors",
          icon: <FaUsers />,
        },
        {
          name: "Inventory",
          path: "/inventory",
          icon: <FaTint />,
        },
      ]
      : []),

    ...(user?.role === "hospital" || user?.role === "admin"
      ? [
        {
          name: "Requests",
          path: "/requests",
          icon: <FaClipboardList />,
        },
      ]
      : []),

    ...(user?.role === "admin"
      ? [
        {
          name: "Hospitals",
          path: "/hospitals",
          icon: <FaHospital />,
        },
        {
          name: "Analytics",
          path: "/analytics",
          icon: <FaChartBar />,
        },
        {
          name: "Availability",
          path: "/availability",
          icon: <FaHeartbeat />,
        },
      ]
      : []),

  ];

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.replace("/login");

  };

  return (

    <>{/* Mobile Header */}

      <div className="d-md-none d-flex justify-content-between align-items-center p-3 bg-danger text-white">

        <div className="d-flex align-items-center">

          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966485.png"
            alt="logo"
            width="45"
            className="me-2"
          />

          <h5 className="mb-0 fw-bold">
            Blood Bank
          </h5>

        </div>

        <button
          className="btn btn-light"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`sidebar ${open ? "d-block" : "d-none d-md-flex"
          } d-flex flex-column justify-content-between`}
      >

        <div>

          <div className="sidebar-logo">

            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966485.png"
              alt="logo"
            />

            <h3>Blood Bank</h3>

            <small>Management System</small>

          </div>

          <div className="user-card">

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="user"
            />

            <h5>{user?.name}</h5>

            <p className="text-capitalize">
              {user?.role}
            </p>

          </div>

          <div className="menu">

            {menuItems.map((item) => (

              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`menu-item ${location.pathname === item.path ? "active" : ""
                  }`}
              >
                {item.icon}

                <span>{item.name}</span>

              </Link>

            ))}

          </div>

        </div>      <div className="bottom-menu">

          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
          >

            {darkMode ? (
              <>
                <FaSun className="me-2" />
                Light Mode
              </>
            ) : (
              <>
                <FaMoon className="me-2" />
                Dark Mode
              </>
            )}

          </button>

          <button
            className="logout-btn"
            onClick={logout}
          >

            <FaSignOutAlt className="me-2" />

            Logout

          </button>

          <div
            style={{
              marginTop: "25px",
              textAlign: "center",
              fontSize: "13px",
              opacity: ".8",
            }}
          >

            ❤️ Blood Management System

            <br />

            Version 2.0

          </div>

        </div>

      </motion.div>

    </>

  );

}

export default Sidebar;