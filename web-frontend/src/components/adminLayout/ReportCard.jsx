import React from "react";
import { motion } from "framer-motion";
import StatusBadge from "./StatusBadge";

const ReportCard = ({ report, onUpdateStatus, onAssign }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition"
      whileHover={{ scale: 1.03 }}
    >
      <img
        src={report.image}
        alt="damage"
        className="h-40 w-full object-cover rounded-lg"
      />

      <div className="mt-3">
        <h2 className="font-semibold text-lg">{report.location}</h2>
        <p className="text-sm text-gray-500">{report.description}</p>

        <div className="mt-2">
          <StatusBadge status={report.status} />
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <button
            onClick={() => onUpdateStatus(report._id, "Verified")}
            className="btn"
          >
            Verify
          </button>

          <button
            onClick={() => onUpdateStatus(report._id, "In Progress")}
            className="btn-yellow"
          >
            In Progress
          </button>

          <button
            onClick={() => onUpdateStatus(report._id, "Completed")}
            className="btn-green"
          >
            Complete
          </button>

          {/* <button onClick={onAssign} className="btn-blue">
            Assign
          </button> */}
        </div>
      </div>
    </motion.div>
  );
};

export default ReportCard;