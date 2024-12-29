import React from "react";
import "./Sidebar.css";
import { useLocation, Outlet, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const Sidebar = () => {
  const [email, setEmail] = useState("");
  let token = localStorage.getItem("token") || sessionStorage.getItem("token");
  useEffect(() => {
    let token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      setEmail(token ? jwtDecode(token)?.email : "");
    }
  }, [token]);
  const location = useLocation();
  const navigate = useNavigate();
  const defaultIcon = (
    <svg
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title></title>{" "}
        <g
          fill="none"
          fill-rule="evenodd"
          id="页面-1"
          stroke="none"
          stroke-width="1"
        >
          {" "}
          <g id="导航图标" transform="translate(-26.000000, -15.000000)">
            {" "}
            <g id="编组" transform="translate(26.000000, 15.000000)">
              {" "}
              <rect
                fill="#FFFFFF"
                fill-opacity="0.01"
                fill-rule="nonzero"
                height="24"
                id="矩形"
                width="24"
                x="0"
                y="0"
              ></rect>{" "}
              <polygon
                id="路径"
                points="4.5 9 4.5 21 19.5 21 19.5 9 12 3"
              ></polygon>{" "}
              <polygon
                id="路径"
                points="4.5 21 4.5 9 2 11 12 3 22 11 19.5 9 19.5 21"
                stroke="#212121"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              ></polygon>{" "}
              <polygon
                id="路径"
                points="9.5 14.5 9.5 21 14.5 21 14.5 14.5"
                stroke="#212121"
                stroke-linejoin="round"
                stroke-width="1.5"
              ></polygon>{" "}
              <line
                id="路径"
                stroke="#212121"
                stroke-linecap="round"
                stroke-width="1.5"
                x1="4.5"
                x2="19.5"
                y1="21"
                y2="21"
              ></line>{" "}
            </g>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
  const homeIcon = (
    <svg
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title></title>{" "}
        <g
          fill="none"
          fill-rule="evenodd"
          id="页面-1"
          stroke="none"
          stroke-width="1"
        >
          {" "}
          <g id="导航图标" transform="translate(-26.000000, -15.000000)">
            {" "}
            <g id="编组" transform="translate(26.000000, 15.000000)">
              {" "}
              <rect
                fill="#FFFFFF"
                fill-opacity="0.01"
                fill-rule="nonzero"
                height="24"
                id="矩形"
                width="24"
                x="0"
                y="0"
              ></rect>{" "}
              <polygon
                id="路径"
                points="4.5 9 4.5 21 19.5 21 19.5 9 12 3"
              ></polygon>{" "}
              <polygon
                id="路径"
                points="4.5 21 4.5 9 2 11 12 3 22 11 19.5 9 19.5 21"
                stroke="#212121"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              ></polygon>{" "}
              <polygon
                id="路径"
                points="9.5 14.5 9.5 21 14.5 21 14.5 14.5"
                stroke="#212121"
                stroke-linejoin="round"
                stroke-width="1.5"
              ></polygon>{" "}
              <line
                id="路径"
                stroke="#212121"
                stroke-linecap="round"
                stroke-width="1.5"
                x1="4.5"
                x2="19.5"
                y1="21"
                y2="21"
              ></line>{" "}
            </g>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
  const recommendationIcon = (
    <img
      src={`/navigators/おすすめ.png`}
      alt="おすすめ"
      className="w-full h-full"
    />
  );
  const foodIcon = (
    <svg
      viewBox="0 0 1024 1024"
      class="icon"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M774.8 327.8c-50.6-4.8-97.3 4.3-131 22.7 15.9 20.3 26.1 52.1 26.1 87.9 0 29.2-6.8 55.7-17.9 75.5 28.3 16.9 64.5 28.8 104.6 32.6 96.7 9.2 179.2-32.4 184.2-92.8s-69.3-116.7-166-125.9z"
          fill="#FFB89A"
        ></path>
        <path
          d="M67.2 494l1 31c2.2 67.7 26.2 133.6 69.6 190.4 41.6 54.5 99.6 99.2 167.9 129.3 15.2 6.7 32.9-0.2 39.5-15.4 6.7-15.2-0.2-32.9-15.4-39.5-59-26-108.9-64.3-144.4-110.8-29-38-47.5-80.7-54.4-125h762.6c-7 44.8-25.8 87.9-55.4 126.3-36.1 46.8-86.8 85.2-146.8 110.9-15.2 6.5-22.2 24.2-15.7 39.4 4.9 11.4 15.9 18.2 27.6 18.2 4 0 8-0.8 11.8-2.4 144.5-62.2 237-185.3 241.3-321.4l1-31H67.2z"
          fill="#45484C"
        ></path>
        <path
          d="M591.9 800.1h-159c-35.2 0-64.1 28.8-64.1 64.1s28.8 64.1 64.1 64.1h159c35.2 0 64.1-28.8 64.1-64.1s-28.9-64.1-64.1-64.1z m0 68.1h-159c-2.1 0-4.1-2-4.1-4.1s2-4.1 4.1-4.1h159c2.1 0 4.1 2 4.1 4.1s-2 4.1-4.1 4.1z"
          fill="#45484C"
        ></path>
        <path
          d="M498.1 373.5c-9.6-13.5-28.4-16.6-41.9-6.9-13.5 9.6-16.6 28.4-6.9 41.9 10.8 15.1 16.6 33 16.6 51.7 0 16.6 13.4 30 30 30s30-13.4 30-30c0-31.4-9.6-61.4-27.8-86.7zM432.4 321.8c-17.7-7.1-36.3-10.7-55.5-10.7-82.2 0-149 66.8-149 149 0 16.6 13.4 30 30 30s30-13.4 30-30c0-49.1 39.9-89 89-89 11.5 0 22.6 2.1 33.1 6.4 15.4 6.2 32.8-1.3 39-16.7 6.2-15.4-1.2-32.9-16.6-39z"
          fill="#33CC99"
        ></path>
        <path
          d="M549.4 274.7c-46.7-45.6-107.7-70.8-171.8-70.8-64.1 0-125.1 25.1-171.8 70.8-46.1 45.1-74 106-78.6 171.4-1.2 16.5 11.3 30.9 27.8 32 16.5 1.1 30.9-11.3 32-27.8 3.5-50.8 25.1-97.9 60.7-132.7 35.4-34.6 81.5-53.7 129.9-53.7 48.3 0 94.5 19.1 129.9 53.7 35.6 34.8 57.1 81.9 60.7 132.7 1.1 15.8 14.3 27.9 29.9 27.9 0.7 0 1.4 0 2.1-0.1 16.5-1.2 29-15.5 27.8-32-4.6-65.4-32.5-126.3-78.6-171.4zM895.1 385.9c-11.5-19.4-27.7-36.6-48.1-51.2l53.9-58.3c11.2-12.2 10.5-31.2-1.7-42.4s-31.2-10.5-42.4 1.7l-65 70.4c-5-1.8-10.1-3.5-15.3-5l82.4-159.2c7.6-14.7 1.9-32.8-12.9-40.4-14.7-7.6-32.8-1.9-40.4 12.9l-91.2 176.3c-5.5-0.3-11.1-0.5-16.7-0.5-21.9 0-43.5 2.4-64.3 7.2-16.1 3.7-26.2 19.8-22.5 36 3.7 16.1 19.8 26.2 36 22.5 16.3-3.8 33.4-5.7 50.7-5.7 43.6 0 84.2 11.8 114.3 33.3 27.1 19.3 42 44 42 69.5 0 16.6 13.4 30 30 30s30-13.4 30-30c0-23.5-6.3-46.1-18.8-67.1z"
          fill="#45484C"
        ></path>
      </g>
    </svg>
  );
  const restaurantsIcon = (
    <img
      src={`/navigators/レストラン.png`}
      alt="レストラン"
      className="w-full h-full"
    />
  );
  const historyIcon = (
    <img src={`/navigators/歴史.png`} alt="歴史" className="w-full h-full" />
  );
  const favoriteIcon = (
    <img
      src={`/navigators/お気に入り.png`}
      alt="お気に入り"
      className="w-full h-full"
    />
  );
  const settingsIcon = (
    <img src={`/navigators/設定.png`} alt="設定" className="w-full h-full" />
  );
  const healthyIcon = (
    <img
      src={`/navigators/健康的なお勧め.png`}
      alt="健康的なお勧め"
      className="w-full h-full"
    />
  );
  const adminRestaurantIcon = (
    <img
      src={`/navigators/レストランリストの管理.png`}
      alt="レストランリストの管理"
      className="w-full h-full"
    />
  );
  const adminFoodIcon = (
    <img
      src={`/navigators/料理リストの管理.png`}
      alt="料理リストの管理"
      className="w-full h-full"
    />
  );
  const adminUserIcon = (
    <img
      src={`/navigators/ユーザー管理.png`}
      alt="ユーザー管理"
      className="w-full h-full"
    />
  );
  const loginIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
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
  );
  // Mapping đường dẫn -> nội dung Sidebar
  const pageContent = {
    "/": {
      title: "ホーム",
      icon: homeIcon,
    },
    "/login": {
      title: "ログイン",
      icon: loginIcon,
    },
    "/food": {
      title: "食べ物",
      icon: defaultIcon,
    },
    "/restaurants": {
      title: "レストラン",
      icon: restaurantsIcon,
    },
    "/settings": {
      title: "設定",
      icon: settingsIcon,
    },
    "/recommendation": {
      title: "おすすめ",
      icon: recommendationIcon,
    },
    "/history": {
      title: "履歴",
      icon: historyIcon,
    },
    "/favorite": {
      title: "お気に入り",
      icon: favoriteIcon,
    },
    "/healthy-recommendation": {
      title: "健康的なお勧め",
      icon: healthyIcon,
    },
    "/admin/restaurants": {
      title: "レストラン",
      icon: restaurantsIcon,
    },
    "/admin/settings": {
      title: "設定",
      icon: settingsIcon,
    },
    "/admin/recommendation": {
      title: "おすすめ",
      icon: recommendationIcon,
    },
    "/admin/history": {
      title: "履歴",
      icon: historyIcon,
    },
    "/admin/favorite": {
      title: "お気に入り",
      icon: favoriteIcon,
    },
    "/admin/healthy-recommendation": {
      title: "健康的なお勧め",
      icon: healthyIcon,
    },
    "/admin": {
      title: "アドミンホーム",
      icon: homeIcon,
    },
    "/admin/restaurant-management": {
      title: "レストランリストの管理",
      icon: adminRestaurantIcon,
    },
    "/admin/food-management": {
      title: "料理管理",
      icon: adminFoodIcon,
    },
    "/admin/user-management": {
      title: "ユーザー管理",
      icon: adminUserIcon,
    },
    "/admin/restaurant-management/create": {
      title: "レストランリストの管理",
      icon: adminRestaurantIcon,
    },
    "/admin/food-management/create": {
      title: "料理管理",
      icon: adminFoodIcon,
    },
    // Thêm các đường dẫn khác tại đây
  };

  let currentPage = pageContent[location.pathname];
  const currentPath = location.pathname;

  // Kiểm tra nếu đường dẫn là dạng động "/food/{id}"
  if (
    !currentPage &&
    (currentPath.startsWith("/food/") || currentPath.startsWith("/admin/food/"))
  ) {
    currentPage = {
      title: "料理詳細",
      icon: foodIcon,
    };
  }

  if (
    !currentPage &&
    (currentPath.startsWith("/restaurants/") ||
      currentPath.startsWith("/admin/restaurants/"))
  ) {
    currentPage = {
      title: "最寄りのレストラン",
      icon: restaurantsIcon,
    };
  }

  // const currentPage = pageContent[location.pathname] || {
  //   title: "未知",
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="35"
  //       height="35"
  //       fill="currentColor"
  //       className="bi bi-question-circle"
  //       viewBox="0 0 16 16"
  //     >
  //       <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zM8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0z" />
  //       <path d="M5.255 5.786a.237.237 0 0 0-.241.247c.015.355.115.716.303 1.005.244.365.595.606 1.03.606.262 0 .538-.11.735-.319.197-.208.331-.475.393-.751.062-.275.054-.558-.025-.816-.08-.26-.243-.503-.464-.657-.221-.154-.495-.236-.776-.236a1.538 1.538 0 0 0-.955.351c-.03.03-.048.066-.071.103zM7.998 11c-.545 0-.998.453-.998 1s.453 1 .998 1 .998-.453.998-1-.453-1-.998-1z" />
  //     </svg>
  //   ),
  // };
  return (
    <div className="top-0 h-full bottom-0 left-0 w-60 min-w-60 max-w-60 d-flex flex-column justify-content-between sidebar">
      <div className="items-center text-center">
        <div className="mt-2 d-flex justify-content-center align-items-center">
          <img
            src="https://png.pngtree.com/png-vector/20220708/ourmid/pngtree-fast-food-logo-png-image_5763171.png"
            alt="Logo"
            className="w-20 h-20"
          />
        </div>
        <div className="mt-4 d-flex justify-content-center align-items-center">
          <img
            src="data:image/png;base64,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"
            alt="User Avatar"
            className="rounded-circle"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <p className="mb-0 ms-2">{email}</p>
        </div>
      </div>

      {/* Home Icon */}
      <div className="gap-3 text-center d-flex flex-column align-items-center">
        <div className="p-3 border w-28 h-28 d-flex sidebar-icon justify-content-center align-items-center">
          {currentPage.icon}
        </div>
        <p className="mt-2">{currentPage.title}</p>
      </div>

      {/* Logout */}
      <div className="mt-4 text-center logout">
        <button
          className="btn btn-danger"
          onClick={() => {
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            navigate("/login");
          }}
        >
          ログアウト
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Sidebar;
