import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingButton from "../../components/LandingButton";
import InputField from "../../components/InputField";
import CheckBox from "../../components/CheckBox";
import BackButton from "../../components/BackButton";
import { toast } from 'react-toastify';
import LandingPageWrapper from "../../components/wrappers/LandingPageWrapper";
import { signup } from "../../services/authService";

// Date formatting helper
const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};


const Signup = () => {
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!birthday || !email || !password) {
      setError("全ての項目を入力してください");
      toast.error("全ての項目を入力してください");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const formattedDob = formatDate(birthday);
      await signup(email, password, formattedDob);
      toast.success("登録が完了しました");
      navigate("/login", { state: { message: "登録が完了しました" } });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-1/2 h-full">
      <div className="self-start w-1/12 h-auto mb-14">
        <BackButton dest="/login" />
      </div>
      <InputField
        label="生年月日"
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required
        disabled={loading}
      />
      <InputField
        label="ログインメールアドレス"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
      />
      <InputField
        label="パスワード"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={loading}
        minLength={6}
      />
      {/* <CheckBox id="remember-checkbox" text="パスワードを保存する" /> */}
      <LandingButton text="サインアップ" onClick={handleSignup} />
    </div>
  );
};

export default Signup;
