import React from "react";

const UserSearch = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search users..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full md:w-1/3 border p-2 rounded-lg"
    />
  );
};

export default UserSearch;