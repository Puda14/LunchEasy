import MealTable from "../../components/meal-tables/MealTable";
import dishes from "../../data/dishes.json";

const MealList = () => {
  return (
    <div className="flex flex-row h-screen">
      <div className="flex justify-center items-center w-full">
        <MealTable meals={dishes} />
      </div>
    </div>
  )
}

export default MealList
