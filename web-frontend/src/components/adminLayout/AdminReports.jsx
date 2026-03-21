import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import ReportCard from "../../components/adminLayout/ReportCard";
import FilterBar from "../../components/adminLayout/FilterBar";
import AssignModal from "../../components/adminLayout/AssignModal";

const Report = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/reports");
      setReports(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:8000/api/reports/${id}`, { status });
      fetchReports();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredReports =
    filter === "All"
      ? reports
      : reports.filter((r) => r.status === filter);

  return (
    <div className="p-4 md:p-6">
      <motion.h1
        className="text-2xl md:text-3xl font-bold mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Manage Reports
      </motion.h1>

      <FilterBar filter={filter} setFilter={setFilter} />

      <div className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredReports.map((report) => (
          <ReportCard
            key={report._id}
            report={report}
            onUpdateStatus={updateStatus}
            onAssign={() => setSelectedReport(report)}
          />
        ))}
      </div>

      {selectedReport && (
        <AssignModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          refresh={fetchReports}
        />
      )}
    </div>
  );
};

export default Report;