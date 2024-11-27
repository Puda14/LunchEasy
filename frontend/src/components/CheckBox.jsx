
const CheckBox = ({id, text, onChange}) => {
  
  return (
    <div className="flex flex-row items-center self-end gap-4 m-2 select-none">
    <label htmlFor={id}>{text}</label>
    <input
      type="checkbox"
      id={id}
      className="w-5 h-5 appearance-none border-1 border-orange-900 rounded-md  checked:bg-orange-600 hover:cursor-pointer hover:bg-orange-100 hover:checked:bg-orange-400"
      onChange={onChange}
    ></input>
  </div>
  )
}

export default CheckBox
