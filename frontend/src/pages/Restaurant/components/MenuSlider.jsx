import React, { useRef } from "react";
import DishItem from "./DishItem";

const MenuSlider = ({ menu }) => {
  const sliderRef = useRef(null);
  const itemWidth = 300; // Độ rộng 1 item (có thể điều chỉnh nếu cần)
  const visibleItems = 5; // Số lượng item hiển thị

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -(itemWidth * visibleItems), // Cuộn 4 item sang trái
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: itemWidth * visibleItems, // Cuộn 4 item sang phải
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">メニュー</h2>

      {/* Slider Buttons */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 text-black p-2 rounded-full shadow-md hover:bg-gray-400 transition z-10"
        onClick={scrollLeft}
      >
        &#8249;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 text-black p-2 rounded-full shadow-md hover:bg-gray-400 transition z-10"
        onClick={scrollRight}
      >
        &#8250;
      </button>

      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="flex flex-row gap-4 overflow-x-scroll scrollbar-hide scroll-smooth"
        style={{
          scrollBehavior: "smooth",
          width: `${itemWidth * visibleItems}px`,
        }}
      >
        {menu.length === 0 ? (
          <p>料理がありません</p> // Thay đổi "No dishes available" thành tiếng Nhật
        ) : (
          menu.map((dish) => (
            <div
              key={dish._id}
              style={{ minWidth: `${itemWidth}px` }} // Đảm bảo mỗi item có độ rộng cố định
            >
              <DishItem dish={dish} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MenuSlider;
