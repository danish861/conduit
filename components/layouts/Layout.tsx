import { AnyCnameRecord } from "dns";
import React from "react";
import MainNavigation from "./MainNavigation";
import { useTheme } from "next-themes";
import Footer from "./Footer";

const Layout = (props: any) => {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
