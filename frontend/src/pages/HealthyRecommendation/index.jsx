import MealList from "../../components/meal-list/MealList";

const HealthyRecommendation = () => {
  return (
    <div className="container p-2 mx-auto relative">
      <h1 className="my-2 text-3xl font-bold text-center">健康食品の提案</h1>
      {/* TODO: API*/}
      <MealList apiEndpoint="/api/..." />
    </div>
  );
};

export default HealthyRecommendation;
