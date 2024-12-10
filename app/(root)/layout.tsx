import Mobilenav from "@/components/shared/mobilenav";
import Sidebar from "@/components/shared/sidebar";
import ThemeButton from "@/components/shared/themebutton";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root dark:bg-black dark:text-white">
      <Sidebar />
      <Mobilenav />
      <div className="root-container">
        <div className=" flex justify-end w-[80%] ">
          <ThemeButton />
        </div>
        <div className="wrapper">{children}</div>
        <Toaster />
      </div>
    </main>
  );
};

export default Layout;
