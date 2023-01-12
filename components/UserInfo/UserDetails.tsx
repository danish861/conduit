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
      <div className="flex  gap-2  items-center">
        <button onClick={() => router.push(`/${author.username}`)}>
          <img src={author.image} alt="img" className="rounded-full w-8 h-8" />
        </button>
        <div className=" inline-block">
          <button
            // href={`${author.username}`}
            onClick={() => router.push(`/${author.username}`)}
            className={`-m-1 ml-0.5 block  text-green hover:underline items-start`}
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
