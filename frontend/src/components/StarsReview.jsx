const StarsReview = ({ reviews }) => {
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

  return <div>{renderStars(reviews)}</div>;
};

export default StarsReview;
