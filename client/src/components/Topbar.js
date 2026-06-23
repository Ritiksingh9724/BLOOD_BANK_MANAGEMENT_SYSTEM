import React from "react";

import {
  FaBell,
  FaBars,
} from "react-icons/fa";

function Topbar({ toggleSidebar }) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div
      className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center"
    >

      <div className="d-flex align-items-center">

        <button
          className="btn btn-danger me-3"
          onClick={toggleSidebar}
        >

          <FaBars />

        </button>

        <h4 className="mb-0">
          Dashboard
        </h4>

      </div>

      <div className="d-flex align-items-center">

        <FaBell
          size={22}
          className="me-4 text-danger"
        />

        <h5 className="mb-0">
          {user?.name}
        </h5>

      </div>

    </div>
  );
}

export default Topbar;