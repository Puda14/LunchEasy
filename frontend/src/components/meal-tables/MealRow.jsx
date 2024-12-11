import PropTypes from 'prop-types';

const MealRow = ({ meal, price, reviews, cookingTime, address }) => {
  const renderStars = (reviews) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < reviews) {
        stars.push(<span key={i}>&#9733;</span>); // Filled star
      } else {
        stars.push(<span key={i}>&#9734;</span>); // Empty star
      }
    }
    return stars;
  };

  return (
    <tr>
      <td className="text-left p-4">
        <img className="w-24 rounded-lg" src={`/meal/${meal}.png`} alt={`${meal}`} />
      </td>
      <td className="p-4">{price}$</td>
      <td className="p-4">{renderStars(reviews)}</td>
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
