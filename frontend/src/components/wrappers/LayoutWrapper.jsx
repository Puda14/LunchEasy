import React from "react";
import Sidebar from "../Sidebar";
import HomeButton from "../../components/HomeButton";

const LayoutWrapper = ({ element }) => {
  const title = "ランチイージー";
  return (
    <div className="flex flex-row w-screen h-screen">
      <Sidebar />
      <div className="flex flex-col items-center w-full h-full px-8 py-2">
        <div className="w-full p-2 text-xl font-extrabold text-center bg-orange-200 rounded-sm">
          {title}
        </div>
        <div className="w-full flex justify-start">
          <HomeButton />
        </div>
        {element}
      </div>
    </div>
  );
};

export default LayoutWrapper;
