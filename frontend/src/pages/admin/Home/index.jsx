import NavigatorSquare from "./components/Navigators.jsx";

const Home = () => {
  const routes = [
    { name: "おすすめ", route: "/recommendation" },
    { name: "レストラン", route: "/restaurants" },
    { name: "歴史", route: "/history" },
    { name: "お気に入り", route: "/favorite" },
    { name: "設定", route: "/settings" },
    { name: "健康的なお勧め", route: "/healthy-recommendation" },
    { name: "レストランリストの管理", route: "/admin/restaurant-management" },
    { name: "料理リストの管理", route: "/admin/food-management" },
    { name: "ユーザー管理", route: "/admin/user-management" },
  ];

  return (
    <div className="flex flex-col items-center w-full h-screen">
      <div className="grid w-2/3 grid-cols-3 gap-20 h-2/3">
        {routes.map((item, index) => (
          <NavigatorSquare key={index} name={item.name} route={item.route} />
        ))}
      </div>
    </div>
  );
};

export default Home;
