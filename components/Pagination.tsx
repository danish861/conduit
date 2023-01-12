import Link from "next/link";
import React, { useMemo } from "react";
import { useState } from "react";

interface PaginationProps {
  articlesCount: number;
  pageHandler: (num: number) => void;
  selectedPage: number;
}

const Pagination = ({
  articlesCount,
  pageHandler,
  selectedPage,
}: PaginationProps) => {
  const pageLength = Math.floor(articlesCount / 10) + 1;
  const pageNumber = new Array(pageLength).fill(true).map((e, i) => i + 1);

  return (
    <>
      <nav
        aria-label="Page navigation example"
        className="rounded-sm  mt-10 p-4"
      >
        <ul className=" flex flex-wrap -space-x-px rounded-sm">
          {pageNumber.map((num) => {
            return (
              <li className="flex" key={num}>
                <Link
                  href="#"
                  className={`px-3 py-2 leading-tight text-green bg-white border border-gray-300 hover:bg-gray-100 hover:underline   ${
                    selectedPage === num
                      ? " text-gray-200 hover:bg-green hover:text-gray-100 bg-lime-500 "
                      : ""
                  } `}
                  onClick={() => pageHandler(num)}
                >
                  {num}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
