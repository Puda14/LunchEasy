import Information from "./components/Information";
import StarsReview from "../../components/StarsReview";
import BackButton from "../../components/BackButton";

const Food = () => {
  const ingredients = ["パン", "牛肉", "トマト", "サラダ", "マヨネーズ"];
  const informationList = [
    { label: "材料", text: ingredients },
    { label: "評価する", text: <StarsReview reviews={3} /> },
    { label: "カロリー", text: "300k" },
    { label: "調理時間", text: "1時間" },
    { label: "タンパク質", text: "idk" },
    { label: "価格", text: "350¥" },
    { label: "ダイエット", text: "N/A" },
    { label: "レストラン名", text: "レストラン1" },
  ];

  return (
    <div className="relative flex flex-col w-full h-full">
      <div className="absolute w-10 h-auto top-5 left-5">
        <BackButton dest={-1} />
      </div>
      <div className="w-4/5 mx-auto">
        <div className="mb-10">
          <Information
            label={informationList[0].label}
            text={informationList[0].text}
          />
        </div>
        <div className="grid grid-cols-2 gap-10">
          {informationList.slice(1).map((info, index) => (
            <Information key={index} label={info.label} text={info.text} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Food;
