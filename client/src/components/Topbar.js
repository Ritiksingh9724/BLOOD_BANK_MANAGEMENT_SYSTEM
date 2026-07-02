import React, { useContext, useRef, useState, useEffect } from "react";
import "./Topbar.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBars,
  FaBell,
  FaMoon,
  FaSun,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

function Topbar({ toggleSidebar }) {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // ==========================
  // GET NOTIFICATIONS
  // ==========================
  const getNotifications = async () => {
    try {
      const res = await axios.get(
        `https://blood-bank-management-system-backend-sotl.onrender.com/api/v1/notification/${user?._id}`
      );
      if (res.data.success) {
        setNotifications(res.data.notifications);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // LOAD
  // ==========================
  useEffect(() => {
    if (user?._id) {
      getNotifications();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);
  // ==========================
  // CLOSE DROPDOWNS
  // ==========================
  useEffect(() => {
    const handleClick = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setShowNotification(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  // ==========================
  // LOGOUT
  // ==========================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("/login");
  };

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="topbar shadow-sm px-4 py-3 d-flex justify-content-between align-items-center rounded-4 mb-4"
    >
      {/* Left */}
      <div className="d-flex align-items-center">
        <button
          className="btn btn-danger rounded-circle me-3"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
        <div>
          <h3 className="topbar-title mb-0">
            Welcome, {user?.name}
          </h3>

          <small className="topbar-date">
            {today}
          </small>
        </div>
      </div>



      {/* Right */}
      <div className="d-flex align-items-center">
        {/* Notification */}
        <div className="position-relative me-3" ref={notificationRef}>
          <button
            className="topbar-btn rounded-circle position-relative"
            onClick={() => setShowNotification(!showNotification)}
          >
            <FaBell size={18} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {notifications.filter((item) => !item.isRead).length}
            </span>
          </button>

          {showNotification && (
            <div
              className="card shadow-lg border-0 position-absolute end-0 mt-3 rounded-4"
              style={{
                width: "340px",
                zIndex: 999,
                maxHeight: "420px",
                overflowY: "auto",
              }}
            >
              <div className="card-body">
                <h5 className="fw-bold mb-3">Notifications</h5>
                <hr />
                {notifications.length === 0 ? (
                  <p className="text-center text-muted">No Notifications</p>
                ) : (
                  notifications.map((item) => (
                    <div key={item._id} className="border-bottom pb-2 mb-3">
                      <h6 className="fw-bold">{item.title}</h6>
                      <small>{item.message}</small>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Dark Mode */}
        <button
          className="topbar-btn rounded-circle me-3"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        {/* Profile */}
        <div className="position-relative" ref={profileRef}>
          <img
            src={user?.profileImage}
            alt="profile"
            width="45"
            height="45"
            className="rounded-circle border border-3 border-danger"
            style={{ cursor: "pointer" }}
            onClick={() => setShowProfile(!showProfile)}
          />

          {showProfile && (
            <div
              className="card shadow-lg border-0 position-absolute end-0 mt-3 rounded-4"
              style={{ width: "240px", zIndex: 999 }}
            >
              <div className="card-body">
                <div className="text-center mb-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="profile"
                    width="45"
                    height="45"
                    className="rounded-circle border border-3 border-danger"
                    style={{
                      cursor: "pointer",
                      objectFit: "cover",
                    }}
                    onClick={() => setShowProfile(!showProfile)}
                  />
                  <h5 className="mt-2">{user?.name}</h5>
                  <small className="text-muted">{user?.role}</small>
                </div>
                <hr />
                <Link to="/profile" className="dropdown-item py-2">
                  <FaUserCircle className="me-2" />
                  My Profile
                </Link>
                <button className="dropdown-item py-2">
                  <FaCog className="me-2" />
                  Settings
                </button>
                <button className="dropdown-item text-danger py-2" onClick={logout}>
                  <FaSignOutAlt className="me-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Topbar;