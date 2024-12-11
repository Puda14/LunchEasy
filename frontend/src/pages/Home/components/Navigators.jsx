import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const NavigatorSquare = ({ name, route }) => {
  const navigate = useNavigate();
  const formattedName = name.replace(/\s+/g, "");

  const handleClick = (e) => {
    e.preventDefault();
    navigate(route);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <a
        href={route}
        onClick={handleClick}
        className="no-underline text-center"
      >
        <img
          src={`/navigators/${formattedName}.png`}
          alt={name}
          className="w-full h-full"
        />
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
