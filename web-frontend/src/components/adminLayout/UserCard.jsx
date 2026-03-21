import React from "react";
import { motion } from "framer-motion";

const UserCard = ({ user }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition"
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex items-center gap-3">
        <div className="bg-gray-200 h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold">
          {user.name?.charAt(0)}
        </div>

        <div>
          <h2 className="font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-600">
        📞 {user.phone || "No phone"}
      </div>

      <div className="flex gap-2 mt-3">
        <button className="btn">View</button>
        <button className="btn-yellow">Block</button>
        <button className="btn-green">Delete</button>
      </div>
    </motion.div>
  );
};

export default UserCard;