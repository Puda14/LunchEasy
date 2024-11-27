const LandingButton = ({ text, onClick }) => {
    return (
      <button
        className={`w-full p-2 m-2 text-2xl text-white bg-orange-700 rounded-xl hover:bg-orange-800`}
        onClick={onClick}
      >
        {text}
      </button>
    );
  };
export default LandingButton;