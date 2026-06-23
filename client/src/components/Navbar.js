import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // logout
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">

      <Link
        to="/dashboard"
        className="navbar-brand"
      >
        Blood Management
      </Link>

      <div>

        <span className="text-white me-3">
          {user?.name}
        </span>

        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;