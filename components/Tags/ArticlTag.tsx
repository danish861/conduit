import React from "react";

interface IArticleTagProps {
  tag: string;
}

const ArticlTag = ({ tag }: IArticleTagProps) => {
  return (
    <div>
      <li className=" text-gray-500 text-xs mr-2 px-2.5 py-0.5 border  rounded-xl dark:bg-gray-700 dark:text-gray-300 ">
        {tag}
      </li>
    </div>
  );
};

export default ArticlTag;
