import React, { useState } from "react";
import { FaArrowUp, FaArrowDown, FaTrash } from "react-icons/fa";
import initialData from "../../../data/users.json";

const AdminUserManage = () => {
  const [users, setUsers] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7; // Number of users per page

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...users].sort((a, b) => {
      if (typeof a[key] === "string") {
        return direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      }
    });

    setUsers(sortedData);
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    console.log("Deleted user at index:", index);
  };

  const handleRowClick = (user) => {
    console.log("User clicked:", user);
    // Additional navigation or modal logic can be added here
  };

  // Pagination logic
  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + usersPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container p-2 mx-auto relative">
      <h1 className="my-2 text-3xl font-bold text-center">ユーザー管理</h1>
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full mt-0 border-collapse table-auto">
          <thead className="sticky top-0 bg-white shadow">
            <tr>
              <th className="p-2 border-b"></th>
              <th
                className="p-2 text-left border-b cursor-pointer"
                onClick={() => handleSort("username")}
              >
                <div className="flex items-center">
                  ユーザー名
                  {sortConfig.key === "username" &&
                    sortConfig.direction === "asc" && (
                      <FaArrowUp className="text-gray-500 " />
                    )}
                  {sortConfig.key === "username" &&
                    sortConfig.direction === "desc" && (
                      <FaArrowDown className="text-gray-500 " />
                    )}
                </div>
              </th>
              <th
                className="p-2 text-left border-b cursor-pointer"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center">
                  メール
                  {sortConfig.key === "email" &&
                    sortConfig.direction === "asc" && (
                      <FaArrowUp className="text-gray-500 " />
                    )}
                  {sortConfig.key === "email" &&
                    sortConfig.direction === "desc" && (
                      <FaArrowDown className="text-gray-500 " />
                    )}
                </div>
              </th>
              <th
                className="p-2 text-left border-b cursor-pointer"
                onClick={() => handleSort("phone")}
              >
                <div className="flex items-center">
                  電話番号
                  {sortConfig.key === "phone" &&
                    sortConfig.direction === "asc" && (
                      <FaArrowUp className="text-gray-500 " />
                    )}
                  {sortConfig.key === "phone" &&
                    sortConfig.direction === "desc" && (
                      <FaArrowDown className="text-gray-500 " />
                    )}
                </div>
              </th>
              <th
                className="p-2 text-left border-b cursor-pointer"
                onClick={() => handleSort("address")}
              >
                <div className="flex items-center">
                  アドレス
                  {sortConfig.key === "address" &&
                    sortConfig.direction === "asc" && (
                      <FaArrowUp className="text-gray-500 " />
                    )}
                  {sortConfig.key === "address" &&
                    sortConfig.direction === "desc" && (
                      <FaArrowDown className="text-gray-500 " />
                    )}
                </div>
              </th>
              <th
                className="p-2 text-left border-b cursor-pointer"
                onClick={() => handleSort("dob")}
              >
                <div className="flex items-center">
                  生年月日
                  {sortConfig.key === "dob" &&
                    sortConfig.direction === "asc" && (
                      <FaArrowUp className="text-gray-500 " />
                    )}
                  {sortConfig.key === "dob" &&
                    sortConfig.direction === "desc" && (
                      <FaArrowDown className="text-gray-500 " />
                    )}
                </div>
              </th>
              <th className="p-2 border-b text-center"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr
                key={index}
                className="border-b cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(user)}
              >
                <td className="p-2">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="object-cover w-16 h-16 rounded-md"
                  />
                </td>
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.phone}</td>
                <td className="p-2">{user.address}</td>
                <td className="p-2">{user.dob}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(startIndex + index);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-2 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-md ${
            currentPage === 1 ? "bg-gray-200 text-gray-500" : "bg-white"
          }`}
        >
          前へ
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 border rounded-md ${
              currentPage === i + 1 ? "bg-orange-400 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded-md ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500"
              : "bg-white"
          }`}
        >
          次へ
        </button>
      </div>
    </div>
  );
};

export default AdminUserManage;
