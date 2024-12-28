import PropTypes from "prop-types";
import StarsReviewShow from "../star-ratings/StarsReviewShow";
import { useNavigate } from "react-router-dom";

const MealRow = ({ name, price, rating, prep_time, address }) => {
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
            src={`/meal/${name}.png`}
            alt={`${name}`}
          />
        </div>
      </td>
      <td className="p-4">{name}</td>
      <td className="p-4">{price} ¥</td>
      <td className="p-4">{<StarsReviewShow reviews={rating} />}</td>
      <td className="p-4">{prep_time}</td>
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
