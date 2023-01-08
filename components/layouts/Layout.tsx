import { AnyCnameRecord } from "dns";
import React from "react";
import MainNavigation from "./MainNavigation";
import { useTheme } from "next-themes";

const Layout = (props: any) => {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
