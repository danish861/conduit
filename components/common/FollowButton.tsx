import React from "react";

import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { mutate } from "swr";
import { followUser, unFollowUser } from "../../api/profile";
import useSWR from "swr";
import authStore from "../../store/AuthStore";
import { useRouter } from "next/router";

interface IUser {
  user: string;
}

const FollowButton = ({ user }: IUser) => {
  const [following, setFollowing] = useState("");
  const router = useRouter();

  const follow = async () => {
    const response = await followUser(`profiles/${user}/follow`);
    setFollowing(response.profile.following);
  };

  const unfollow = async () => {
    const response = await unFollowUser(`profiles/${user}/follow`);
    setFollowing(response.profile.following);
  };

  const buttonHandler = async () => {
    if (!authStore.isLoggedIn) {
      router.push("/register");
    }
    following ? await unfollow() : await follow();
  };
  return (
    <div>
      <button
        className=" text-gray-500 hover:text-gray-300 text-xs mr-2 px-2.5 py-0.5 font-semibold border hover:outline-none  rounded hover:bg-gray-400  flex  items-center gap-1 h-7"
        onClick={buttonHandler}
      >
        <AiOutlinePlus fontSize={20} /> {following ? "Unfollow" : "Follow"}{" "}
        {user}
      </button>
    </div>
  );
};

export default FollowButton;
