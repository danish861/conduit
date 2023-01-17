import Link from "next/link";
import moment from "moment";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AppContext, AppContextProps } from "../../pages/_app";

interface IUserDetailsProps {
  author: {
    username: string;
    image: string;
  };
  updatedAt: number;
  color?: string;
}

// interface AppContextType {
//   currentTab: number;
//   setCurrentTab: () => void;
// }

const UserDetails = ({ author, updatedAt, color }: IUserDetailsProps) => {
  const router = useRouter();

  const { currentTab, setCurrentTab } = useContext(AppContext);

  const redirectToProfilePage = () => {
    router.push(`/${author.username}`);
    setCurrentTab(0);
  };
  return (
    <>
      <div className="flex  gap-2  items-center">
        <button onClick={redirectToProfilePage}>
          <img src={author.image} alt="img" className="rounded-full w-8 h-8" />
        </button>
        <div className=" inline-block">
          <button
            // href={`${author.username}`}
            onClick={redirectToProfilePage}
            className={`-m-1 ml-0.5 block  text-green hover:underline items-start`}
            style={{ color: color }}
          >
            {author.username}
          </button>
          <span className=" block  text-xs ml-0.5 text-slate-300 ">
            {moment(updatedAt).format("MMMM D, YYYY")}
          </span>
        </div>
      </div>
    </>
  );
};

export default UserDetails;

// -m-1 ml-0.5
