import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { getArticle } from "../../APIs/article";
import ArticleDetails from "../../components/Airticle/ArticleDetails";

const ArticlePage = () => {
  const { query, isReady } = useRouter();
  const slug = query.slug;

  // here type of slug is undefine first and get the string, while defining typescript type it gives error as same

  const { data, error } = useSWR(
    slug ? `articles/${slug}` : null,
    slug ? (url) => getArticle(url) : null
  );

  if (!data) {
    return <div>Loading</div>;
  }

  console.log(data);
  const {
    title,
    body,
    tagList,
    author,
    favoritesCount,
    updatedAt,
    slug: slugData,
  } = data.article;

  return (
    <>
      <Head>
        <title>{`${slug}`}</title>
      </Head>
      <ArticleDetails
        title={title}
        body={body}
        tagList={tagList}
        author={author}
        favoritesCount={favoritesCount}
        updatedAt={updatedAt}
        slug={slugData}
      />
    </>
  );
};

export default ArticlePage;
