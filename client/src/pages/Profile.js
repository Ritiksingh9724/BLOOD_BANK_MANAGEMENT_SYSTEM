import React, { useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [name, setName] = useState(
    user?.name
  );

  const [email, setEmail] = useState(
    user?.email
  );

  const [phone, setPhone] = useState(
    user?.phone || ""
  );

  const handleUpdateProfile =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await axios.put(
            "http://localhost:5000/api/v1/auth/update-profile",
            {
              id: user._id,
              name,
              email,
              phone,
            }
          );

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        alert(
          "Profile Updated Successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Error Updating Profile"
        );

      }
    };

  return (
    <MainLayout>

      <div className="card shadow p-5 border-0 rounded-4">

        <h2 className="mb-4">
          Edit Profile
        </h2>

        <form
          onSubmit={
            handleUpdateProfile
          }
        >

          <label>
            Name
          </label>

          <input
            type="text"
            className="form-control mb-3"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <label>
            Email
          </label>

          <input
            type="email"
            className="form-control mb-3"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />
          <label>
            Phone Number
          </label>

          <input
            type="text"
            className="form-control mb-3"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />
          <label>
            Role
          </label>

          <input
            type="text"
            className="form-control mb-3"
            value={user?.role}
            readOnly
          />

          <button
            className="btn btn-primary"
          >
            Update Profile
          </button>

        </form>

      </div>

    </MainLayout>
  );
}

export default Profile;