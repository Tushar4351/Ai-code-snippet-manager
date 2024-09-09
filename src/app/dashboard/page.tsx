"use client";

import { useGlobalContext } from "@/ContextApi";
import ContentArea from "./Components/ContentArea/ContentArea";
import Sidebar from "./Components/SideBar/Sidebar";
const page = () => {
  const {
    darkModeObject: { darkMode },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useGlobalContext();
  return (
    <div
      className={`flex h-screen w-full ${
        darkMode[1].isSelected ? "bg-[#0c0b10] border-neutral-700" : "border-neutral-200"
      } border border-t-4`}
    >
      <Sidebar />
      <main className="w-full">
        <ContentArea />
      </main>
    </div>
  );
};

export default page;
