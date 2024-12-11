import PropTypes from "prop-types";
import StarsReview from "../StarsReview";

const MealRow = ({ meal, price, reviews, cookingTime, address }) => {
  return (
    <tr>
      <td className="text-left p-4">
        <a href={`/food`} className="text-blue-500 hover:underline">
          <img
            className="w-24 rounded-lg"
            src={`/meal/${meal}.png`}
            alt={`${meal}`}
          />
        </a>
      </td>
      <td className="p-4">{price}$</td>
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
