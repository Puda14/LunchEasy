import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = ({ dest = "none" }) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(dest === "none" ? -1 : dest);
  };

  return (
    <button
      onClick={handleBackClick}
      className="w-full h-full bg-transparent border-0 cursor-pointer"
    >
      <FaArrowLeft className="w-full h-full text-orange-700" />
    </button>
  );
};

export default BackButton;
