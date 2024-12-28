import NavigatorSquare from "./components/Navigators.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const role = token ? jwtDecode(token)?.role : null;
    if (role === "Admin") {
      navigate("/admin");
    }
  }, [navigate]);
  return (
    <div className="flex flex-col items-center w-full h-screen">
      <div className="grid w-2/3 grid-cols-3 gap-20 h-2/3">
        <NavigatorSquare name="おすすめ" route="/recommendation" />
        <NavigatorSquare name="レストラン" route="/restaurants" />
        <NavigatorSquare name="歴史" route="/history" />
        <NavigatorSquare name="お気に入り" route="/favorite" />
        <NavigatorSquare name="設定" route="/settings" />
        <NavigatorSquare name="健康的なお勧め" route="healthy-recommendation" />
      </div>
    </div>
  );
};

export default Home;
