import { useGlobalContext } from "@/ContextApi";
import Image from "next/image";
import React from "react";

const DarkMode = () => {
  const {
    darkModeObject: { darkMode, setDarkMode },
  } = useGlobalContext();

  function handleClickedDarkMode(index: number) {
    const updateDarkModeObject = darkMode.map((item, i) => ({
      ...item,
      isSelected: i === index,
    }));
    setDarkMode(updateDarkModeObject);
  }

  const isChecked = darkMode[1]?.isSelected;

  return (
    <label className="inline-flex items-center relative cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        onChange={() => handleClickedDarkMode(isChecked ? 0 : 1)}
      />
      <div
        className={`
          relative w-[84px] h-[36px] peer-checked:bg-zinc-500 bg-gray-100
          rounded-full shadow-sm transition-colors duration-300
          after:absolute after:content-[''] after:rounded-full
          after:h-[35px] after:w-[40px] after:bg-[#9588e8] 
          after:top-[1px] after:left-[3px] after:shadow-md
          after:transition-all after:duration-300
          peer-checked:after:bg-[#9588e8] peer-checked:after:translate-x-[40px]
          peer-active:after:w-[40px]
        `}
      ></div>
      {darkMode.map((item, index) => (
        <div
          key={index}
          className={`
            absolute transition-all duration-300
            ${index === 0 ? "left-[9px]" : "right-[7px]"}
            ${
              isChecked
                ? index === 0
                  ? "opacity-60"
                  : "opacity-70"
                : index === 0
                ? "opacity-100"
                : "opacity-60"
            }
            w-[28px] h-[28px] rounded-full overflow-hidden
          
            flex items-center justify-center
            top-1/2 transform -translate-y-1/2
          `}
        >
          <Image
            src={item.icon}
            alt={`Dark mode ${index === 0 ? "off" : "on"}`}
            width={20}
            height={20}
            className={`${isChecked && index === 1 ? "filter invert" : ""}`}
          />
        </div>
      ))}
    </label>
  );
};

export default DarkMode;