"use client";
import Image from "next/image";
import logoImage from "../../../assets/images/logosaas.png";
import { useGlobalContext } from "@/ContextApi";

const Sidebar = () => {
  const {
    sideBarMenuObject: { sideBarMenu, setSideBarMenu },
    darkModeObject: { darkMode },
    openSideBarObject : {openSideBar,setOpenSideBar}
  } = useGlobalContext();
  // console.log(sideBarMenu);
 // console.log("sidebar:", darkMode);

  function clickedMenu(index: number) {
    const updatedSideBarMenu = sideBarMenu.map((menu, i) => {
      if (i === index) {
        return { ...menu, isSelected: true };
      } else {
        return { ...menu, isSelected: false };
      }
    });
    setSideBarMenu(updatedSideBarMenu);
  }

  return (
    <aside
      style={{
        paddingRight: "5rem"
      }}
      className={`${openSideBar? "fixed z-50 shadow-lg" : "hidden md:flex"} p-6 pt-7 flex-col  ${darkMode[1].isSelected ? "bg-[#0c0b10]" : "bg-white border-r"} h-screen`}
    >
      <div className="flex items-center gap-2 border-b pb-4">
        <div className="flex flex-row items-center">
          <div className="relative">
            <div className="absolute  top-2 bottom-0 bg-[linear-gradient(to_right,rgb(252,214,255),rgb(41,216,255),rgb(255,253,128),rgb(252,214,255))] blur-md"></div>
            <Image
              src={logoImage}
              alt="Saas Logo"
              className="h-12 w-12 relative"
              width={48}
              height={48}
            />
          </div>

          <h1
            className={` ${
              darkMode[1].isSelected ? "text-[#9588e8]" : "text-black"
            } absolute font-bold text-lg left-20`}
          >
            SnippetGenius
          </h1>
        </div>
      </div>
      <nav className="flex flex-col gap-4 mt-10">
        <div
          className={` ${darkMode[1].isSelected? "text-white ": "text-black "}text-lg font-semibold`}
        >
          Quick Links
        </div>
        <ul className="grid gap-2">
          {sideBarMenu.map((link, index) => (
            <li
              key={index}
              onClick={() => clickedMenu(index)}
              className={`flex items-center gap-2 px-3 pr-10 py-2 ${link.isSelected ? "bg-[#9588e8] text-white" : "text-black"} hover:bg-[#9588e8] w-full rounded-lg`}
            >
             {link.icon}
              <span className={`${darkMode[1].isSelected ? "text-white" : ""}`}>
                {link.name}
              </span>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-10 space-y-4">
        <div
          className={`${
            darkMode[1].isSelected
              ? "text-white text-lg font-semibold"
              : "text-black text-lg font-semibold"
          }`}
        >
          Languages
        </div>
        {/* <ul className="grid gap-2">
          {languages.map((language, index) => (
            <li
              key={index}
              className="flex items-center px-3 py-2 justify-between hover:bg-violet-200 rounded"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={language.icon}
                  alt={language.name}
                  className="h-6 w-6"
                  width={20}
                  height={20}
                />
                <span>{language.name}</span>
              </div>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">0</span>
            </li>
          ))}
        </ul> */}
      </div>
      <div className="mt-10 space-y-4">
        <div
          className={` ${
            darkMode[1].isSelected
              ? "text-white text-lg font-semibold"
              : "text-black text-lg font-semibold"
          }`}
        >
          Credits
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
