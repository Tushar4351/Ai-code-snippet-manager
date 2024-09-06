"use client";
import Image from "next/image";
import logoImage from "../../../../assets/images/logosaas.png";
import { useGlobalContext } from "@/ContextApi";
import { getLanguageIcon } from "@/app/localData/LanguageTextToIcon";
import TagsWindow from "../ContentArea/TagsWIndow/TagsWindow";
import { useState } from "react";
import { useClerk } from "@clerk/nextjs";

const Sidebar = () => {
  const {
    sideBarMenuObject: { sideBarMenu, setSideBarMenu },
    darkModeObject: { darkMode },
    openSideBarObject: { openSideBar},
    codeLanguageCOunterObject: {
      codeLanguagesCounter,
    },
    tagsAndLogoutMenuObject: { tagsAndLogoutMenu},
    openTagsWindowObject: { openTagsWindow, setOpenTagsWindow },
  } = useGlobalContext();

  const { signOut } = useClerk()

  const [hoveredQuickLinks, setHoveredQuickLinks] = useState<number | null>(
    null
  );
  const [hoveredTagAndLogout, setHoveredTagAndLogout] = useState<number | null>(
    null
  );

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
  const clickedTagsMenu = (index: number) => {
    const updatedMenu = tagsAndLogoutMenu.map((item, i) => ({
      ...item,
      isSelected: i === index,
    }));

    //setTagsAndLogoutMenu(updatedMenu);
    console.log(updatedMenu[index].name);
    if (updatedMenu[index].name === "Tags") {
      setOpenTagsWindow(true);
    } else if (updatedMenu[index].name === "Log Out") {
      handleLogout();
    }
  };

  const handleLogout = () => {
    // Implement your logout logic here
    signOut({ redirectUrl: '/' })
  };

  return (
    <aside
      style={{
        paddingRight: "5rem",
      }}
      className={`${
        openSideBar ? "fixed z-50 shadow-lg" : "hidden md:flex"
      } p-6 pt-7 flex-col  ${
        darkMode[1].isSelected ? "bg-[#0c0b10]" : "bg-white border-r"
      } h-screen`}
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
          className={` ${
            darkMode[1].isSelected ? "text-white " : "text-black "
          }text-lg font-semibold`}
        >
          Quick Links
        </div>

        <ul className="grid gap-2">
          {sideBarMenu.map((link, index) => {
            const isHovered = hoveredQuickLinks === index;
            const isSelected = link.isSelected;

            return (
              <li
                key={index}
                onClick={() => clickedMenu(index)}
                onMouseEnter={() => setHoveredQuickLinks(index)}
                onMouseLeave={() => setHoveredQuickLinks(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 0.75rem",
                  paddingRight: "2.5rem",
                  width: "100%",
                  borderRadius: "0.5rem",
                  backgroundColor: isSelected
                    ? "#9588e8"
                    : isHovered
                    ? "#9588e8"
                    : "transparent",
                  color: isSelected || isHovered ? "white" : "inherit",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: isSelected || isHovered ? "white" : "#9588e8",
                  }}
                >
                  {link.icon}
                </span>
                <span
                  style={{
                    color:
                      isSelected || isHovered
                        ? "white"
                        : darkMode[1].isSelected
                        ? "white"
                        : "black",
                  }}
                >
                  {link.name}
                </span>
              </li>
            );
          })}
        </ul>

        <ul className="grid gap-2">
          {tagsAndLogoutMenu.map((link, index) => {
            const isHovered = hoveredTagAndLogout === index;
            const isSelected = link.isSelected;

            return (
              <li
                key={index}
                onClick={() => clickedTagsMenu(index)}
                onMouseEnter={() => setHoveredTagAndLogout(index)}
                onMouseLeave={() => setHoveredTagAndLogout(null)}
                className={`
              flex items-center gap-2 px-3 pr-10 py-2 w-full rounded-lg
              ${isSelected ? "bg-[#9588e8]" : ""}
              ${isHovered || isSelected ? "text-white" : ""}
              hover:bg-[#9588e8]
              
            `}
              >
                <span
                  className={`
              ${isHovered || isSelected ? "text-white" : "text-[#9588e8]"}
            `}
                >
                  {link.icon}
                </span>
                <span
                  className={`
              ${darkMode[1].isSelected ? "text-white" : ""}
              ${isHovered || isSelected ? "text-white" : ""}
              
            `}
                >
                  {link.name}
                </span>
              </li>
            );
          })}
        </ul>

        {openTagsWindow && <TagsWindow />}
      </nav>
      <div className="mt-10 space-y-4">
        {codeLanguagesCounter.length > 0 && (
          <>
            <div
              className={`${
                darkMode[1].isSelected
                  ? "text-white text-lg font-semibold"
                  : "text-black text-lg font-semibold"
              }`}
            >
              Languages
            </div>
            <ul className="grid gap-2">
              {codeLanguagesCounter.map((language, index) => (
                <li
                  key={index}
                  className="flex items-center px-3 py-2 justify-between rounded"
                >
                  <div className="flex items-center gap-2">
                    {getLanguageIcon(
                      capitalizeFistOccurance(language.language)
                    )}
                    <span className={`${darkMode[1].isSelected ? "text-white" : ""}`}>{capitalizeFistOccurance(language.language)}</span>
                  </div>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {language.count}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
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
//write the function
function capitalizeFistOccurance(str: string) {
  if (!str) return str;
  for (let i = 0; i < str.length; i++) {
    if (i === 0) {
      str = str.substring(0, 1).toUpperCase() + str.substring(1);
      break;
    }
  }
  return str;
}
