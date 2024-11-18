import React from "react";
import Transformationform from "./transformationform";

type headerProps = {
  title: String;
  subtitle?: String;
};
const Header = ({ title, subtitle }: headerProps) => {
  return (
    <>
      <h2 className=" h2-bold text-dark-700">{title}</h2>
      {subtitle && <p className="p-16-regular mt-4">{subtitle}</p>}
    </>
  );
};

export default Header;
