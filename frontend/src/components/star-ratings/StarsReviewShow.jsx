import React from "react";
import { FaStar } from "react-icons/fa";

const StarsReviewShow = ({ reviews }) => {
  const renderStars = (reviews) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          size={30}
          color={i < reviews ? "#ffc107" : "#e4e5e9"}
          style={{ marginRight: "5px" }} // Add margin to space out the stars
        />
      );
    }
    return stars;
  };

  return <div className="flex">{renderStars(reviews)}</div>;
};

export default StarsReviewShow;
