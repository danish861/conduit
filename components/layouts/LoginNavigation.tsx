import { useRouter } from "next/router";
import classes from "../../styles/MainNavigation.module.css";

import React from "react";
import Link from "next/link";
import AuthStore from "../../store/AuthStore";
import authStore from "../../store/AuthStore";
import { FiSettings } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";

const LogInNavigation = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <>
      <li
        className={
          currentRoute == "/editor" ? classes.active : classes.nonActive
        }
      >
        <Link href="/editor">
          <div className="flex items-center gap-1 ">
            <BiEdit /> New Article
          </div>
        </Link>
      </li>

      <li
        className={
          currentRoute == "/settings" ? classes.active : classes.nonActive
        }
      >
        <Link href="/settings">
          <div className="flex items-center gap-1 ">
            <FiSettings /> Setting
          </div>
        </Link>
      </li>

      <li
        className={
          router.asPath == `/${authStore.username}`
            ? classes.active
            : classes.nonActive
        }
      >
        <button
          onClick={() =>
            router.replace({
              pathname: `/${authStore.username}`,
            })
          }
        >
          <div className="flex items-center gap-1 ">
            <img
              src={AuthStore.image}
              alt="user_image"
              className="w-5  h-5 rounded-full"
            />
            <p> {authStore.username}</p>
          </div>
        </button>
      </li>
    </>
  );
};

export default LogInNavigation;

// pathname: currentRoute, query: signupStore.username
