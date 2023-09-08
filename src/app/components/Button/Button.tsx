import { ButtonProps } from "@/app/interfaces";
import React from "react";

const Button = ({ children, addClass, onClick }: ButtonProps) => {
  return (
    <button
      className={
        "py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded bg-primary hover:shadow-purple transition-all outline-none" +
        addClass
      }
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
