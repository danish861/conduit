import { GET, POST, PUT, DELETE } from "./APIClient";

export const getArticleData = (url: string) => GET(url);

// get the article --- slug

export const getArticle = (url: string) => GET(url);

// get the COMMENTS

export const getComments = (url: string) => GET(url);

// POST the article

interface postProps {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export const postArticle = (url: string, body: { article: postProps }) => {
  //   console.log(body);
  return POST(url, body);
};

// delete the article

export const deleteArticle = (url: string) => DELETE(url);

// upade the article

interface updateProps {
  title: string;
  description: string;
  body: string;
}

export const updateArticle = (url: string, body: { article: updateProps }) =>
  PUT(url, body);
