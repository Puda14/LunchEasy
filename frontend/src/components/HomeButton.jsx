import { useNavigate } from "react-router-dom";
const HomeButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const currentPath = window.location.pathname;
    if (currentPath.includes("admin")) {
      navigate("/admin");
      return;
    }
    navigate("/");
  };

  return (
    <div className="m-4">
      <button onClick={handleClick}>
        <img src="/navigators/Home.png" alt="Home" />
      </button>
    </div>
  );
};

export default HomeButton;
