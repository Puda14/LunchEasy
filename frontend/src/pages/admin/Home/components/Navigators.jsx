import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const NavigatorSquare = ({ name, route }) => {
  const navigate = useNavigate();

  const resolvedRoute = route.startsWith("/") ? route : `/admin${route}`;

  const handleClick = (e) => {
    e.preventDefault();
    navigate(resolvedRoute);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <a
        href={resolvedRoute}
        onClick={handleClick}
        className="no-underline text-center"
      >
        <div className="flex items-center justify-center w-[150px] h-[150px] bg-gray-100 rounded">
          <img
            src={`/navigators/${name.replace(/\s+/g, "")}.png`}
            alt={name}
            className="w-full h-full"
          />
        </div>
        <p className="normal-case mt-3 text-black">{name}</p>
      </a>
    </div>
  );
};

NavigatorSquare.propTypes = {
  name: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default NavigatorSquare;
