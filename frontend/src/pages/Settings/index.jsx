import HomeButton from "../../components/HomeButton";
const Settings = () => {
  return (
    <div className="w-full h-full bg-slate-200 text-2xl pr-5">
      <div className="">
        <HomeButton />
      </div>
      <div className="grid grid-cols-3 px-16 gap-10">
        <div className="text-center">質問する</div>
        <div>...........</div>
        <div>...........</div>
        <div className="text-center"> 生年月日 </div>
        <div>01/01/1999</div>
        <input type="date"></input>
        <div className="text-center">パスワードを変更する</div>
        <div className="col-span-2 bg-red-300"></div>
        <div className="text-center">電話番号を更新する</div>

        <div>...........</div>
        <div>...........</div>
        <div className="text-center">歌/詩</div>

        <div className="col-span-2 bg-red-300"></div>
        <div className="text-center">居住地の住所</div>

        <div>...........</div>
        <div>...........</div>
      </div>
      <div className="w-full flex flex-row-reverse mt-5">
        <button className="bg-orange-500 rounded-lg p-2 text-white">
          アップデート
        </button>
      </div>
    </div>
  );
};

export default Settings;
