import React from "react";
import { RiSettings4Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import authStore from "../../store/AuthStore";
import useSWR from "swr";
import { useRouter } from "next/router";
import { followUser, getProfile, unFollowUser } from "../../APIs/profile";
import FollowButton from "../common/FollowButton";
import Link from "next/link";
import ProfleDetails from "./ProfleDetails";

interface IProfileInfo {
  profile: {
    username: string;
    image: string;
    bio: string;
  };
}

const ProfileInfo = () => {
  const { query, isReady } = useRouter();

  const user = query.username;
  const { data, error } = useSWR<IProfileInfo>(
    user ? `profiles/${user}` : null,
    user ? (url) => getProfile(url) : null
  );

  if (!data) {
    return <div>Loading......</div>; // handle
  }
  const { username, image, bio } = data.profile;

  return (
    <>
      <div className="bg-darkGray p-4 flex flex-col md:relative  ">
        <div className="flex flex-col items-center  p-6">
          <img src={image} alt="user_img" className="rounded-full  w-20" />
          <p className="text-2xl font-bold mt-3"> {username} </p>
          <p>{bio}</p>
        </div>

        {authStore.username === username ? (
          <div className=" md:absolute bottom-3  md:right-52 w-44  ">
            <Link
              href="/settings"
              className=" text-gray-500 hover:text-gray-300 text-xs mr-2 px-2.5 py-0.5  border hover:outline-none  rounded hover:bg-gray-400  flex  items-center gap-1 h-7 "
            >
              <RiSettings4Fill fontSize={14} /> Edit Profile Settings
            </Link>
          </div>
        ) : (
          <div className="md:absolute  bottom-3  right-52 ">
            <FollowButton user={username} />
          </div>
        )}
      </div>
      <ProfleDetails />
    </>
  );
};

export default ProfileInfo;
