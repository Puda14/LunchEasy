import PropTypes from 'prop-types';
// import './Navigators.css'; // Assuming you will style it in a CSS file

const NavigatorSquare = ({ name, route }) => {
    const formattedName = name.replace(/\s+/g, '');
    return (
        <div className="flex flex-col items-center justify-center">
            <a href={`${route}`} className="no-underline text-center">
                <img src={`/navigators/${formattedName}.png`} alt={name} className="navigator-image" />
                <p className="normal-case mt-3 text-black">{name}</p>
            </a>
        </div>
    );
};

NavigatorSquare.propTypes = {
    name: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired
};

export default NavigatorSquare;
