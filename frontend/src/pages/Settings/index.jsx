import { useState } from "react";

const Settings = () => {
  const [userName, setUserName] = useState("ユーザー名");
  const [birthDate, setBirthDate] = useState("2000-01-01");
  const [password, setPassword] = useState("******");
  const [phoneNumber, setPhoneNumber] = useState("090-1234-5678");
  const [address, setAddress] = useState("東京都");
  const [theme, setTheme] = useState("ライトモード");

  const handleUpdate = () => {
    // Logic Solving...
    //
    //
    alert(`
      ユーザー名: ${userName}
      生年月日: ${birthDate}
      パスワード: ${password}
      電話番号: ${phoneNumber}
      アドレス: ${address}
      モード: ${theme}
    `);
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="my-4 text-3xl font-bold text-center">設定</h1>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ユーザー名
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              生年月日
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              電話番号
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              居住地の住所
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              システムモード
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="ライトモード">ライトモード</option>
              <option value="ダークモード">ダークモード</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 text-white bg-blue-500 rounded-md"
        >
          アップデート
        </button>
      </div>
    </div>
  );
};

export default Settings;
