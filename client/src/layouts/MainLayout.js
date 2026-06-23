import React, { useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function MainLayout({ children }) {

  const [showSidebar, setShowSidebar] =
    useState(true);

  return (
    <div className="d-flex">

      {
        showSidebar && (
          <Sidebar />
        )
      }

      <div className="w-100">

        <Topbar
          toggleSidebar={() =>
            setShowSidebar(!showSidebar)
          }
        />

        <div className="p-4">

          {children}

        </div>

      </div>

    </div>
  );
}

export default MainLayout;