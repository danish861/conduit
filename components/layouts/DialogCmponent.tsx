import { useTheme } from "next-themes";
import React, { useState } from "react";
import { CiLight } from "react-icons/ci";
import { MdNightsStay } from "react-icons/md";

const DialogCmponent = () => {
  const [isSelected, setIsSelected] = useState(false);
  const { theme, setTheme } = useTheme();

  const clickHandler = () => {
    setIsSelected((preState) => !preState);
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <>
      {isSelected ? (
        <button onClick={clickHandler} className="flex gap-1 items-center">
          <MdNightsStay fontSize={20} /> Dark mode
        </button>
      ) : (
        <button
          onClick={clickHandler}
          className="flex gap-1 items-center text-gray-100 "
        >
          <CiLight fontSize={20} /> Ligth mode
        </button>
      )}

      {/* <button
        onClick={() => setTheme("light")}
        className="flex gap-2 items-center"
      >
        <CiLight fontSize={20} /> Ligth mode
      </button>

      <button
        onClick={() => setTheme("dark")}
        className="flex gap-2 items-center"
      >
        <MdNightsStay fontSize={20} /> Dark mode
      </button> */}

      {/* <select
        value={theme}
        onChange={(e) => {
          setTheme(e.target.value);
        }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select> */}
    </>
  );
};

export default DialogCmponent;
