import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingButton from "../../components/LandingButton";
import InputField from "../../components/InputField";
import CheckBox from "../../components/CheckBox";
import LandingPageWrapper from "../../components/wrappers/LandingPageWrapper";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const handleLogin = () => {
    //TODO: Implement login logic
    alert(`Email: ${email} Password: ${password} Remember: ${remember}`);
    // Navigate to home page
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center w-1/2 h-full">
      <div className="mb-20 text-5xl font-bold">ランチイージー</div>
      <InputField
        label="ログインメールアドレス"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        label="パスワード"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <CheckBox
        id="remember-checkbox"
        text="パスワードを保存する"
        onChange={() => setRemember(!remember)}
      />

      <LandingButton text="ログイン" onClick={handleLogin} />
      <LandingButton
        text="サインアップ"
        onClick={() => {
          window.location.href = "/signup";
        }}
      />
    </div>
  );
};

export default Login;
