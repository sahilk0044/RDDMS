import React from "react";

const filters = ["All", "Pending", "Verified", "In Progress", "Completed"];

const FilterBar = ({ filter, setFilter }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-4 py-1 rounded-full text-sm ${
            filter === f
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;