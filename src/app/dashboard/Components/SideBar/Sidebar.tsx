"use client";
import Image from "next/image";
import logoImage from "../../../../assets/images/logosaas.png";
import { useGlobalContext } from "@/ContextApi";
import { getLanguageIcon } from "@/app/localData/LanguageTextToIcon";
import TagsWindow from "../ContentArea/TagsWIndow/TagsWindow";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClerk } from "@clerk/nextjs";
import {
  SidebarM,
  SidebarBody,
  SidebarLink,
  LanguageLink,
} from "./SidebarComponents";
const Sidebar = () => {
  const {
    sideBarMenuObject: { sideBarMenu, setSideBarMenu },
    darkModeObject: { darkMode },
    openSideBarObject: { openSideBar },
    codeLanguageCOunterObject: { codeLanguagesCounter },
    tagsAndLogoutMenuObject: { tagsAndLogoutMenu },
    openTagsWindowObject: { openTagsWindow, setOpenTagsWindow },
  } = useGlobalContext();

  const { signOut } = useClerk();

  const [hoveredQuickLinks, setHoveredQuickLinks] = useState<number | null>(
    null
  );
  const [hoveredTagAndLogout, setHoveredTagAndLogout] = useState<number | null>(
    null
  );
  const [open, setOpen] = useState(false);

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
    if (updatedMenu[index].name === "Tags") {
      setOpenTagsWindow(true);
    } else if (updatedMenu[index].name === "Log Out") {
      handleLogout();
    }
  };

  const handleLogout = () => {
    // Implement your logout logic here
    signOut({ redirectUrl: "/" });
  };

  return (
    <SidebarM open={open} setOpen={setOpen}>
      <SidebarBody>
        <div
          className={`flex flex-col gap-4 flex-1 overflow-y-auto overflow-x-hidden ${
            open ? "" : "items-center"
          }`}
        >
          {/* Show both Logo and LogoIcon when open is true, and only Logo when open is false */}
          {open ? (
            <div className="flex items-center space-x-2">
              <LogoIcon />
              <Logo />
            </div>
          ) : (
            <LogoIcon />
          )}
          <div className="mt-24 flex flex-col gap-3">
            {sideBarMenu.map((link, idx) => (
              <SidebarLink
                key={idx}
                link={link}
                index={idx}
                hoveredQuickLinks={hoveredQuickLinks}
                setHoveredQuickLinks={setHoveredQuickLinks}
                clickedMenu={clickedMenu}
                darkMode={darkMode}
              />
            ))}
          </div>
          <div className=" flex flex-col gap-3">
            {tagsAndLogoutMenu.map((link, idx) => (
              <SidebarLink
                key={idx}
                link={link}
                index={idx}
                hoveredQuickLinks={hoveredTagAndLogout}
                setHoveredQuickLinks={setHoveredTagAndLogout}
                clickedMenu={clickedTagsMenu}
                darkMode={darkMode}
              />
            ))}
          </div>
          {openTagsWindow && <TagsWindow />}
          <div className="mt-6 flex flex-col gap-3">
            {codeLanguagesCounter.map((language, index) => (
              <li
                key={index}
                className="flex items-center px-3 py-2 justify-between rounded"
              >
                <div className="flex items-center gap-2">
                  <LanguageLink
                    language={{
                      id: language.language,
                      name: capitalizeFistOccurance(language.language),
                      icon: getLanguageIcon(
                        capitalizeFistOccurance(language.language)
                      ),
                    }}
                    className={darkMode[1].isSelected ? "text-white" : ""}
                  />
                </div>
                {open ? (
                  <>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                      {language.count}
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </li>
            ))}
          </div>
        </div>
      </SidebarBody>
    </SidebarM>
    //
    //   <div className="mt-10 space-y-4">
    //     {codeLanguagesCounter.length > 0 && (
    //       <>
    //         <div
    //           className={`${
    //             darkMode[1].isSelected
    //               ? "text-white text-lg font-semibold"
    //               : "text-black text-lg font-semibold"
    //           }`}
    //         >
    //           Languages
    //         </div>
    //         <ul className="grid gap-2">
    //           {codeLanguagesCounter.map((language, index) => (
    //             <li
    //               key={index}
    //               className="flex items-center px-3 py-2 justify-between rounded"
    //             >
    //               <div className="flex items-center gap-2">
    //                 {getLanguageIcon(
    //                   capitalizeFistOccurance(language.language)
    //                 )}
    //                 <span className={`${darkMode[1].isSelected ? "text-white" : ""}`}>{capitalizeFistOccurance(language.language)}</span>
    //               </div>
    //               <span className="text-xs bg-gray-200 px-2 py-1 rounded">
    //                 {language.count}
    //               </span>
    //             </li>
    //           ))}
    //         </ul>
    //       </>
    //     )}
    //   </div>
    //   <div className="mt-10 space-y-4">
    //     <div
    //       className={` ${
    //         darkMode[1].isSelected
    //           ? "text-white text-lg font-semibold"
    //           : "text-black text-lg font-semibold"
    //       }`}
    //     >
    //       Credits
    //     </div>
    //   </div>
    // </aside>
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

export const Logo = () => {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={` ${
          darkMode[1].isSelected ? "text-[#9588e8]" : "text-black"
        }  font-bold text-lg`}
      >
        SnippetGenius
      </motion.span>
    </div>
  );
};
export const LogoIcon = () => {
  return (
    <div className="flex-shrink-0">
      <Image
        src={logoImage}
        alt="Saas Logo"
        className="h-10 w-10 relative"
        width={40}
        height={40}
      />
    </div>
  );
};
