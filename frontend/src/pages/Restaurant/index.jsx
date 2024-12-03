import LayoutWrapper from "../../components/wrappers/LayoutWrapper";
import BackButton from "../../components/BackButton";
const Restaurant = () => {
  return (
    <LayoutWrapper
      element={
        <div className="flex flex-row">
          <div className="self-start w-10 h-auto mb-14">
            <BackButton />
          </div>
          <div></div>
        </div>
      }
    />
  );
};

export default Restaurant;
