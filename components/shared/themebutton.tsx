"use client"
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";


const ThemeButton = () => {
    const {resolvedTheme,setTheme,theme}=useTheme();
  const changeTheme = ()=>{
    setTheme(resolvedTheme==="light"?"dark":"light");
  }
  return (
    <>
      
        <button
          onClick={changeTheme}
          className=" border text-xl px-5 py-2 md:-mr-40 "
        >
          {theme=="light"?<MoonIcon/>:<SunIcon/>}
        </button>
      
    </>
  );
};

export default ThemeButton;
