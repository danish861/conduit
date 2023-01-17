import React from "react";
import UserDetails from "../UserInfo/UserDetails";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import ArticlTag from "../Tags/ArticlTag";
import Link from "next/link";
import FollowButton from "../common/FollowButton";
import Comments from "./Comments";
import authStore from "../../store/AuthStore";
import { useRouter } from "next/router";
import { deleteArticle } from "../../APIs/article";
import FavouriteButtonCount from "../common/FavouriteButtonCount";

interface IArticleDetailsProps {
  title: string;
  body: string;
  tagList: string[];
  author: {
    username: string;
    image: string;
    following: boolean;
  };
  favoritesCount: number;
  updatedAt: number;
  favorited: boolean;
  slug: string;
}

const ArticleDetails = ({
  title,
  body,
  tagList,
  author,
  favoritesCount,
  updatedAt,
  favorited,
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
          <h1 className="text-4xl font-semibold font-source-sans-pro text-white mb-6  ">
            {title}
          </h1>
          <div className=" flex items-center gap-5  ">
            <UserDetails author={author} updatedAt={updatedAt} color="white" />

            <div className=" flex md:flex-row xs:flex-col xs:gap-1  md:gap-0 ">
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
                  <FollowButton
                    user={author.username}
                    following={author.following}
                  />
                  <FavouriteButtonCount
                    favoritesCount={favoritesCount}
                    slug={slug}
                    favorited={favorited}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-9  lg:mx-40 p-7 ">
        <p className="leading-7 text-lg font-source-sans-pro mb-5">{body}</p>
        <ul className="flex">
          {tagList?.map((tag, index) => (
            <div key={index}>
              <ArticlTag tag={tag} />
            </div>
          ))}
        </ul>
        <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />

        <div className=" flex items-center gap-5 ml-8 sm:ml-28 lg:ml-96">
          <UserDetails author={author} updatedAt={updatedAt} />

          <div className="flex md:flex-row xs:flex-col xs:gap-1  md:gap-0">
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
                <FollowButton
                  user={author.username}
                  following={author.following}
                />
                <FavouriteButtonCount
                  favoritesCount={favoritesCount}
                  slug={slug}
                  favorited={favorited}
                />
              </>
            )}
          </div>
        </div>

        <div className=" xl:px-48 lg:px-28  sm:px-10 py-10">
          <Comments />
        </div>
      </div>
    </>
  );
};

export default ArticleDetails;
