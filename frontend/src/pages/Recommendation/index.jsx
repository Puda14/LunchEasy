import React from "react";
import MealList from "../../components/meal-list/MealList";

const Recommendation = () => {
  return (
    <div className="container p-2 mx-auto relative">
      <h1 className="my-2 text-3xl font-bold text-center">おすすめの料理</h1>
      {/* TODO: API*/}
      <MealList apiEndpoint="/api/..." />
    </div>
  );
};

export default Recommendation;
