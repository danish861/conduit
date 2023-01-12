import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { getArticle } from "../../APIs/article";
import ArticleDetails from "../../components/Airticle/ArticleDetails";

const ArticlePage = () => {
  const router = useRouter();
  const slug = router.query.slug;

  const { data, error } = useSWR(
    slug ? `articles/${slug}` : null,
    slug ? (url) => getArticle(url) : null
  );

  if (error) {
    router.push("/");
  }

  if (!data) {
    return <div>Loading</div>;
  }

  const {
    title,
    body,
    tagList,
    author,
    favoritesCount,
    updatedAt,
    favorited,
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
        favorited={favorited}
        slug={slugData}
      />
    </>
  );
};

export default ArticlePage;
