import React from "react";

const StatusBadge = ({ status }) => {
  const colors = {
    Pending: "bg-red-100 text-red-600",
    Verified: "bg-blue-100 text-blue-600",
    "In Progress": "bg-yellow-100 text-yellow-600",
    Completed: "bg-green-100 text-green-600",
  };

  return (
    <span className={`px-3 py-1 text-xs rounded-full ${colors[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;