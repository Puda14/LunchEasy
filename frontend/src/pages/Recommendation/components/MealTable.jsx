import PropTypes from 'prop-types';
import MealRow from './MealRow';

const MealTable = ({ meals }) => {
  const tableStyle = {
    fontSize: '24px', // Increase font size
  };

  const cellStyle = {
    padding: '15px', // Increase padding
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={cellStyle}>料理</th>
          <th style={cellStyle}>価格</th>
          <th style={cellStyle}>レビュー</th>
          <th style={cellStyle}>調理時間</th>
          <th style={cellStyle}>住所</th>
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
