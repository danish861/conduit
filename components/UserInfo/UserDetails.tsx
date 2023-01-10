import Link from "next/link";
import moment from "moment";
import React from "react";
import { useRouter } from "next/router";

interface IUserDetailsProps {
  author: {
    username: string;
    image: string;
  };
  updatedAt: number;
}

const UserDetails = ({ author, updatedAt }: IUserDetailsProps) => {
  const router = useRouter();
  return (
    <>
      <div className="flex  gap-2 items-center ">
        <Link href={`${author.username}`}>
          <img src={author.image} alt="img" className="rounded-full w-8 h-8" />
        </Link>
        <div className="flex flex-col justify-evenly ">
          <button
            // href={`${author.username}`}
            onClick={() => router.push(`/${author.username}`)}
            className={`-m-1 ml-0.5 text-green hover:underline`}
          >
            {author.username}
          </button>
          <span className=" text-xs ml-0.5 text-slate-300 ">
            {moment(updatedAt).format("MMMM D, YYYY")}
          </span>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
