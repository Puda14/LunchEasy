import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import LandingButton from "../../components/LandingButton";
import InputField from "../../components/InputField";
import CheckBox from "../../components/CheckBox";
import LandingPageWrapper from "../../components/wrappers/LandingPageWrapper";
import { login } from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const { token } = await login(email, password);
      toast.success("Login successful");
      // Store token in localStorage if remember is checked
      if (remember) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
      console.log(token);
      // Navigate to home page
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
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
