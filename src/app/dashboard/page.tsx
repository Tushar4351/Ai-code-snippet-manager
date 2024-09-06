"use client";

import ContentArea from "./Components/ContentArea/ContentArea";
import Sidebar from "./Components/SideBar/Sidebar";
const page = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="w-full md:w-[90%]">
        <ContentArea />
      </main>
    </div>
  );
};

export default page;
