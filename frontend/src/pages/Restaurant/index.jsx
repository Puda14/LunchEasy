import BackButton from "../../components/BackButton";
const Restaurant = () => {
  return (
    <div className="flex flex-col w-full h-full relative">
      <div className="w-10 h-auto absolute top-5 left-5">
        <BackButton dest="/" />
      </div>

      <div className="pt-20 pl-20 pr-20 w-full h-full flex flex-col text-2xl">
        <div className="flex flex-row h-1/2 w-full">
          <div className="w-2/5 h-full bg-red-200 items-center flex flex-col pt-4 pl-4 pr-16 text-lg">
            レストラン名
            <div className="h-4/5 w-5/6 m-2 bg-white">Image</div>
            <div className="text-2xl">..................</div>
          </div>
          <div className="w-3/5 h-full bg-green-200 flex flex-col p-3">
            <div className="font-bold">冗談</div>
            <div className="grid grid-cols-2">
              <div className="">
                ...................
                <br />
                ...................
                <br />
                ...................
                <br />
              </div>
              <div>
                ...................
                <br />
                ...................
                <br />
                ...................
                <br />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-200 h-1/2 w-full grid grid-cols-3 grid-rows-2 p-2 gap-2">
          <div className="bg-red-400 "></div>
          <div className="bg-green-400 "></div>
          <div className="bg-blue-400 "></div>
          <div className="bg-cyan-400 "></div>
          <div className="bg-orange-400 "></div>
          <div className="bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
