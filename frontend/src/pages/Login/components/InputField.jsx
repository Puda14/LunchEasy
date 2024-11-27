const InputField = ({ label, type, onChange }) => {
    return (
      <div className="w-full my-2 h-fit">
        <div className="self-start text-xl font-semibold">{label}</div>
        <input
          type={type}
          className="w-full p-4 my-2 text-2xl border border-gray-500 rounded-xl"
          onChange={onChange}
        ></input>
      </div>
    );
  };
  export default InputField;