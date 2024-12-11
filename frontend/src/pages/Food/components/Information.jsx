import PropTypes from 'prop-types';

const Information = ({label, text}) => {
    return (
        <div className="flex flex-row text-xl">
            <p className="font-semibold mr-8">{label}</p>
            {Array.isArray(text) ? (
                <div>
                    {text.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
            ) : (
                <p>{text}</p>
            )}
        </div>
    )
}

export default Information;
