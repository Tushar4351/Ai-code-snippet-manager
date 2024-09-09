"use client";

import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useGlobalContext } from "@/ContextApi";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const SidebarM = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const {
    darkModeObject: { darkMode },
    openSideBarObject: { openSideBar },
  } = useGlobalContext();

  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={`${
          openSideBar ? "fixed z-50 shadow-lg" : "hidden md:flex"
        } p-6 pt-7 flex-col  ${
          darkMode[1].isSelected ? "bg-[#0c0b10]" : "bg-white"
        } h-screen px-4 py-4 w-[250px] md:w-[75px] flex-shrink-0`}
        animate={{
          width: animate ? (open ? "250px" : "75px") : "250px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const SidebarLink = ({
  link,
  index,
  hoveredQuickLinks,
  setHoveredQuickLinks,
  clickedMenu,
  darkMode,
  className,
  ...props
}: {
  link: SideBarMenu;
  index: number;
  hoveredQuickLinks: number | null;
  setHoveredQuickLinks: (index: number | null) => void;
  clickedMenu: (index: number) => void;
  darkMode: any;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  const isHovered = hoveredQuickLinks === index;
  const isSelected = link.isSelected;
  return (
    <li
      key={index}
      onClick={() => clickedMenu(index)}
      onMouseEnter={() => setHoveredQuickLinks(index)}
      onMouseLeave={() => setHoveredQuickLinks(null)}
      className="p-2"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        width: "100%",
        borderRadius: "0.5rem",
        backgroundColor: isSelected || isHovered ? "#9588e8" : "transparent",
        color: isSelected || isHovered ? "white" : "inherit",
        cursor: "pointer",
        transition: "background-color 0.3s, color 0.3s",
      }}
      {...props}
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

      <motion.span
        style={{
          color:
            isSelected || isHovered
              ? "white"
              : darkMode[1].isSelected
              ? "white"
              : "black",
          transition: "color 0.3s",
        }}
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className=" group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.name}
      </motion.span>
    </li>
  );
};

interface LanguageLinkProps {
  language: SingleCodeLanguageType;
  className?: string;
  props?: React.HTMLAttributes<HTMLDivElement>;
}

export const LanguageLink = ({
  language,
  className,
  ...props
}: LanguageLinkProps) => {
  const { open, animate } = useSidebar();

  return (
    <div
      className={cn(
        "flex items-center justify-start  group/sidebar py-1",
        className
      )}
      {...props}
    >
      {language.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {language.name}
      </motion.span>
    </div>
  );
};

