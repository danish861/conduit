import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { getTags } from "../../APIs/tag";

interface IPopularTagsProps {
  handleTag: (tag: string) => void;
}

const PopularTag = ({ handleTag }: IPopularTagsProps) => {
  const { data, error } = useSWR<{ tags: string[] }>("/tags", (url) =>
    getTags(url)
  );

  if (!data) return <div>Loading</div>;

  return (
    <>
      <nav className="shadow-sm rounded-md bg-darkGray flex flex-col  p-4  h-full  md:w-56 w-full    ">
        <h1 className="mb-1">Popular Tags</h1>
        <div className="flex flex-wrap ">
          {data.tags.map((tag) => {
            return (
              <Link
                href="/"
                className="mb-1 text-gray-100 text-xs mr-2 px-2.5 py-0.5 border md:grow-0 md:shrink-0 md:basis-1/4  rounded-xl bg-gray-500 hover:bg-gray-700 dark:text-gray-300 "
                key={tag}
                onClick={() => handleTag(tag)}
              >
                {tag}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default PopularTag;
