import React, { useEffect, useState } from "react";
import axios from "axios";

const AssignModal = ({ report, onClose, refresh }) => {
  const [authorities, setAuthorities] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetchAuthorities();
  }, []);

  const fetchAuthorities = async () => {
    const { data } = await axios.get("http://localhost:8000/api/authorities");
    setAuthorities(data);
  };

  const assign = async () => {
    await axios.put(`http://localhost:8000/api/reports/${report._id}`, {
      assignedTo: selected,
      status: "In Progress",
    });
    refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-80">
        <h2 className="font-bold mb-3">Assign Authority</h2>

        <select
          className="w-full border p-2 rounded"
          onChange={(e) => setSelected(e.target.value)}
        >
          <option>Select Authority</option>
          {authorities.map((a) => (
            <option key={a._id} value={a._id}>
              {a.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose}>Cancel</button>
          <button onClick={assign} className="btn-blue">
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignModal;