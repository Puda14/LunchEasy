import PropTypes from "prop-types";
import MealRow from "./MealRow";

const MealTable = ({ meals }) => {

  return (
    <table className="text-center text-3xl">
      <thead>
        <tr>
          <th>料理</th>
          <th>価格</th>
          <th>レビュー</th>
          <th>調理時間</th>
          <th>住所</th>
        </tr>
      </thead>
      <tbody>
        {meals.map((meal, index) => (
          <MealRow
            key={index}
            meal={meal.meal}
            price={meal.price}
            reviews={meal.reviews}
            cookingTime={meal.cookingTime}
            address={meal.address}
          />
        ))}
      </tbody>
    </table>
  );
};

MealTable.propTypes = {
  meals: PropTypes.arrayOf(
    PropTypes.shape({
      meal: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      reviews: PropTypes.number.isRequired,
      cookingTime: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MealTable;
