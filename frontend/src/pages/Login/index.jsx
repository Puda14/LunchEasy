/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
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
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleRememberChange = (e) => {
    setRemember(e.target.checked);
  };
  const handleLogin = () => {
    //TODO: Implement login logic
    alert(`Email: ${email} Password: ${password} Remember: ${remember}`);
  };
  const handleSignup = () => {};
  return (
    <div className="grid w-screen h-screen grid-cols-2 grid-rows-1">
      <div className="relative w-full h-screen bg-red-500">
        <img
          src="/login_landing.jpg"
          className="w-auto h-screen overflow-hidden"
        ></img>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-screen bg-yellow-50 ">
        <div className="flex flex-col items-center justify-center w-1/2 h-full">
          <div className="mb-32 text-5xl font-bold">ランチイージー</div>
          <InputField
            label="ログインメールアドレス"
            type="text"
            onChange={handleEmailChange}
          />
          <InputField
            label="パスワード"
            type="password"
            onChange={handlePasswordChange}
          />
          <div className="flex flex-row items-center self-end gap-4 m-2">
            <label htmlFor="remember-checkbox">パスワードを保存する</label>
            <input
              type="checkbox"
              id="remember-checkbox"
              value=""
              className="w-5 h-5 border border-orange-900 rounded-md appearance-none checked:bg-orange-600 checked:border-transparent hover:cursor-pointer hover:bg-orange-300 hover:checked:bg-orange-400"
              onChange={handleRememberChange}
              // style={{
              //   backgroundImage: remember ? "url(/check-mark.svg)" : "none",
              //   backgroundSize: "contain",
              //   backgroundRepeat: "no-repeat",
              //   backgroundPosition: "center",
              //   backgroundBlendMode: "multiply",
              //   filter: remember ? "invert(1)" : "none",
              // }}
            ></input>
          </div>
          <LandingButton text="ログイン" onClick={handleLogin} />
          <LandingButton text="サインアップ" />
        </div>
      </div>
    </div>
  );
};

export default Login;
