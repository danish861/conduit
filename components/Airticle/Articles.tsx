import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { HiHeart } from "react-icons/hi";
import Pagination from "../Pagination";
import ArticlTag from "../Tags/ArticlTag";
import UserDetails from "../UserInfo/UserDetails";

import useSWR from "swr";
import { getArticleData } from "../../APIs/article";
import { useState } from "react";
import authStore from "../../store/AuthStore";
import FavouriteButton from "../common/FavouriteButton";
import { ColorRing } from "react-loader-spinner";

interface ArticlesProps {
  query: string;
  url: string;
}

interface Article {
  title: string;
  author: {
    username: string;
    image: string;
  };
  updatedAt: number;
  favoritesCount: number;
  slug: string;
  description: string;
  tagList: string[];
}

const Articles = ({ query, url }: ArticlesProps) => {
  const [offset, setOffset] = useState(1);
  const [selectedPage, setCurrentPage] = useState(1);

  const queryString = `${query}limit=10&offset=${10 * (offset - 1)}`;

  const { data } = useSWR(`articles/${queryString}`, (url) =>
    getArticleData(url)
  );

  if (!data) return <ColorRing />;

  const { articles: articlesData, articlesCount } = data;

  const articles: Article[] = articlesData;

  if (articles.length === 0) {
    return <div>No article yet..</div>;
  }

  const pageHandler = (num: number) => {
    setOffset(num);
    setCurrentPage(num);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4 mb-10 ">
        <div className="flex flex-col  justify-center md:w-11/12    ">
          {articles.map((data) => {
            return (
              <>
                <div
                  className="flex flex-row justify-between items-center mt-4"
                  key={data.title}
                >
                  <UserDetails
                    author={data.author}
                    updatedAt={data.updatedAt}
                  />
                  <div>
                    <FavouriteButton
                      favoritesCount={data.favoritesCount}
                      slug={data.slug}
                    />
                  </div>
                </div>
                <div className=" flex flex-col">
                  <Link
                    href={`article/${data.slug}`}
                    className="text-2xl font-semibold dark:text-gray-900"
                  >
                    {data.title}
                  </Link>
                  <Link href={`article/${data.slug}`} className="text-gray-400">
                    {data.description}
                  </Link>
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    href={`article/${data.slug}`}
                    className="text-gray-400  text-sm"
                  >
                    Read more...
                  </Link>
                  <ul className="flex justify-end mb-5">
                    {data.tagList.map((tag) => (
                      <ArticlTag tag={tag} key={tag} />
                    ))}
                  </ul>
                </div>
                <hr className=" h-px bg-gray-200 border-0 dark:bg-gray-700" />
              </>
            );
          })}
          <Pagination
            articlesCount={articlesCount}
            pageHandler={pageHandler}
            selectedPage={selectedPage}
          />
        </div>
      </div>
    </>
  );
};

export default Articles;
