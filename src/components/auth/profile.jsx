import React, { useState } from "react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Cross2Icon, PinLeftIcon } from "@radix-ui/react-icons";
import { handleGeneratePDF } from "../../hooks/homeLogic";
import "./profile.css";
import Spinner from "../Home/Spinner";

const Profile = ({ date }) => {
  const { user, isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  if (!isLoaded) return <Spinner />;
  const handleSignOut = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  return (
    <>
      <button
        className="profile-image-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Open Profile Modal"
      >
        <img
          src={user.imageUrl}
          alt="User Profile"
        />
      </button>

      {isOpen && (
        <div className="profile-modal-overlay" onClick={() => setIsOpen(false)}>
          <div
            className="profile-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="profile-modal-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
            >
              <Cross2Icon />
            </button>
            <img
              src={user.imageUrl}
              alt="User Profile"
              className="profile-modal-avatar"
            />
            <h2 className="profile-modal-title">
              {user.fullName || user.username || "User"}
            </h2>
            <div className="profile-modal-email" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <p style={{ fontSize: 18, display: "inline" }}>{user.primaryEmailAddress?.emailAddress}</p>
              <div className="profile-logout"><SignOutButton signOutCallback={handleSignOut}>
                <PinLeftIcon width={25} height={25} />
              </SignOutButton></div>
            </div>
            <button
              type="button"
              className="report-button"
              onClick={() => handleGeneratePDF(date)}
            >
              Generate Report
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
