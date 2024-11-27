import { useState } from "react";
import LandingButton from "../../components/LandingButton";
import InputField from "../../components/InputField";
import CheckBox from "../../components/CheckBox";
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
    // Navigate to home page
    window.location.href = "/";
  };
  const handleSignup = () => {
    // <Navigate to="/signup" />
  };
  return (
    <div className="grid w-screen h-screen grid-cols-2">
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
          <CheckBox id="remember-checkbox" text="パスワードを保存する" onChange={handleRememberChange} />

          <LandingButton text="ログイン" onClick={handleLogin} />
          <LandingButton text="サインアップ" />
        </div>
      </div>
    </div>
  );
};

export default Login;
