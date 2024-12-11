import PropTypes from "prop-types";
import StarsReview from "../StarsReview";
import { useNavigate } from "react-router-dom";

const MealRow = ({ meal, price, reviews, cookingTime, address }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/food`);
  };

  return (
    <tr>
      <td className="text-left p-4">
        <div
          onClick={handleClick}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          <img
            className="w-24 rounded-lg"
            src={`/meal/${meal}.png`}
            alt={`${meal}`}
          />
        </div>
      </td>
      <td className="p-4">{price} ¥</td>
      <td className="p-4">{<StarsReview reviews={reviews} />}</td>
      <td className="p-4">{cookingTime}</td>
      <td className="p-4">{address}</td>
    </tr>
  );
};

MealRow.propTypes = {
  meal: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
  cookingTime: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default MealRow;
