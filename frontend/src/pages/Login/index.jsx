import { useState } from "react";
import LandingButton from "./components/LandingButton";
import InputField from "./components/InputField";
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
          <div className="flex flex-row items-center self-end gap-4 m-2 select-none">
            <label htmlFor="remember-checkbox">パスワードを保存する</label>
            <input
              type="checkbox"
              id="remember-checkbox"
              checked={remember}
              className="w-5 h-5 appearance-none border-1 border-orange-900 rounded-md  checked:bg-orange-600 hover:cursor-pointer hover:bg-orange-100 hover:checked:bg-orange-400"
              onChange={handleRememberChange}
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
