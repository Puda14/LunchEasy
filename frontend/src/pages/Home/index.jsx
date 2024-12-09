import NavigatorSquare from "./components/Navigators.jsx";
const Home = () => {
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <div className="grid grid-cols-3 gap-20 w-2/3 h-2/3">
        <NavigatorSquare name="おすすめ" route="/recommendation" />
        <NavigatorSquare name="レストラン" route="/restaurants" />
        <NavigatorSquare name="歴史" route="#" />
<<<<<<< HEAD
        <NavigatorSquare name="お気に入り" route="#" />
=======
        <NavigatorSquare name="お気に入り" route="/favorite" />
>>>>>>> f3dc8d317e168c5070f28666d490e0d397f3d399
        <NavigatorSquare name="設定" route="/settings" />
        <NavigatorSquare name="健康的なお勧め" route="#" />
      </div>
    </div>
  );
};

export default Home;
