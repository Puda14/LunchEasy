import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingButton from "../../components/LandingButton";
import InputField from "../../components/InputField";
import CheckBox from "../../components/CheckBox";
import BackButton from "../../components/BackButton";
import LandingPageWrapper from "../../components/wrappers/LandingPageWrapper";
const Signup = () => {
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignup = () => {
    // TODO: Implement signup logic
    alert(`Birthday: ${birthday} Email: ${email} Password: ${password}`);
    // Navigate to home page
    navigate("/");
  };
  return (
    <LandingPageWrapper
      element={
        <div className="flex flex-col items-center justify-center w-1/2 h-full">
          <div className="self-start w-1/12 h-auto mb-14">
            <BackButton />
          </div>
          <InputField
            label="生年月日"
            type="date"
            onChange={(e) => setBirthday(e.target.value)}
          />
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
          {/* <CheckBox id="remember-checkbox" text="パスワードを保存する" /> */}
          <LandingButton text="サインアップ" onClick={handleSignup} />
        </div>
      }
    />
  );
};

export default Signup;
