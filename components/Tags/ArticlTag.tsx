import React from "react";

interface IArticleTagProps {
  tag: string;
}

const ArticlTag = ({ tag }: IArticleTagProps) => {
  return (
    <div key={tag}>
      <li className=" text-gray-400  dark:text-gray-700   text-xs mr-2 px-2.5 py-0.5 border  rounded-xl  bg-gray-100  ">
        {tag}
      </li>
    </div>
  );
};

export default ArticlTag;
