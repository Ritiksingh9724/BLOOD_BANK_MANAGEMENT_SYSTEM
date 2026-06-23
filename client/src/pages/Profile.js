import React from "react";

import MainLayout from "../layouts/MainLayout";

function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <MainLayout>

      <div className="card shadow p-5 border-0 rounded-4">

        <h2 className="mb-4">
          User Profile
        </h2>

        <h4>
          Name: {user?.name}
        </h4>

        <h4>
          Email: {user?.email}
        </h4>

        <h4>
          Role: {user?.role}
        </h4>

      </div>

    </MainLayout>
  );
}

export default Profile;