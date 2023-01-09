import React from "react";
import UserDetails from "../UserInfo/UserDetails";
import { AiOutlinePlus } from "react-icons/ai";
import { HiHeart } from "react-icons/hi";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import ArticlTag from "../Tags/ArticlTag";
import Link from "next/link";
import FollowButton from "../common/FollowButton";
import FavouriteButton from "../common/FavouriteButton";
import Comments from "./Comments";
import authStore from "../../store/AuthStore";
import { useRouter } from "next/router";
import { deleteArticle } from "../../APIs/article";

interface IArticleDetailsProps {
  title: string;
  body: string;
  tagList: string[];
  author: {
    username: string;
    image: string;
  };
  favoritesCount: number;
  updatedAt: number;
  slug?: string | undefined;
}

const ArticleDetails = ({
  title,
  body,
  tagList,
  author,
  favoritesCount,
  updatedAt,
  slug,
}: IArticleDetailsProps) => {
  const username = author.username;
  const router = useRouter();

  const deleteHandler = async () => {
    await deleteArticle(`articles/${slug}`);
    router.push("/");
  };
  return (
    <>
      <div className="bg-mildBlack ">
        <div className="mx-9  md:mx-40 p-7  gap-3  flex flex-col ">
          <h1 className="text-4xl font-semibold text-white mb-6  ">{title}</h1>
          <div className=" flex items-center gap-5  ">
            <UserDetails author={author} updatedAt={updatedAt} />

            <div className="flex">
              {authStore.username === username ? (
                <>
                  <button
                    onClick={() => router.push(`/editor/${slug}`)}
                    className=" text-gray-500 hover:text-white text-xs mr-2 px-2.5 py-0.5 border border-gray-100   rounded hover:bg-slate-300 hover:outline-none  flex  items-center gap-1 h-7   "
                  >
                    <MdOutlineModeEdit fontSize={18} />
                    Edit Article
                  </button>

                  <button
                    className=" text-red-400 hover:text-white text-xs mr-2 px-2.5 py-0.5 border border-red-400   rounded hover:bg-red-500 hover:outline-none  flex  items-center gap-1 h-7 "
                    onClick={deleteHandler}
                  >
                    <RiDeleteBin6Line fontSize={14} />
                    Delete Article
                  </button>
                </>
              ) : (
                <>
                  <FollowButton user={author.username} />
                  <button className=" text-green hover:text-white text-xs mr-2 px-2.5 py-0.5 border border-green   rounded hover:bg-green hover:outline-none  flex  items-center gap-1 h-7   ">
                    <HiHeart fontSize={20} />
                    {favoritesCount}
                  </button>
                </>
              )}

              {/* <FavouriteButton
                favoritesCount={favoritesCount}
                slug={author.username}
              /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-9  lg:mx-40 p-7 ">
        <p className="leading-7 text-lg mb-5">{body}</p>
        <ul className="flex">
          {tagList.map((tag) => {
            return <ArticlTag tag={tag} key={tag} />;
          })}
        </ul>
        <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />

        <div className=" flex items-center gap-5  justify-center">
          <UserDetails author={author} updatedAt={updatedAt} />
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <FollowButton user={author.username} />

            <button className=" text-green hover:text-white text-xs mr-2 px-2.5 py-0.5 border border-green   rounded hover:bg-green hover:outline-none  flex  items-center gap-1 h-7   ">
              <HiHeart fontSize={20} /> Follow {author.username}
            </button>
          </div>
        </div>

        <div className=" xl:px-48 lg:px-28  sm:px-10 py-10">
          {authStore.isLoggedIn ? (
            <Comments />
          ) : (
            <p>
              <Link href="/login" className="text-green hover:underline">
                sign in
              </Link>{" "}
              or{" "}
              <Link href="/register" className="text-green hover:underline">
                sign up
              </Link>{" "}
              to add comments on this article.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ArticleDetails;
