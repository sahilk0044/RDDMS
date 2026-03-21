import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import UserCard from "../../components/adminLayout/UserCard";
import UserSearch from "../../components/adminLayout/UserSearch";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("localhost:8000/api/users");
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      <motion.h1
        className="text-2xl md:text-3xl font-bold mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Manage Users
      </motion.h1>

      <UserSearch search={search} setSearch={setSearch} />

      <div className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;