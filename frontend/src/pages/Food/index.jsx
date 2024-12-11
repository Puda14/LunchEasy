import Information from "./components/Information";
import StarsReviewShow from "../../components/star-ratings/StarsReviewShow";
import BackButton from "../../components/BackButton";
import StarsRating from "../../components/star-ratings/StarsRating";

const Food = () => {
  const ingredients = ["パン", "牛肉", "トマト", "サラダ", "マヨネーズ"];
  const informationList = [
    { label: "材料", text: ingredients },
    { label: "評価する", text: <StarsReviewShow reviews={3} /> },
    { label: "カロリー", text: "300 kcal" },
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

        <div className="grid grid-cols-2 gap-10">
          <div className="mt-4">
            <button className="p-2 bg-red-500 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                />
              </svg>
            </button>
          </div>
          <div>
            <StarsRating />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;
