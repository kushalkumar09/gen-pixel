import React from "react";
// import Transformationform from "./transformationform";

type headerProps = {
  title: string;
  subtitle?: string;
};
const Header = ({ title, subtitle }: headerProps) => {
  return (
    <>
      <h2 className=" h2-bold text-dark-700  dark:text-white">{title}</h2>
      {subtitle && <p className="p-16-regular mt-4  dark:text-white">{subtitle}</p>}
    </>
  );
};

export default Header;
