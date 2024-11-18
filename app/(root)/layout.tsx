import Mobilenav from "@/components/shared/mobilenav";
import Sidebar from "@/components/shared/sidebar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <Sidebar/>
      <Mobilenav/>
      <div className="root-container">
        <div className="wrapper">{children}</div>
        <Toaster />
      </div>
    </main>
  );
};

export default Layout;
