import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classes from "../../styles/MainNavigation.module.css";
import LogOutNavigation from "./LogoutNavigation";
import LogInNavigation from "./LoginNavigation";

import authStore from "../../store/AuthStore";
import { observer } from "mobx-react-lite";

import { storedAnnotationsSymbol } from "mobx/dist/internal";
import AuthStore from "../../store/AuthStore";
import MOdalPage from "./DialogCmponent";
import DialogCmponent from "./DialogCmponent";

const MainNavigation = observer((props: any) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const { isLoggedIn } = authStore;

  return (
    <>
      <header className="flex flex-col xs:flex-row items-center justify-between mx-9  lg:mx-48 p-2   ">
        <div className="flex gap-7">
          <Link
            href="/"
            className="font-Titillium text-green text-xl font-bold"
          >
            conduit
          </Link>
        </div>

        <nav>
          <ul className="flex items-center gap-4 ">
            <li>
              <DialogCmponent />
            </li>
            <li
              className={
                currentRoute == "/" ? classes.active : classes.nonActive
              }
            >
              <Link href="/"> Home</Link>
            </li>

            {isLoggedIn ? <LogInNavigation /> : <LogOutNavigation />}
          </ul>
        </nav>
      </header>
      <main>{props.children}</main>
    </>
  );
});

export default MainNavigation;
