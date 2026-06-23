import React, {
  useContext,
  useState,
} from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  FaHome,
  FaUser,
  FaTint,
  FaUsers,
  FaHospital,
  FaClipboardList,
  FaChartBar,
  FaMoon,
  FaHeartbeat,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  ThemeContext,
} from "../context/ThemeContext";

function Sidebar() {

  const location =
    useLocation();

  // current user

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // dark mode

  const {
    darkMode,
    setDarkMode,
  } = useContext(
    ThemeContext
  );

  // mobile sidebar

  const [open, setOpen] =
    useState(false);

  // menu items

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

    // donor pages

    ...(user?.role === "donor" ||

      user?.role === "admin"

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

    // hospital pages

    ...(user?.role === "hospital" ||

      user?.role === "admin"

      ? [

          {
            name: "Requests",
            path: "/requests",
            icon: <FaClipboardList />,
          },

        ]

      : []),

    // admin pages

    ...(user?.role === "admin"

      ? [

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

          {
            name: "Hospitals",
            path: "/hospitals",
            icon: <FaHospital />,
          },

        ]

      : []),

  ];

  // logout

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href =
      "/login";

  };

  return (

    <>

      {/* mobile navbar */}

      <div
        className="d-md-none d-flex justify-content-between align-items-center p-3 bg-danger text-white"
      >

        <h4 className="mb-0 fw-bold">

          Blood Bank

        </h4>

        <button
          className="btn btn-light"
          onClick={() =>
            setOpen(!open)
          }
        >

          {
            open
              ? <FaTimes />
              : <FaBars />
          }

        </button>

      </div>

      {/* sidebar */}

      <div
        className={`p-3 d-flex flex-column justify-content-between

        ${
          darkMode
            ? "bg-black text-white"
            : "bg-dark text-white"
        }

        ${
          open
            ? "d-block"
            : "d-none d-md-flex"
        }`}
        style={{
          width: "250px",
          minHeight: "100vh",
        }}
      >

        {/* top section */}

        <div>

          <h2 className="mb-5 text-center fw-bold d-none d-md-block">

            Blood Bank

          </h2>

          {
            menuItems.map((item) => (

              <Link
                key={item.path}
                to={item.path}
                onClick={() =>
                  setOpen(false)
                }
                className={`d-flex align-items-center text-decoration-none p-3 mb-3 rounded

                ${
                  location.pathname === item.path
                    ? "bg-danger text-white"
                    : "text-white"
                }`}
              >

                <span className="me-3">

                  {item.icon}

                </span>

                <span>

                  {item.name}

                </span>

              </Link>

            ))
          }

        </div>

        {/* bottom section */}

        <div>

          {/* dark mode */}

          <button
            className="btn btn-secondary w-100 mb-3"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >

            <FaMoon className="me-2" />

            {
              darkMode
                ? "Light Mode"
                : "Dark Mode"
            }

          </button>

          {/* logout */}

          <button
            className="btn btn-danger w-100"
            onClick={handleLogout}
          >

            <FaSignOutAlt className="me-2" />

            Logout

          </button>

        </div>

      </div>

    </>

  );
}

export default Sidebar;