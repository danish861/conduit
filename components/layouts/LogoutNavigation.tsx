import Link from "next/link";
import { useRouter } from "next/router";
import classes from "../../styles/MainNavigation.module.css";

const LogOutNavigation = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <>
      <li
        className={
          currentRoute == "/login" ? classes.active : classes.nonActive
        }
      >
        <Link href="/login"> Sign in</Link>
      </li>
      <li
        className={
          currentRoute == "/register" ? classes.active : classes.nonActive
        }
      >
        <Link href="/register"> Sign up</Link>
      </li>
    </>
  );
};

export default LogOutNavigation;
