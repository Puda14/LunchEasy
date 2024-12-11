import NavigatorSquare from "./components/Navigators.jsx";
const Home = () => {
  return (
    <div className="flex flex-col items-center w-full h-screen">
      <div className="grid w-2/3 grid-cols-3 gap-20 h-2/3">
        <NavigatorSquare name="おすすめ" route="/recommendation" />
        <NavigatorSquare name="レストラン" route="/restaurants" />
        <NavigatorSquare name="歴史" route="/history" />
        <NavigatorSquare name="お気に入り" route="/favorite" />
        <NavigatorSquare name="設定" route="/settings" />
        <NavigatorSquare name="健康的なお勧め" route="#" />
      </div>
    </div>
  );
};

export default Home;
