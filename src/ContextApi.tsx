"use client";

import { useContext, createContext, useState } from "react";
import snippetIcon from "./assets/icons/snippet.png";
import importantIcon from "./assets/icons/important.png";
import deleteIcon from "./assets/icons/delete.png";

import nightIcon from "./assets/icons/night.png";
import sunIcon from "./assets/icons/sun.png";
import cIcon from "./assets/icons/c.png";

interface GlobalContextType {
  sideBarMenuObject: {
    sideBarMenu: SideBarMenu[];
    setSideBarMenu: React.Dispatch<React.SetStateAction<SideBarMenu[]>>;
  };
  darkModeObject: {
    darkMode: DarkModeType[];
    setDarkMode: React.Dispatch<React.SetStateAction<DarkModeType[]>>;
  };

  openSideBarObject:{
  openSideBar: boolean;
  setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  }
}

const ContextProvider = createContext<GlobalContextType>({
  sideBarMenuObject: {
    sideBarMenu: [],
    setSideBarMenu: () => {},
  },
  darkModeObject: {
    darkMode: [],
    setDarkMode: () => {},
  },
  openSideBarObject: {
    openSideBar: false,
    setOpenSideBar: () => { },
    }
});

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sideBarMenu, setSideBarMenu] = useState<SideBarMenu[]>([
    {
      id: 1,
      name: "Snippets",
      isSelected: true,
      icon: snippetIcon,
    },
    {
      id: 2,
      name: "Important",
      isSelected: false,
      icon: importantIcon,
    },
    {
      id: 3,
      name: "Delete",
      isSelected: false,
      icon: deleteIcon,
    },
  ]);
  const [darkMode, setDarkMode] = useState<DarkModeType[]>([
    {
      id: 1,
      isSelected: true,
      icon: sunIcon,
    },
    {
      id: 2,
      isSelected: false,
      icon: nightIcon,
    },
  ]);
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  return (
    <ContextProvider.Provider
      value={{
        sideBarMenuObject: { sideBarMenu, setSideBarMenu },
        darkModeObject: { darkMode, setDarkMode },
        openSideBarObject: { openSideBar, setOpenSideBar },
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(ContextProvider);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
