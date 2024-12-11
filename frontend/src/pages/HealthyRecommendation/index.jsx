import MealTable from "../../components/meal-tables/MealTable";
import data from "./data/data";

const HealthyRecommendation = () => {
  return (
    <div className="flex flex-row h-screen">
      <div className="flex justify-center items-center w-full">
        <MealTable meals={data} />
      </div>
    </div>
  );
};

export default HealthyRecommendation;
