import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBackClick}
      className="w-full h-full bg-transparent border-0 cursor-pointer"
    >
      <FaArrowLeft className="w-full h-full" />
    </button>
  );
};

export default BackButton;
