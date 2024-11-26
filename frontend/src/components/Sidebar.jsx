import React from "react";
import "./Sidebar.css";
import { useLocation, Outlet } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // Mapping đường dẫn -> nội dung Sidebar
  const pageContent = {
    "/": {
      title: "ホーム",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-house"
          viewBox="0 0 16 16"
        >
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
        </svg>
      ),
    },
    "/login": {
      title: "ログイン",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 1 0 0 14A7 7 0 0 0 8 1z"
          />
        </svg>
      ),
    },
    // Thêm các đường dẫn khác tại đây
  };

  const currentPage = pageContent[location.pathname] || {
    title: "未知",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-question-circle"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zM8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0z" />
        <path d="M5.255 5.786a.237.237 0 0 0-.241.247c.015.355.115.716.303 1.005.244.365.595.606 1.03.606.262 0 .538-.11.735-.319.197-.208.331-.475.393-.751.062-.275.054-.558-.025-.816-.08-.26-.243-.503-.464-.657-.221-.154-.495-.236-.776-.236a1.538 1.538 0 0 0-.955.351c-.03.03-.048.066-.071.103zM7.998 11c-.545 0-.998.453-.998 1s.453 1 .998 1 .998-.453.998-1-.453-1-.998-1z" />
      </svg>
    ),
  };
  return (
    <div className="top-0 bottom-0 left-0 w-1/6">
      <div className="items-center text-center">
        <img
          src="https://th.bing.com/th/id/OIP.ueHppfRf52CDn841Rpj8IwHaHa?rs=1&pid=ImgDetMain"
          alt="User Avatar"
          className="w-20 h-20 rounded-circle"
        />
        <div className="mt-2 d-flex justify-content-center align-items-center">
          <img
            src="https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
            alt="Status Icon"
            className="rounded-circle"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <p className="mb-0 ms-2">User 1</p>
        </div>
      </div>

      {/* Home Icon */}
      <div className="mt-4 text-center">
        <div className="p-3 border">{currentPage.icon}</div>
        <p className="mt-2">{currentPage.title}</p>
      </div>

      {/* Logout */}
      <div className="mt-4 text-center logout">
        <button className="btn btn-danger">ログアウト</button>
      </div>
      <Outlet />
    </div>
  );
};

export default Sidebar;
