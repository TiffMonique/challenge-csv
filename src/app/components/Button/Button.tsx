import { ButtonProps } from "@/app/interfaces";
import React from "react";

const Button = ({ children, addClass, onClick }: ButtonProps) => {
  return (
    <button
      className={
        "flex justify-center items-center py-3 xl:py-4 px-8 xl:px-10 text-white-500 font-medium rounded bg-primary hover:shadow-purple hover:bg-secondary transition-all outline-none" +
        addClass
      }
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
