import { useState } from "react";
import React from "react";

import { FaStar } from "react-icons/fa";

const StarsRating = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;

                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                            style={{ display: "none" }}
                        />
                        <FaStar
                            size={30}
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                            style={{ cursor: "pointer" }}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarsRating;
