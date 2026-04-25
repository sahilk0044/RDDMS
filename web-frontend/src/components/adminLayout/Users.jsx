import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import UserCard from "../../components/adminLayout/UserCard";
import UserSearch from "../../components/adminLayout/UserSearch";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:8000/api/users");

      // 🔥 FIX: handle both array and object response
      const usersData = Array.isArray(res.data)
        ? res.data
        : res.data.users;

      setUsers(usersData || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Safe filtering
  const filteredUsers = Array.isArray(users)
  ? users
      .filter((user) => user?.role === "citizen") // ✅ role filter
      .filter((user) =>
        user?.name?.toLowerCase().includes(search.toLowerCase())
      )
  : [];

  return (
    <div className="p-4 md:p-6">

      {/* 🔥 HEADER */}
      <motion.h1
        className="mb-4 text-2xl font-bold md:text-3xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        👥 Manage Users
      </motion.h1>

      {/* 🔍 SEARCH */}
      <UserSearch search={search} setSearch={setSearch} />

      {/* ⏳ LOADING */}
      {loading && (
        <div className="mt-5 text-center">
          <p>Loading users...</p>
        </div>
      )}

      {/* ❌ ERROR */}
      {error && (
        <div className="mt-3 text-center text-danger">
          {error}
        </div>
      )}

      {/* 📭 EMPTY */}
      {!loading && filteredUsers.length === 0 && (
        <div className="mt-5 text-center text-muted">
          <h5>No users found</h5>
        </div>
      )}

      {/* 👥 USERS GRID */}
      <div className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
        {!loading &&
          filteredUsers.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
      </div>

    </div>
  );
};

export default Users;