import MealList from "../../components/meal-list/MealList";

const History = () => {
  return (
    <div className="container p-2 mx-auto relative">
      <h1 className="my-2 text-3xl font-bold text-center">
        項目選択履歴ページ
      </h1>
      {/* TODO: API*/}
      <MealList apiEndpoint="/api/..." />
    </div>
  );
};

export default History;
