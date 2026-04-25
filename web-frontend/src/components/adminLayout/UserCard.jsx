import React from "react";
import { motion } from "framer-motion";
import axios from "axios";

const UserCard = ({ user }) => {

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/users/${user._id}`
      );

      alert("User deleted successfully");

      // 🔄 refresh page (simple way)
      window.location.reload();

    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  return (
    <motion.div
      className="p-4 transition bg-white shadow-md rounded-3xl hover:shadow-xl"
      whileHover={{ scale: 1.03 }}
    >
      {/* 👤 USER HEADER */}
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center text-lg font-bold text-white rounded-full"
          style={{
            height: "50px",
            width: "50px",
            background: "#2a5298",
          }}
        >
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div>
          <h2 className="font-semibold">
            {user?.name || "Unknown User"}
          </h2>
          <p className="text-sm text-gray-500">
            {user?.email || "No email"}
          </p>
        </div>
      </div>

      {/* 🏷 ROLE */}
      <div className="mt-3">
        <span
          className="px-2 py-1 text-xs text-white rounded"
          style={{
            background:
              user?.role === "citizen" ? "#28a745" : "#6c757d",
          }}
        >
          {user?.role || "unknown"}
        </span>
      </div>

      {/* 🗑 DELETE */}
      <div className="mt-3">
        <button
          className="btn btn-danger btn-sm w-100"
          onClick={handleDelete}
        >
          Delete User
        </button>
      </div>
    </motion.div>
  );
};

export default UserCard;