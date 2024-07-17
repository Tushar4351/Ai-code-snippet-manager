"use client";

import ContextArea from "./Components/ContextArea/ContextArea";
import Sidebar from "./Components/Sidebar";
const page = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="w-full md:w-[90%]">
        <ContextArea />
      </main>
    </div>
  );
};

export default page;
