import Link from "next/link";
import Pagination from "../Pagination";
import ArticlTag from "../Tags/ArticlTag";
import UserDetails from "../UserInfo/UserDetails";
import { useEffect } from "react";
import useSWR from "swr";
import { getArticleData } from "../../APIs/article";
import { useState } from "react";
import FavouriteButton from "../common/FavouriteButton";
import { ColorRing } from "react-loader-spinner";
import Router from "next/router";
import { deleteCookie, getCookie } from "cookies-next";
import authStore from "../../store/AuthStore";

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

  const { data, error, isLoading } = useSWR(`articles/${queryString}`, (url) =>
    getArticleData(url)
  );

  const token = getCookie("authToken");

  if (authStore.isLoggedIn) {
    if (token !== authStore.token) {
      deleteCookie("authToken");
      authStore.token = "";
      authStore.isLoggedIn = false;
      Router.push("/");
    }
  }

  if (isLoading) return <ColorRing />;

  const { articles: articlesData, articlesCount } = data;

  const articles: Article[] = articlesData;
  console.log(articles);

  if (articles.length === 0) {
    return <div className="m-8">No article are here... yet.</div>;
  }

  const pageHandler = (num: number) => {
    setOffset(num);
    setCurrentPage(num);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4 mb-10  ">
        <div className="flex flex-col  justify-center md:w-11/12  sm:w-4/5 ">
          {articles.map((data, index) => {
            return (
              <>
                <div key={index}>
                  <div className="flex flex-row justify-between items-center mt-4">
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
                  <div className=" flex flex-col mt-3">
                    <Link
                      href={{
                        pathname: `article/${data.slug}`,
                        // hash: "/",
                      }}
                      className="text-2xl font-semibold text-gray-900  dark:text-gray-300"
                    >
                      {data.title}
                    </Link>
                    <Link
                      href={`article/${data.slug}`}
                      className="text-gray-400  dark:text-gray-600  "
                    >
                      {data.description}
                    </Link>
                  </div>
                  <div className="flex justify-between   mt-4">
                    <Link
                      href={`article/${data.slug}`}
                      className="text-gray-400   dark:text-gray-600  text-sm"
                    >
                      Read more...
                    </Link>
                    <ul className="flex justify-end mb-5">
                      {data.tagList.map((tag) => (
                        <Link href={`article/${data.slug}`}>
                          <ArticlTag tag={tag} />
                        </Link>
                      ))}
                    </ul>
                  </div>
                  <hr className=" h-px bg-gray-200 border-0 dark:bg-gray-700" />
                </div>
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
